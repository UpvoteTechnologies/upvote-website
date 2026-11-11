import StoreButtons from './StoreButtons';
import PhoneMockup from './PhoneMockup';
import { getDict, type Locale } from '../i18n';

export default function Hero({ locale }: { locale: Locale }) {
  const t = getDict(locale).hero;
  // Anything left empty in the dictionary is dropped, so the section never ships a placeholder.
  const visibleStats = t.stats.filter((stat) => stat.value.trim() !== '');

  return (
    <section id="home" className="overflow-hidden bg-paper">
      <div className="site-container flex flex-col items-center gap-14 pb-16 pt-14 lg:flex-row lg:gap-16 lg:pb-20 lg:pt-[84px]">
        <div className="min-w-0 flex-[1.15] text-center lg:text-left">
          <div className="eyebrow animate-fade-in-up">{t.eyebrow}</div>
          <h1
            className="mt-4 animate-fade-in-up text-[44px] font-extrabold leading-[1.02] tracking-[-.03em] text-ink sm:text-[54px] lg:text-[62px]"
            style={{ animationDelay: '0.05s' }}
          >
            {t.titleLine1}
            <br />
            <span className="text-brand">{t.titleLine2}</span>
          </h1>

          <p
            className="mx-auto mt-[22px] max-w-[540px] animate-fade-in-up text-pretty text-[17px] font-medium leading-[1.55] text-muted sm:text-[19px] lg:mx-0"
            style={{ animationDelay: '0.15s' }}
          >
            {t.lead}
          </p>

          <StoreButtons locale={locale} className="mt-[30px] animate-fade-in-up justify-center lg:justify-start" />

          {visibleStats.length > 0 && (
            <div
              className="mt-11 flex animate-fade-in-up flex-wrap justify-center gap-x-10 gap-y-6 sm:gap-x-12 lg:justify-start"
              style={{ animationDelay: '0.3s' }}
            >
              {visibleStats.map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="whitespace-nowrap text-[30px] font-extrabold tracking-[-.03em] text-brand sm:text-[34px]">
                    {stat.value}
                  </div>
                  <div className="mt-[2px] text-[13px] font-semibold text-muted-2">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex flex-1 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div
            className="pointer-events-none absolute -inset-y-8 -inset-x-16"
            style={{ background: 'radial-gradient(circle at 50% 45%, rgba(31,122,78,.12), transparent 62%)' }}
          />
          <PhoneMockup locale={locale} className="animate-float" />
        </div>
      </div>
    </section>
  );
}
