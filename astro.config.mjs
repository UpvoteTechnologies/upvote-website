import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Pages that exist but must stay out of the sitemap.
const SITEMAP_EXCLUDE = ['/download', '/404'];

// https://astro.build/config
export default defineConfig({
  site: 'https://upvote.app',
  // Every page is prerendered to HTML at build time, so crawlers get the content without JS.
  output: 'static',
  // `/privacy` -> `dist/privacy.html`, which Netlify serves at the slash-less URL.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.some((path) => new URL(page).pathname.startsWith(path)),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', 'pt-br': 'pt-BR' },
      },
    }),
  ],
});
