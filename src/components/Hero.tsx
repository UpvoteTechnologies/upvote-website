import StoreButtons from './StoreButtons';
import PhoneMockup from './PhoneMockup';
import { getDict, type Locale } from '../i18n';

export default function Hero({ locale }: { locale: Locale }) {
  const t = getDict(locale).hero;
  // Anything left empty in the dictionary is dropped, so the section never ships a placeholder.
  const facts = t.facts.filter((fact) => fact.trim() !== '');

  return (
    <section id="home" className="overflow-hidden bg-paper">
      <div className="site-container grid items-end gap-x-16 gap-y-12 pt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:pt-20">
        <div className="min-w-0 lg:pb-24">
          <h1 className="text-[44px] font-extrabold leading-[1] tracking-[-.035em] text-ink sm:text-[58px] lg:text-[72px]">
            {t.titleLine1}
            <br />
            <span className="text-brand">{t.titleLine2}</span>
          </h1>

          <p className="mt-6 max-w-[520px] text-pretty text-[17px] font-medium leading-[1.55] text-ink-3 sm:text-[19px]">
            {t.lead}
          </p>

          <StoreButtons locale={locale} className="mt-8" />

          {facts.length > 0 && (
            <ul className="mt-10 grid max-w-[560px] gap-x-6 gap-y-2 border-t border-line-2 pt-5 text-[14px] font-semibold leading-[1.4] text-muted sm:grid-cols-3">
              {facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          )}
        </div>

        {/* The phone runs off the bottom of the section, so the next band cuts it. */}
        <div className="flex justify-center lg:justify-end">
          <PhoneMockup locale={locale} className="-mb-[110px] lg:-mb-[72px]" />
        </div>
      </div>
    </section>
  );
}
