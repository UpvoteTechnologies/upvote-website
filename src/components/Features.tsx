import { getDict, type Locale } from '../i18n';

export default function Features({ locale }: { locale: Locale }) {
  const t = getDict(locale).features;

  return (
    <section id="features" className="border-t border-line bg-paper-2">
      <div className="site-container grid gap-x-16 gap-y-10 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="section-title">{t.title}</h2>
          <p className="section-lead mt-5 max-w-[440px] text-pretty">{t.lead}</p>
        </div>

        <dl className="grid gap-x-10 border-b border-line-2 sm:grid-cols-2">
          {t.items.map((feature) => (
            <div key={feature.title} className="border-t border-line-2 py-6">
              <dt className="text-[18px] font-extrabold tracking-[-.015em] text-ink">{feature.title}</dt>
              <dd className="mt-2 text-pretty text-[14.5px] font-medium leading-[1.55] text-muted">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
