# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start Vite dev server
- `npm run build` - Production build (outputs to `dist/`)
- `npm run lint` - ESLint
- `npm run typecheck` - TypeScript type checking
- `npm run preview` - Preview production build locally

## Architecture

This is the **Upvote** marketing/landing website — a React SPA built with Vite, TypeScript, and Tailwind CSS. Deployed on Netlify.

### Frontend (`src/`)
- **React 18** with **react-router-dom** for routing (BrowserRouter in `main.tsx`)
- Three routes: `/` (landing page with Hero, Features, About, Contact sections), `/privacy`, and `/download` (QR code redirect)
- All page sections are in `src/components/`; no nested component directories
- Styling: **Tailwind CSS 3** (PostCSS + autoprefixer)
- Icons: `lucide-react`

### Backend / Serverless Functions
Contact form email sending exists in two implementations (both use Resend API):
- **Netlify Functions**: `netlify/functions/send-contact-email.ts` (Node/esbuild)
- **Supabase Edge Functions**: `supabase/functions/send-contact-email/index.ts` (Deno)

### Deployment
- **Netlify** — config in `netlify.toml`
- SPA fallback redirect configured (`/* -> /index.html`)
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
