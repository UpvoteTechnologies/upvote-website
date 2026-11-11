/**
 * The editorial content copied from the app by `npm run sync-content` (see
 * `scripts/sync-content.mjs`). Pages read it from disk at build time, never from the API.
 *
 * A Portuguese article exists only when `content/articles/pt-br/<slug>.json` does; there is no
 * machine fallback, so an untranslated article simply has no pt-BR page and no `hreflang` pair.
 */
import type { Locale } from '../i18n';
import { localePath } from '../i18n';

export interface Span {
  text: string;
  strong?: true;
  em?: true;
  cite?: string;
}

export interface Citation {
  authority: string;
  doc?: string;
  year?: number;
  url?: string;
}

interface FigureResolved {
  value: string;
  method?: string | null;
  n?: number | null;
  excluded?: number | null;
  excludedNote?: string | null;
  limit?: string | null;
}

/** Block kinds the site renders. Kinds that only make sense in the app are skipped at render. */
export type ArticleBlock =
  | { kind: 'paragraph'; key: string; spans: Span[] }
  | { kind: 'heading'; key: string; spans: Span[] }
  | { kind: 'list'; key: string; ordered?: boolean; items: Span[][] }
  | { kind: 'callout'; key: string; tone: 'neutral' | 'caution'; title?: string; spans: Span[] }
  | { kind: 'uncertainty'; key: string; spans: Span[] }
  | { kind: 'figure'; key: string; label: string; caption?: string; resolved?: FigureResolved | null }
  | { kind: 'terms'; key: string; items: string[] }
  | { kind: 'citation'; key: string; citationId: string }
  | { kind: 'plan'; key: string; cue: string; action: string }
  | { kind: 'entity' | 'product' | 'swap' | 'image'; key: string };

export interface Article {
  slug: string;
  kicker: string;
  title: string;
  standfirst: string;
  evidenceTier: string;
  sourceLabel: string | null;
  image: string | null;
  blocks: ArticleBlock[];
  citations: Record<string, Citation>;
}

export interface Recipe {
  slug: string;
  title: string;
  blurb: string;
  steps: string[];
  servings: number | null;
  prepMinutes: number | null;
  cookMinutes: number | null;
  mealSlots: string[];
  image: string | null;
  perServing: { key: string; value: number | null; status: string }[];
  ingredients: { text: string; measure: string | null; grams: number | null }[];
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

/** Plain text of a run of spans, for meta tags and structured data. */
export function spansText(spans: Span[]): string {
  return spans.map((span) => span.text).join('');
}

const BARE_UNIT = /^(ml|g|tsp|tbsp|cups?|teaspoons?|tablespoons?|ounces|oz|cloves?)$/i;

/** "45 g soy sauce (3 tablespoons)". A measure that is only a unit name adds nothing and is dropped. */
export function ingredientLine(item: Recipe['ingredients'][number]): string {
  const grams = item.grams === null ? '' : `${Number(item.grams.toFixed(1))} g `;
  const measure = item.measure && !BARE_UNIT.test(item.measure.trim()) ? ` (${item.measure.trim()})` : '';
  return `${grams}${item.text}${measure}`;
}

/** Minutes as an ISO 8601 duration, the format schema.org expects. */
export function isoMinutes(minutes: number): string {
  return `PT${Math.round(minutes)}M`;
}
