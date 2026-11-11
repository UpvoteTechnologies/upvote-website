/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** PostHog project token (public). Analytics stay off when it is not set. */
  readonly PUBLIC_POSTHOG_KEY?: string;
  /** Google Search Console HTML-tag verification code. */
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
