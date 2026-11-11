import { Heart, Shield, Sparkles } from 'lucide-react';
import { getDict, type Locale } from '../i18n';

// Index-aligned with `about.cards` in the dictionaries.
const icons = [Heart, Shield, Sparkles];

export default function About({ locale }: { locale: Locale }) {
  const t = getDict(locale).about;

  return (
    <section id="about" className="border-t border-line bg-paper">
      <div className="site-container py-16 lg:py-[88px]">
        <div className="text-center">
          <h2 className="section-title">{t.title}</h2>
          <p className="section-lead mx-auto mt-[14px]">{t.lead}</p>
        </div>

        <p className="mx-auto mt-9 max-w-[820px] text-pretty text-center text-[16px] font-medium leading-[1.6] text-ink-2 sm:text-[18px]">
          {t.body}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {t.cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <div key={card.title} className="card bg-paper-2 p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-brand">
                  <Icon className="h-[22px] w-[22px] text-white" strokeWidth={1.9} />
                </div>
                <h3 className="mt-[18px] text-[19px] font-extrabold tracking-[-.015em] text-ink">{card.title}</h3>
                <p className="mt-2 text-pretty text-[14px] font-medium leading-[1.55] text-muted">{card.body}</p>
              </div>
            );
          })}
        </div>

        <div id="privacy" className="mt-6 rounded-[22px] border border-line bg-paper-2 p-6 sm:px-10 sm:py-9">
          <h3 className="text-[22px] font-extrabold tracking-[-.02em] text-ink sm:text-[24px]">{t.privacyTitle}</h3>
          {/*
            LEGAL REVIEW REQUIRED before this ships. This copy must match the
            Termly policy on /privacy and the B2B data products actually in
            production. Targeted advertising and dynamic pricing carry specific
            CCPA/CPRA obligations (incl. a "Do Not Sell or Share My Personal
            Information" link) that this section does not yet address.
          */}
          <div className="mt-4 flex max-w-[840px] flex-col gap-3 text-[15px] font-medium leading-[1.6] text-ink-3">
            {t.privacyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              {t.privacyLinkBefore}
              <a href="/privacy" className="font-bold text-brand transition-colors hover:text-brand-deep">
                {t.privacyLink}
              </a>
              {t.privacyLinkAfter}
            </p>
          </div>
        </div>

        <div id="rewards" className="mt-[18px] rounded-[22px] border border-line bg-paper-2 p-6 sm:px-10 sm:py-9">
          <h3 className="text-[22px] font-extrabold tracking-[-.02em] text-ink sm:text-[24px]">{t.rewardsTitle}</h3>
          <p className="mt-4 max-w-[840px] text-[15px] font-medium leading-[1.6] text-ink-3">{t.rewardsBody}</p>

          <div className="mt-5 rounded-2xl bg-paper px-5 py-5 sm:px-[26px] sm:py-[22px]">
            <div className="flex items-center gap-2 text-[15px] font-extrabold text-ink">
              <img src="/upcoin.png" alt="" width="18" height="18" className="h-[18px] w-[18px] object-contain" />
              {t.rewardsHow}
            </div>
            <ul className="mt-3 flex flex-col gap-2 text-[14px] font-medium leading-[1.5] text-ink-3">
              {t.rewardSteps.map((step) => (
                <li key={step} className="flex gap-[9px]">
                  <span className="font-extrabold text-brand">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-[18px] text-[12px] font-medium italic text-muted-3">{t.rewardsFinePrint}</p>
        </div>
      </div>
    </section>
  );
}
