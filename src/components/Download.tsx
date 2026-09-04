import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { APP_STORE_URL, PLAY_STORE_URL } from '../links';

const APP_STORE_PROVIDER_TOKEN = '127358169';

type DeviceType = 'ios' | 'android' | 'desktop';
type RedirectTarget = 'app_store' | 'play_store' | 'fallback';

function detectDevice(): DeviceType {
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return 'ios';
  }
  if (/android/i.test(ua)) {
    return 'android';
  }
  return 'desktop';
}

function getRedirectTarget(device: DeviceType): RedirectTarget {
  if (device === 'ios') return 'app_store';
  if (device === 'android') return 'play_store';
  return 'fallback';
}

function buildRedirectUrl(target: RedirectTarget, params: URLSearchParams): string | null {
  if (target === 'app_store') {
    const url = new URL(APP_STORE_URL);
    url.searchParams.set('pt', APP_STORE_PROVIDER_TOKEN);
    url.searchParams.set('ct', params.get('utm_campaign') || 'qr_download');
    url.searchParams.set('mt', '8');
    return url.toString();
  }
  if (target === 'play_store') {
    const url = new URL(PLAY_STORE_URL);
    const referrer = new URLSearchParams({
      utm_source: params.get('utm_source') || 'qr',
      utm_medium: params.get('utm_medium') || 'qr',
      utm_campaign: params.get('utm_campaign') || 'qr_download',
      utm_content: getSessionId(),
    });
    url.searchParams.set('referrer', referrer.toString());
    return url.toString();
  }
  return null;
}

function getSessionId(): string {
  let id = sessionStorage.getItem('download_session_id');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('download_session_id', id);
  }
  return id;
}

function Download() {
  const [device] = useState<DeviceType>(detectDevice);
  const redirectTarget = getRedirectTarget(device);
  const tracked = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const params = new URLSearchParams(window.location.search);

    const payload = {
      device_type: device,
      user_agent: navigator.userAgent,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      utm_source: params.get('utm_source') || null,
      utm_medium: params.get('utm_medium') || null,
      utm_campaign: params.get('utm_campaign') || null,
      utm_content: params.get('utm_content') || null,
      redirect_target: redirectTarget,
      session_id: getSessionId(),
    };

    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    navigator.sendBeacon('/.netlify/functions/track-download', blob);

    const url = buildRedirectUrl(redirectTarget, params);
    if (!url) {
      navigate('/', { replace: true });
      return;
    }

    window.location.href = url;

    // After the OS hands off to the App Store / Play Store, swap this page to
    // the landing page so a user who returns to the browser sees the site
    // instead of being stuck on the "Redirecting..." spinner.
    const goHome = () => navigate('/', { replace: true });
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') goHome();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    const fallback = window.setTimeout(goHome, 3000);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.clearTimeout(fallback);
    };
  }, [device, redirectTarget, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="flex flex-col items-center gap-5 text-center">
        <img src="/brand/logo-default.svg" alt="Upvote" className="h-10 w-auto" />
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-line-2 border-t-brand" />
        <p className="text-[15px] font-semibold text-muted">
          Redirecting to the {redirectTarget === 'app_store' ? 'App Store' : 'Google Play'}...
        </p>
      </div>
    </div>
  );
}

export default Download;
