import { getDict, type Locale } from '../i18n';

export default function Diets({ locale }: { locale: Locale }) {
  const t = getDict(locale).diets;

  return (
    <section id="diets" className="bg-paper">
      <div className="site-container py-16 lg:py-[88px]">
        <div className="text-center">
          <h2 className="section-title">{t.title}</h2>
          <p className="section-lead mx-auto mt-4 max-w-[640px] text-pretty">{t.lead}</p>
        </div>

        <ul className="mx-auto mt-9 flex max-w-[820px] flex-wrap justify-center gap-[10px]">
          {t.list.map((diet) => (
            <li
              key={diet}
              className="rounded-full border border-line-2 bg-white px-5 py-[11px] text-[14px] font-bold text-ink-2 transition-colors hover:border-brand hover:text-brand"
            >
              {diet}
            </li>
          ))}
        </ul>

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
