// Copies the app's public editorial content into this repo, so the site build never calls the
// API: `content/articles/en/*.json`, `content/recipes/*.json` and the cover images under
// `public/media/`. Run `npm run sync-content` and commit the result.
//
// Which articles are published is decided by `content/articles/published.json` (a list of
// slugs). Add slugs there to open the next batch; a slug that is removed has its files deleted.
// Every recipe the API lists is published.
//
// The API base comes from CATALOG_API_URL. Only anonymous, public procedures are called.
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const API = (process.env.CATALOG_API_URL ?? '').replace(/\/$/, '');
if (!API) {
  console.error('Set CATALOG_API_URL to the catalog API base URL (see .env.example).');
  process.exit(1);
}

const root = fileURLToPath(new URL('../', import.meta.url));
const articleDir = `${root}content/articles/en/`;
const recipeDir = `${root}content/recipes/`;
const articleImageDir = `${root}public/media/articles/`;
const recipeImageDir = `${root}public/media/recipes/`;
const CONCURRENCY = 4;

/** One tRPC query over plain HTTP GET. The API serialises plain JSON (no transformer). */
async function query(procedure, input) {
  const url = `${API}/${procedure}?input=${encodeURIComponent(JSON.stringify(input))}`;
  for (let attempt = 1; ; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) return (await response.json()).result.data;
    if (attempt === 4 || (response.status < 500 && response.status !== 429)) {
      throw new Error(`${procedure} ${JSON.stringify(input)} failed with ${response.status}`);
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
  }
}

/** Download an image and store it as a JPEG no wider than `width`. Returns false when missing. */
async function saveImage(path, file, width) {
  if (!path) return false;
  const response = await fetch(`${API}${path}`);
  if (!response.ok) return false;
  const input = Buffer.from(await response.arrayBuffer());
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 70, mozjpeg: true })
    .toFile(file);
  return true;
}

async function inBatches(items, worker) {
  const queue = [...items];
  const run = async () => {
    for (let item = queue.shift(); item !== undefined; item = queue.shift()) await worker(item);
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, run));
}

const writeJson = (file, data) => writeFile(file, `${JSON.stringify(data, null, 2)}\n`);

/** Delete files in `dir` whose name (without extension) is not in `keep`. */
async function prune(dir, keep) {
  for (const name of await readdir(dir)) {
    if (!keep.has(name.replace(/\.[^.]+$/, ''))) await rm(`${dir}${name}`);
  }
}

await Promise.all([articleDir, recipeDir, articleImageDir, recipeImageDir].map((dir) => mkdir(dir, { recursive: true })));

// ---- Articles ----------------------------------------------------------------------------
const published = JSON.parse(await readFile(`${root}content/articles/published.json`, 'utf8'));
const missing = [];

await inBatches(published, async (slug) => {
  let data;
  try {
    data = await query('articles.read', { slug });
  } catch (error) {
    missing.push(`${slug}: ${error.message}`);
    return;
  }
  const hasCover = await saveImage(data.article.hero_uri, `${articleImageDir}${slug}.jpg`, 1200);
  await writeJson(`${articleDir}${slug}.json`, {
    slug,
    kicker: data.article.kicker,
    title: data.article.title,
    standfirst: data.article.standfirst,
    evidenceTier: data.article.evidence_tier,
    sourceLabel: data.article.source_label,
    image: hasCover ? `/media/articles/${slug}.jpg` : null,
    blocks: data.blocks,
    citations: data.citations,
  });
});

const keptArticles = new Set(published);
await prune(articleDir, keptArticles);
await prune(articleImageDir, keptArticles);
console.log(`articles: ${published.length - missing.length} synced, ${missing.length} failed`);
for (const line of missing) console.log(`  ${line}`);

// ---- Recipes -----------------------------------------------------------------------------
const recipeSlugs = [];
for (let offset = 0; ; offset += 30) {
  const page = await query('recipes.browse', { limit: 30, offset });
  recipeSlugs.push(...page.recipes.map((recipe) => recipe.slug));
  if (recipeSlugs.length >= page.total || page.recipes.length === 0) break;
}

const failedRecipes = [];
await inBatches(recipeSlugs, async (slug) => {
  let recipe;
  try {
    ({ recipe } = await query('recipes.bySlug', { slug }));
  } catch (error) {
    failedRecipes.push(`${slug}: ${error.message}`);
    return;
  }
  const hasPhoto = await saveImage(recipe.image_uri, `${recipeImageDir}${slug}.jpg`, 1024);
  await writeJson(`${recipeDir}${slug}.json`, {
    slug,
    title: recipe.title,
    blurb: recipe.blurb,
    steps: recipe.steps,
    servings: recipe.servings,
    prepMinutes: recipe.prep_minutes,
    cookMinutes: recipe.cook_minutes,
    mealSlots: recipe.meal_slots,
    image: hasPhoto ? `/media/recipes/${slug}.jpg` : null,
    perServing: recipe.per_serving,
    ingredients: recipe.ingredients.map((item) => ({
      text: item.display_text,
      measure: item.measure,
      grams: item.grams,
    })),
  });
});

const keptRecipes = new Set(recipeSlugs);
await prune(recipeDir, keptRecipes);
await prune(recipeImageDir, keptRecipes);
console.log(`recipes: ${recipeSlugs.length - failedRecipes.length} synced, ${failedRecipes.length} failed`);
for (const line of failedRecipes) console.log(`  ${line}`);

if (missing.length > 0 || failedRecipes.length > 0) process.exitCode = 1;
