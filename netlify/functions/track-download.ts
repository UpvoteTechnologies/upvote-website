import { Handler, HandlerEvent } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

interface TrackPayload {
  device_type: string;
  user_agent: string;
  screen_width: number;
  screen_height: number;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  redirect_target: string;
  session_id: string;
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    const rawPayload: Partial<TrackPayload> = JSON.parse(event.body || '{}');
    if (
      !rawPayload ||
      typeof rawPayload.session_id !== 'string' ||
      rawPayload.session_id.trim() === '' ||
      typeof rawPayload.redirect_target !== 'string' ||
      rawPayload.redirect_target.trim() === ''
    ) {
      console.warn('track-download: invalid payload, skipping write');
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }
    const payload = rawPayload as TrackPayload;

    // Extract geo from Netlify's x-nf-geo header
    let country: string | null = null;
    let region: string | null = null;
    let city: string | null = null;

    const geoHeader = event.headers['x-nf-geo'];
    if (geoHeader) {
      try {
        const decoded = Buffer.from(geoHeader, 'base64').toString('utf-8');
        const geo = JSON.parse(decoded);
        country = geo.country?.code || null;
        region = geo.subdivision?.name || null;
        city = geo.city || null;
      } catch {
        // Ignore malformed geo header
      }
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      db: { schema: 'gtm' },
    });

    const { error } = await supabase.from('download_events').upsert(
      {
        device_type: payload.device_type,
        user_agent: payload.user_agent,
        screen_width: payload.screen_width,
        screen_height: payload.screen_height,
        utm_source: payload.utm_source,
        utm_medium: payload.utm_medium,
        utm_campaign: payload.utm_campaign,
        utm_content: payload.utm_content,
        redirect_target: payload.redirect_target,
        session_id: payload.session_id,
        country,
        region,
        city,
      },
      { onConflict: 'session_id' }
    );
    if (error) {
      console.error('track-download upsert failed:', { code: error.code, message: error.message });
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (error) {
    console.error('track-download error:', error);
    // Always return 200 — analytics must never break the redirect
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }
};
