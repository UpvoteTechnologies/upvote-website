import { useEffect, useState, useRef } from 'react';
import { Apple, Play } from 'lucide-react';

const APP_STORE_URL = 'https://apps.apple.com/us/app/upvote-food-diet-scanner/id6753091251';
const PLAY_STORE_URL = 'https://play.google.com/store';

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

function getRedirectUrl(target: RedirectTarget): string | null {
  if (target === 'app_store') return APP_STORE_URL;
  if (target === 'play_store') return PLAY_STORE_URL;
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

    fetch('/.netlify/functions/track-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Analytics must never block redirect
    });

    const url = getRedirectUrl(redirectTarget);
    if (url) {
      setTimeout(() => {
        window.location.href = url;
      }, 1500);
    }
  }, [device, redirectTarget]);

  if (redirectTarget === 'fallback') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50/40 to-orange-50/40 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gray-900">Upvote</h1>
            <p className="text-lg text-gray-600">
              Open this link on your phone to download the app.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={APP_STORE_URL}
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              <Apple className="w-5 h-5" />
              App Store
            </a>
            <a
              href={PLAY_STORE_URL}
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              <Play className="w-5 h-5" />
              Google Play
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50/40 to-orange-50/40 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Upvote</h1>
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        </div>
        <p className="text-gray-500">
          Redirecting to the {redirectTarget === 'app_store' ? 'App Store' : 'Google Play'}...
        </p>
      </div>
    </div>
  );
}

export default Download;
