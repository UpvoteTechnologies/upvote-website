import { ArrowRight } from 'lucide-react';
import { getDict, type Locale } from '../i18n';

interface DietsProps {
  locale: Locale;
  /** Page of each diet, index-aligned with `diets.list`; `null` when the diet has no page. */
  links: (string | null)[];
  /** The page that lists every diet. */
  indexHref: string;
}

export default function Diets({ locale, links, indexHref }: DietsProps) {
  const dict = getDict(locale);
  const t = dict.diets;
  const row = 'flex items-center justify-between gap-3 border-t border-line-2 py-[13px] text-[15px] font-bold text-ink';

  return (
    <section id="diets" className="bg-paper">
      <div className="site-container py-16 lg:py-24">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h2 className="section-title">{t.title}</h2>
            <p className="section-lead mt-5 max-w-[460px] text-pretty">{t.lead}</p>
            <a
              href={indexHref}
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-extrabold text-brand transition-colors hover:text-brand-deep"
            >
              {dict.dietPages.allDiets}
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
            </a>
          </div>

          <ul className="grid grid-cols-2 gap-x-8 border-b border-line-2 sm:grid-cols-3">
            {t.list.map((diet, index) => {
              const href = links[index];
              return (
                <li key={diet}>
                  {href ? (
                    <a href={href} className={`${row} group transition-colors hover:text-brand`}>
                      {diet}
                      <ArrowRight
                        className="h-[15px] w-[15px] flex-none text-muted-4 transition-[color,transform] group-hover:translate-x-[3px] group-hover:text-brand"
                        strokeWidth={2.2}
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <span className={row}>{diet}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/*
          LEGAL REVIEW REQUIRED. Upvote scores products against a profile the user
          configures. It must not read as medical or dietary advice, and the
          allergen flags must not read as a safety guarantee. Keep this disclaimer
          visible wherever diets or allergens are promised.
        */}
        <p className="mt-10 max-w-[760px] text-[12.5px] font-medium leading-[1.6] text-muted">{t.disclaimer}</p>
      </div>
    </section>
  );
}
