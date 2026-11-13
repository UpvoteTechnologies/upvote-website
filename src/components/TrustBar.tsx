import { getDict, type Locale } from '../i18n';

// Falls back to the wordmark if `logo` is ever cleared.
const partner = {
  name: 'Fermented Food Holdings',
  logo: '/ffh-logo.webp' as string,
};

export default function TrustBar({ locale }: { locale: Locale }) {
  const t = getDict(locale).trust;

  return (
    <section className="relative border-y border-line bg-paper-2">
      <div className="site-container flex flex-col items-start gap-x-8 gap-y-3 py-7 sm:flex-row sm:items-center">
        {partner.logo ? (
          <img src={partner.logo} alt={partner.name} loading="lazy" className="h-12 w-auto flex-none sm:h-14" />
        ) : (
          <p className="flex-none text-[21px] font-extrabold tracking-[-.01em] text-ink-2">{partner.name}</p>
        )}

        <p className="max-w-[460px] text-[13.5px] font-medium leading-[1.5] text-muted">
          <span className="font-extrabold text-ink-2">{t.eyebrow}.</span> {t.body}
        </p>
      </div>
    </section>
  );
}
