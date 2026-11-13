import { getDict, type Locale } from '../i18n';

export default function About({ locale }: { locale: Locale }) {
  const t = getDict(locale).about;

  return (
    <section id="about" className="bg-paper">
      <div className="site-container py-16 lg:py-24">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h2 className="section-title">{t.title}</h2>
            <p className="section-lead mt-5 max-w-[400px] text-pretty">{t.lead}</p>
          </div>
          <p className="max-w-[640px] text-pretty text-[18px] font-medium leading-[1.6] text-ink-2 sm:text-[20px]">{t.body}</p>
        </div>

        <div className="mt-14 grid gap-x-10 md:grid-cols-3">
          {t.cards.map((card) => (
            <div key={card.title} className="border-t border-line-2 py-6">
              <h3 className="text-[18px] font-extrabold tracking-[-.015em] text-ink">{card.title}</h3>
              <p className="mt-2 max-w-[340px] text-pretty text-[14.5px] font-medium leading-[1.55] text-muted">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div id="privacy" className="rounded-[24px] bg-paper-2 px-6 py-8 sm:p-10">
            <h3 className="text-[22px] font-extrabold tracking-[-.02em] text-ink sm:text-[24px]">{t.privacyTitle}</h3>
            {/*
              LEGAL REVIEW REQUIRED before this ships. This copy must match the
              Termly policy on /privacy and the B2B data products actually in
              production. Targeted advertising and dynamic pricing carry specific
              CCPA/CPRA obligations (incl. a "Do Not Sell or Share My Personal
              Information" link) that this section does not yet address.
            */}
            <div className="mt-4 flex flex-col gap-3 text-[15px] font-medium leading-[1.6] text-ink-3">
              {t.privacyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>
                {t.privacyLinkBefore}
                <a
                  href="/privacy"
                  className="font-bold text-brand underline decoration-brand/30 transition-colors hover:text-brand-deep hover:decoration-brand-deep"
                >
                  {t.privacyLink}
                </a>
                {t.privacyLinkAfter}
              </p>
            </div>
          </div>

          <div id="rewards" className="rounded-[24px] bg-brand-tint px-6 py-8 sm:p-10">
            <h3 className="text-[22px] font-extrabold tracking-[-.02em] text-ink sm:text-[24px]">{t.rewardsTitle}</h3>
            <p className="mt-4 text-[15px] font-medium leading-[1.6] text-ink-3">{t.rewardsBody}</p>

            <div className="mt-6 flex items-center gap-2 text-[15px] font-extrabold text-ink">
              <img src="/upcoin.png" alt="" width="18" height="18" className="h-[18px] w-[18px] object-contain" />
              {t.rewardsHow}
            </div>
            <ol className="mt-2 text-[14.5px] font-medium leading-[1.5] text-ink-3">
              {t.rewardSteps.map((step, index) => (
                <li key={step} className="flex gap-3 border-b border-brand/15 py-[10px] last:border-b-0">
                  <span className="w-4 flex-none font-extrabold tabular-nums text-brand" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <p className="mt-5 text-[12px] font-medium leading-[1.55] text-ink-3">{t.rewardsFinePrint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
