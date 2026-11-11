# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start the Astro dev server
- `npm run build` - Production build (prerenders every page to `dist/`)
- `npm run lint` - ESLint (`.ts` / `.tsx`)
- `npm run typecheck` - `astro check` (TypeScript in `.astro`, `.ts` and `.tsx`)
- `npm run preview` - Preview the production build locally
- `npm run sync-privacy` - Copy the published privacy policy from Termly into `content/privacy/policy.html` (the prerendered fallback of `/privacy`); commit the result
- `npm run brand-assets` - Regenerate the social cards (`public/og.png`, `public/og-pt-br.png`) and the PNG icons from the SVG logos
- `npm run sync-content` - Copy articles and recipes from the app's public API into `content/` and `public/media/` (needs `CATALOG_API_URL`)

Needs Node >= 22.23 (see `.nvmrc`).

## Architecture

This is the **Upvote** marketing website: a statically prerendered **Astro** site with **React** components, TypeScript and Tailwind CSS. Deployed on Netlify.

Every page must reach the browser as finished HTML (title, description, text, JSON-LD) with no JavaScript needed. That is the reason the site moved off the old client-rendered Vite SPA, so do not add content that only exists after hydration.

### Frontend (`src/`)
- `src/pages/*.astro` - one file per route: `/` (`index.astro`), `/pt-br` (`pt-br.astro`), `/privacy`, `/download` (QR code redirect, `noindex`), `404`
- `src/layouts/Base.astro` - the HTML shell: head, header, footer, analytics. Every page uses it
- `src/components/Seo.astro` - title, description, canonical, `hreflang`, Open Graph, JSON-LD. Pages pass their own values through `Base`
- `src/components/Landing.astro` - the landing page, shared by both languages
- All page sections are React components in `src/components/`; no nested component directories
- Components render on the server by default. Only the ones that need state hydrate (`client:load` on `Header`, `client:visible` on `Features` and `Contact`, `client:load` on `Download`, which still prerenders the two store links)
- Internal links are plain `<a href>`; there is no client router
- Styling: **Tailwind CSS 3** (PostCSS + autoprefixer), tokens in `tailwind.config.js`
- Icons: `lucide-react`

### Languages
- English at the root, Brazilian Portuguese under `/pt-br`. Helpers in `src/i18n/index.ts` (`getDict`, `localePath`, `sectionHref`, `downloadHref`)
- All copy lives in `src/i18n/en.ts` and `src/i18n/pt-br.ts`; never hard-code visible text in a component. The two files must keep the same shape (`pt-br.ts` is typed against `en.ts`)
- A page that exists in both languages passes `alternates` to `Base` so the `hreflang` pairs and the language switch are correct
- Store links are per language (`src/links.ts`)

### App content (`content/`)
- Articles and recipes are an **app feature**. The site shows only a preview of each (title, summary, cover, opening lines and outline for an article; times and ingredient names for a recipe) and sends the reader to the app for the rest. Do not render full articles, sources, quantities or methods on the site
- The previews come from the app's catalog API, but the build never calls it. `npm run sync-content` (`scripts/sync-content.mjs`) writes them into `content/articles/en/`, `content/recipes/` and `public/media/`, and the result is committed. The full text is never written to this repo
- `content/articles/published.json` is the list of article slugs on the site. Articles are opened in batches on purpose (most are generated families, and publishing all at once risks being read as scaled content). Add slugs there and re-run the sync to open the next batch
- `content/articles/pt-br/<slug>.json` are hand-reviewed translations with the same shape as the English file. An article has a pt-BR page and an `hreflang` pair only when that file exists. The sync never touches this folder
- `content/diets/<id>.json` holds one diet from the app's picker with its text in both languages (`id` is the ruleset id in the app). The text is written for the site and says what the app's rules do, not health advice; any change to it needs a human review. Routes: `/diets`, `/diets/<slug>`, `/pt-br/dietas`, `/pt-br/dietas/<slug>`
- `src/lib/content.ts` loads the files
- Routes: `/a/<slug>`, `/articles`, `/pt-br/a/<slug>`, `/pt-br/artigos`, `/recipes/<slug>`, `/recipes` (recipes are English only for now)

### SEO files
- `public/robots.txt`, `public/site.webmanifest`; the sitemap is generated at build time by `@astrojs/sitemap` (`astro.config.mjs`)
- The production origin is set once in `astro.config.mjs` (`site`) and `src/site.ts` (`SITE_URL`)
- Optional build-time env vars: `PUBLIC_POSTHOG_KEY`, `PUBLIC_GOOGLE_SITE_VERIFICATION` (see `.env.example`)

### Backend / Serverless Functions
Contact form email sending exists in two implementations (both use Resend API):
- **Netlify Functions**: `netlify/functions/send-contact-email.ts` (Node/esbuild)
- **Supabase Edge Functions**: `supabase/functions/send-contact-email/index.ts` (Deno)

### Deployment
- **Netlify** — config in `netlify.toml`
- No SPA fallback: unknown paths get `dist/404.html` with a 404 status
- `public/_redirects` keeps the Apple app-site-association rewrite
- Functions bundled with esbuild

## Workflow Rules

After making any code changes, ALWAYS run this verification loop before considering the task done:

1. **Typecheck**: `npm run typecheck` — fix all TypeScript errors before proceeding
2. **Lint**: `npm run lint` — fix all lint warnings/errors
3. **Build**: `npm run build` — confirm the production build succeeds

If any step fails, fix the issue and re-run the full loop from step 1. Do NOT stop until all three pass cleanly. Do not ask the user to run these — run them yourself.

When debugging a build or type error:
- Read the actual error output carefully — fix the root cause, not symptoms
- If a fix introduces new errors, keep iterating the loop until clean
- Never suppress TypeScript errors with `@ts-ignore` or `any` unless there is genuinely no other option

### Supabase Database Changes
- **Never generate migrations** — all schema/SQL changes are created manually via the **Supabase Dashboard SQL Editor**
- The file `supabase/functions/_shared/schema.ts` documents table structures and includes the SQL to run — it is a reference, not an executable migration
- When a new table or column is needed: update `schema.ts` with the interface + SQL comment, then the user runs the SQL manually in the dashboard

### Key External Services
- **Resend** for transactional email (API key via `RESEND_API_KEY` env var)
- **Supabase** for analytics DB (`gtm` schema) and edge functions; client via `@supabase/supabase-js`
