import { downloadHref, getDict, type Locale } from '../i18n';

export default function HowItWorks({ locale }: { locale: Locale }) {
  const t = getDict(locale).how;

  return (
    <section id="how-it-works" className="bg-brand-dark">
      <div className="site-container grid gap-x-16 gap-y-10 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="section-title !text-brand-mint">{t.title}</h2>
          <p className="mt-5 max-w-[400px] text-pretty text-base font-medium leading-[1.55] text-white/[.78] sm:text-[17px]">
            {t.lead}
          </p>
          <a
            href={downloadHref(locale)}
            className="mt-8 inline-block rounded-[24px] bg-brand-mint px-7 py-[13px] text-[16px] font-bold text-brand-dark transition-colors hover:bg-white active:translate-y-px"
          >
            {t.cta}
          </a>
        </div>

        {/* The numbers stay: the order of the steps is the content. */}
        <ol className="border-b border-white/[.16]">
          {t.steps.map((step, index) => (
            <li key={step.title} className="flex gap-5 border-t border-white/[.16] py-6 sm:gap-8">
              <span className="w-6 flex-none text-[26px] font-extrabold leading-[1.05] tabular-nums text-brand-mint" aria-hidden="true">
                {index + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-[18px] font-extrabold tracking-[-.015em] text-white sm:text-[20px]">{step.title}</h3>
                <p className="mt-[6px] max-w-[520px] text-pretty text-[14.5px] font-medium leading-[1.55] text-white/[.78]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
