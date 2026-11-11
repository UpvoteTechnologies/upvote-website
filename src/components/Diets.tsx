import { getDict, type Locale } from '../i18n';

interface DietsProps {
  locale: Locale;
  /** Page of each chip, index-aligned with `diets.list`; `null` when the diet has no page. */
  links: (string | null)[];
  /** The page that lists every diet. */
  indexHref: string;
}

export default function Diets({ locale, links, indexHref }: DietsProps) {
  const dict = getDict(locale);
  const t = dict.diets;
  const chip =
    'block rounded-full border border-line-2 bg-white px-5 py-[11px] text-[14px] font-bold text-ink-2 transition-colors';

  return (
    <section id="diets" className="bg-paper">
      <div className="site-container py-16 lg:py-[88px]">
        <div className="text-center">
          <h2 className="section-title">{t.title}</h2>
          <p className="section-lead mx-auto mt-4 max-w-[640px] text-pretty">{t.lead}</p>
        </div>

        <ul className="mx-auto mt-9 flex max-w-[820px] flex-wrap justify-center gap-[10px]">
          {t.list.map((diet, index) => {
            const href = links[index];
            return (
              <li key={diet}>
                {href ? (
                  <a href={href} className={`${chip} hover:border-brand hover:text-brand`}>
                    {diet}
                  </a>
                ) : (
                  <span className={chip}>{diet}</span>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-center">
          <a href={indexHref} className="text-[14px] font-extrabold text-brand transition-colors hover:text-brand-deep">
            {dict.dietPages.allDiets} →
          </a>
        </p>

        {/*
          LEGAL REVIEW REQUIRED. Upvote scores products against a profile the user
          configures. It must not read as medical or dietary advice, and the
          allergen flags must not read as a safety guarantee. Keep this disclaimer
          visible wherever diets or allergens are promised.
        */}
        <p className="mx-auto mt-9 max-w-[680px] text-center text-[12.5px] font-medium leading-[1.6] text-muted-3">
          {t.disclaimer}
        </p>
      </div>
    </section>
  );
}
