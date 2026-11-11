import type { Locale } from './i18n';

/** Numeric App Store id, also used by the `apple-itunes-app` smart banner. */
export const APP_STORE_ID = '6753091251';
/** Android package, the same one declared in `public/.well-known/assetlinks.json`. */
export const PLAY_PACKAGE = 'com.upvoteTechnologies.upvote';

const APP_STORE_URLS: Record<Locale, string> = {
  en: `https://apps.apple.com/us/app/upvote-food-diet-scanner/id${APP_STORE_ID}`,
  'pt-br': `https://apps.apple.com/br/app/upvote-scanner-de-alimentos/id${APP_STORE_ID}`,
};

const PLAY_STORE_URLS: Record<Locale, string> = {
  en: `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}`,
  'pt-br': `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}&hl=pt-BR`,
};

/** The two store listings, shared by every download CTA on the site. */
export function appStoreUrl(locale: Locale): string {
  return APP_STORE_URLS[locale];
}

export function playStoreUrl(locale: Locale): string {
  return PLAY_STORE_URLS[locale];
}
