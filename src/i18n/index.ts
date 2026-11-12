import { en, type Dict } from './en';
import { ptBr } from './pt-br';

export type { Dict };

export const LOCALES = ['en', 'pt-br'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** BCP 47 tags, used for `<html lang>`, `hreflang` and `og:locale`. */
export const LOCALE_TAG: Record<Locale, string> = { en: 'en', 'pt-br': 'pt-BR' };
export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', 'pt-br': 'pt_BR' };

const dictionaries: Record<Locale, Dict> = { en, 'pt-br': ptBr };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

/**
 * Prefix a site path with the locale. English lives at the root, so existing URLs keep working;
 * every other locale gets its own folder. Paths never end in a slash (`trailingSlash: 'never'`).
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  if (locale === DEFAULT_LOCALE) return clean || '/';
  return `/${locale}${clean}`;
}

/**
 * Link to `/download`, the device redirect. It is one URL for every language, so a link from the
 * site always carries the language the visitor is reading in, English included: a Portuguese
 * browser on the English page must still get the English listing. Only a bare `/download` (QR
 * codes) lets the browser's language decide.
 */
export function downloadHref(locale: Locale): string {
  return `/download?lang=${locale}`;
}

/** Link to a section of the landing page, e.g. `/#features` or `/pt-br#features`. */
export function sectionHref(locale: Locale, id: string): string {
  return `${localePath(locale)}#${id}`;
}
