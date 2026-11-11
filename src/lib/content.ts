/**
 * Previews of the app's editorial content, copied by `npm run sync-content` (see
 * `scripts/sync-content.mjs`). Pages read it from disk at build time, never from the API.
 *
 * A Portuguese article exists only when `content/articles/pt-br/<slug>.json` does; there is no
 * machine fallback, so an untranslated article simply has no pt-BR page and no `hreflang` pair.
 */
import type { Locale } from '../i18n';
import { localePath } from '../i18n';

export interface Article {
  slug: string;
  kicker: string;
  title: string;
  standfirst: string;
  evidenceTier: string;
  sourceLabel: string | null;
  image: string | null;
  /** Opening paragraphs, shown on the site as a preview. The rest is read in the app. */
  intro: string[];
  /** Section headings, shown as the outline of what the app has. */
  sections: string[];
  sourceCount: number;
}

export interface DietText {
  name: string;
  title: string;
  summary: string;
  intro: string;
  flags: string[];
  notes: string[];
  limit: string;
}

/** One diet from the app's picker. The text is written for the site and reviewed by hand. */
export interface Diet {
  /** Ruleset id in the app (`packages/rules/rulesets/<id>.json`). */
  id: string;
  order: number;
  slugs: Record<Locale, string>;
  /** Slugs of related articles; only the ones published in the page's language are linked. */
  articles: string[];
  en: DietText;
  'pt-br': DietText;
}

export interface Recipe {
  slug: string;
  title: string;
  blurb: string;
  servings: number | null;
  prepMinutes: number | null;
  cookMinutes: number | null;
  mealSlots: string[];
  image: string | null;
  /** Ingredient names only; quantities, method and nutrition are in the app. */
  ingredients: string[];
  stepCount: number;
}

function load<T extends { slug: string }>(modules: Record<string, unknown>): T[] {
  return Object.values(modules)
    .map((module) => (module as { default: T }).default)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

const articlesByLocale: Record<Locale, Article[]> = {
  en: load<Article>(import.meta.glob('/content/articles/en/*.json', { eager: true })),
  'pt-br': load<Article>(import.meta.glob('/content/articles/pt-br/*.json', { eager: true })),
};

const recipes = load<Recipe>(import.meta.glob('/content/recipes/*.json', { eager: true }));

const diets = Object.values(import.meta.glob('/content/diets/*.json', { eager: true }))
  .map((module) => (module as { default: Diet }).default)
  .sort((a, b) => a.order - b.order);

export function getDiets(): Diet[] {
  return diets;
}

export function dietIndexPath(locale: Locale): string {
  return locale === 'pt-br' ? '/pt-br/dietas' : '/diets';
}

export function dietPath(locale: Locale, diet: Diet): string {
  return `${dietIndexPath(locale)}/${diet.slugs[locale]}`;
}

/** Sections in the order the index shows them; hand-written pieces lead. */
const KICKER_ORDER = [
  'WORTH KNOWING',
  'READING THE PACK',
  'HOW WE JUDGE',
  'ALLERGENS',
  'DIETS',
  'CONDITIONS',
  'PLANS',
  'GOALS',
  'ADDITIVES',
  'INGREDIENTS',
  'CATEGORIES',
];

/** Articles of a locale in index order. The pt-BR list follows the English order. */
export function getArticle(locale: Locale, slug: string): Article | undefined {
  return articlesByLocale[locale].find((article) => article.slug === slug);
}

export function getArticles(locale: Locale): Article[] {
  const rank = (slug: string) => {
    const source = articlesByLocale.en.find((article) => article.slug === slug);
    const index = KICKER_ORDER.indexOf(source?.kicker ?? '');
    return index === -1 ? KICKER_ORDER.length : index;
  };
  return [...articlesByLocale[locale]].sort((a, b) => rank(a.slug) - rank(b.slug) || a.slug.localeCompare(b.slug));
}

export function hasArticle(locale: Locale, slug: string): boolean {
  return articlesByLocale[locale].some((article) => article.slug === slug);
}

export function getRecipes(): Recipe[] {
  return recipes;
}

export function articlePath(locale: Locale, slug: string): string {
  return localePath(locale, `/a/${slug}`);
}

export function articleIndexPath(locale: Locale): string {
  return locale === 'pt-br' ? '/pt-br/artigos' : '/articles';
}

/** `hreflang` map for an article: only the languages it is actually published in. */
export function articleAlternates(slug: string): Partial<Record<Locale, string>> {
  const alternates: Partial<Record<Locale, string>> = {};
  if (hasArticle('en', slug)) alternates.en = articlePath('en', slug);
  if (hasArticle('pt-br', slug)) alternates['pt-br'] = articlePath('pt-br', slug);
  return alternates;
}

export function recipePath(slug: string): string {
  return `/recipes/${slug}`;
}

/** Up to `count` other items from the same list, starting after `slug` and wrapping around. */
export function neighbours<T extends { slug: string }>(items: T[], slug: string, count: number): T[] {
  const index = items.findIndex((item) => item.slug === slug);
  const others = [...items.slice(index + 1), ...items.slice(0, Math.max(index, 0))];
  return others.slice(0, count);
}
