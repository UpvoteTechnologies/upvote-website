# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start the Astro dev server
- `npm run build` - Production build (prerenders every page to `dist/`)
- `npm run lint` - ESLint (`.ts` / `.tsx`)
- `npm run typecheck` - `astro check` (TypeScript in `.astro`, `.ts` and `.tsx`)
- `npm run preview` - Preview the production build locally
- `npm run brand-assets` - Regenerate `public/og.png` and the PNG icons from the SVG logos

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
- Components render on the server by default. Only the ones that need state hydrate (`client:load` on `Header`, `client:visible` on `Features` and `Contact`, `client:only` on `Download`)
- Internal links are plain `<a href>`; there is no client router
- Styling: **Tailwind CSS 3** (PostCSS + autoprefixer), tokens in `tailwind.config.js`
- Icons: `lucide-react`

### Languages
- English at the root, Brazilian Portuguese under `/pt-br`. Helpers in `src/i18n/index.ts` (`getDict`, `localePath`, `sectionHref`)
- All copy lives in `src/i18n/en.ts` and `src/i18n/pt-br.ts`; never hard-code visible text in a component. The two files must keep the same shape (`pt-br.ts` is typed against `en.ts`)
- A page that exists in both languages passes `alternates` to `Base` so the `hreflang` pairs and the language switch are correct
- Store links are per language (`src/links.ts`)

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
