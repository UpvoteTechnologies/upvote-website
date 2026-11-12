import { useEffect, useState, useRef } from 'react';
import { DEFAULT_LOCALE, LOCALES, getDict, localePath, type Locale } from '../i18n';
import { appStoreUrl, playStoreUrl } from '../links';
import StoreButtons from './StoreButtons';

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

/**
 * `/download` is one URL for every language. A link from the site says which language the visitor
 * was reading (`?lang=`, see `downloadHref`); a QR code says nothing, so the browser picks.
 */
function detectLocale(params: URLSearchParams): Locale {
  const lang = params.get('lang');
  const chosen = LOCALES.find((code) => code === lang);
  if (chosen) return chosen;
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt-br' : 'en';
}

function buildRedirectUrl(target: RedirectTarget, params: URLSearchParams, locale: Locale): string | null {
  if (target === 'app_store') {
    const url = new URL(appStoreUrl(locale));
    url.searchParams.set('pt', APP_STORE_PROVIDER_TOKEN);
    url.searchParams.set('ct', params.get('utm_campaign') || 'qr_download');
    url.searchParams.set('mt', '8');
    return url.toString();
  }
  if (target === 'play_store') {
    const url = new URL(playStoreUrl(locale));
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

/**
 * Rendered on the server with the two store links and nothing else, so the page works with no
 * JavaScript. In the browser it reads the device and the language, then forwards to the store.
 */
function Download() {
  // Unknown until the browser has been read; the server render and the first paint agree on that.
  const [redirect, setRedirect] = useState<{ locale: Locale; target: RedirectTarget } | null>(null);
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const params = new URLSearchParams(window.location.search);
    const device = detectDevice();
    const locale = detectLocale(params);
    const redirectTarget = getRedirectTarget(device);
    setRedirect({ locale, target: redirectTarget });

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

    const goHome = () => window.location.replace(localePath(locale));

    const url = buildRedirectUrl(redirectTarget, params, locale);
    if (!url) {
      goHome();
      return;
    }

    window.location.href = url;

    // After the OS hands off to the App Store / Play Store, swap this page to
    // the landing page so a user who returns to the browser sees the site
    // instead of being stuck on the "Redirecting..." spinner.
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') goHome();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    const fallback = window.setTimeout(goHome, 3000);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.clearTimeout(fallback);
    };
  }, []);

  const locale = redirect?.locale ?? DEFAULT_LOCALE;
  const store = redirect?.target === 'app_store' ? 'App Store' : 'Google Play';

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="flex flex-col items-center gap-5 text-center">
        <img src="/brand/logo-default.svg" alt="Upvote" className="h-10 w-auto" />
        {redirect && redirect.target !== 'fallback' && (
          <>
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-line-2 border-t-brand" />
            <p className="text-[15px] font-semibold text-muted">
              {getDict(locale).download.redirecting.replace('{store}', store)}
            </p>
          </>
        )}
        <StoreButtons locale={locale} className="justify-center" />
      </div>
    </div>
  );
}

export default Download;
