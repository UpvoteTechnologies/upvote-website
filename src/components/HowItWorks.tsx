import { getDict, type Locale } from '../i18n';

export default function HowItWorks({ locale }: { locale: Locale }) {
  const t = getDict(locale).how;

  return (
    <section id="how-it-works" className="bg-brand-dark">
      <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-8 lg:px-10 lg:py-[88px]">
        <div className="mb-10 text-center lg:mb-[52px]">
          <h2 className="section-title !text-white">{t.title}</h2>
          <p className="mx-auto mt-[14px] text-base font-medium text-white/[.72] sm:text-[17px]">{t.lead}</p>
        </div>

        <ol className="flex flex-col gap-[14px]">
          {t.steps.map((step, index) => (
            <li
              key={step.title}
              className="flex items-start gap-4 rounded-[20px] border border-white/[.14] bg-white/[.07] px-5 py-5 transition-colors hover:bg-white/[.11] sm:items-center sm:gap-5 sm:px-[26px] sm:py-[22px]"
            >
              <span className="w-9 flex-none font-mono text-[20px] font-bold leading-none text-brand-mint sm:w-11 sm:text-[22px]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[17px] font-extrabold tracking-[-.015em] text-white sm:text-[19px]">{step.title}</h3>
                <p className="mt-1 text-[14px] font-medium leading-[1.5] text-white/[.72]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-11 text-center">
          <a
            href="/download"
            className="inline-block rounded-full bg-paper px-[38px] py-4 text-[16px] font-extrabold text-brand-dark shadow-[0_10px_26px_rgba(0,0,0,.25)] transition-transform hover:scale-[1.03]"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
