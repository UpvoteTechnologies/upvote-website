import { APP_STORE_URL, PLAY_STORE_URL } from '../links';

function AppleIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <path d="M17.05 12.54c-.03-2.89 2.36-4.28 2.47-4.35-1.35-1.97-3.44-2.24-4.18-2.27-1.78-.18-3.47 1.05-4.37 1.05-.9 0-2.29-1.02-3.77-1-1.94.03-3.72 1.13-4.72 2.86-2.01 3.49-.51 8.66 1.45 11.49.96 1.39 2.1 2.94 3.6 2.88 1.45-.06 1.99-.93 3.74-.93s2.24.93 3.77.9c1.56-.03 2.54-1.41 3.49-2.8 1.1-1.61 1.55-3.17 1.58-3.25-.04-.02-3.03-1.16-3.06-4.58zM14.16 4.03c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.74-.74.85-1.39 2.22-1.22 3.53 1.29.1 2.6-.65 3.41-1.61z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 3.5v17L14.5 12z" fill="#9FE3BE" />
      <path d="M14.5 12 18 9.8l3 2.2-3 2.2z" fill="#6FBF95" />
      <path d="M4 3.5 14.5 12 18 9.8z" fill="#fff" opacity=".85" />
      <path d="M4 20.5 14.5 12l3.5 2.2z" fill="#fff" opacity=".6" />
    </svg>
  );
}

interface StoreButtonProps {
  href: string;
  eyebrow: string;
  label: string;
  icon: React.ReactNode;
}

function StoreButton({ href, eyebrow, label, icon }: StoreButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-[9px] rounded-[14px] bg-ink px-5 py-[13px] transition-transform hover:scale-[1.03] hover:bg-black"
      aria-label={`${eyebrow} ${label}`}
    >
      {icon}
      <span className="flex flex-col leading-none">
        <span className="text-[9.5px] font-semibold tracking-[.04em] text-white/65">{eyebrow}</span>
        <span className="mt-[3px] text-[15px] font-extrabold text-white">{label}</span>
      </span>
    </a>
  );
}

export default function StoreButtons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <StoreButton href={APP_STORE_URL} eyebrow="DOWNLOAD ON THE" label="App Store" icon={<AppleIcon />} />
      <StoreButton href={PLAY_STORE_URL} eyebrow="GET IT ON" label="Google Play" icon={<PlayIcon />} />
    </div>
  );
}
