/**
 * Shared schema reference for Supabase tables.
 * This file documents table structures — it is NOT used to run migrations.
 * Create/alter tables via Supabase Dashboard SQL Editor.
 */

// Schema: gtm (go-to-market analytics)

export interface DownloadEvent {
  id: string; // uuid, PK, default gen_random_uuid()
  created_at: string; // timestamptz, default now()
  device_type: string; // 'ios' | 'android' | 'desktop'
  user_agent: string;
  screen_width: number;
  screen_height: number;
  utm_source: string | null;
  utm_medium: string | null; // 'qr' for QR scans
  utm_campaign: string | null;
  utm_content: string | null;
  country: string | null; // from Netlify geo
  region: string | null; // state/province
  city: string | null;
  redirect_target: string; // 'app_store' | 'play_store' | 'fallback'
  session_id: string; // unique constraint, prevents duplicate tracking
}

/**
 * SQL to create this table (run in Supabase SQL Editor):
 *
 * CREATE SCHEMA IF NOT EXISTS gtm;
 *
 * CREATE TABLE gtm.download_events (
 *   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *   created_at timestamptz NOT NULL DEFAULT now(),
 *   device_type text NOT NULL,
 *   user_agent text,
 *   screen_width int,
 *   screen_height int,
 *   utm_source text,
 *   utm_medium text,
 *   utm_campaign text,
 *   utm_content text,
 *   country text,
 *   region text,
 *   city text,
 *   redirect_target text NOT NULL,
 *   session_id text NOT NULL UNIQUE
 * );
 *
 * CREATE INDEX idx_download_events_created_at ON gtm.download_events (created_at);
 * CREATE INDEX idx_download_events_device_type ON gtm.download_events (device_type);
 * CREATE INDEX idx_download_events_utm_source ON gtm.download_events (utm_source);
 * CREATE INDEX idx_download_events_country ON gtm.download_events (country);
 */
