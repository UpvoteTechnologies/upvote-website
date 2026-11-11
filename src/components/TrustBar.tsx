import { getDict, type Locale } from '../i18n';

// Falls back to the wordmark if `logo` is ever cleared.
const partner = {
  name: 'Fermented Food Holdings',
  logo: '/ffh-logo.webp' as string,
};

export default function TrustBar({ locale }: { locale: Locale }) {
  const t = getDict(locale).trust;

  return (
    <section className="border-y border-line bg-paper-2">
      <div className="site-container flex flex-col items-center gap-[10px] py-[34px] text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-muted-3">{t.eyebrow}</p>

        {partner.logo ? (
          <img src={partner.logo} alt={partner.name} loading="lazy" className="h-14 w-auto sm:h-16" />
        ) : (
          <p className="text-[21px] font-extrabold tracking-[-.01em] text-ink-2">{partner.name}</p>
        )}

        <p className="max-w-[520px] text-[13.5px] font-medium text-muted-2">{t.body}</p>
      </div>
    </section>
  );
}
