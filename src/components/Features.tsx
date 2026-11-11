import { Smartphone, Sparkles, Target, Shield, Share2, Gift } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getDict, type Locale } from '../i18n';

// Index-aligned with `features.items` in the dictionaries.
const icons = [Sparkles, Smartphone, Target, Shield, Share2, Gift];

export default function Features({ locale }: { locale: Locale }) {
  const t = getDict(locale).features;
  // Cards are visible in the server-rendered HTML; the reveal only arms once the script runs,
  // so the section still reads without JavaScript.
  const [armed, setArmed] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setArmed(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards((prev) => (prev.includes(index) ? prev : [...prev, index]));
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="border-t border-line bg-paper-2">
      <div className="site-container py-16 lg:py-[88px]">
        <div className="mb-10 text-center lg:mb-[52px]">
          <h2 className="section-title">{t.title}</h2>
          <p className="section-lead mx-auto mt-4 max-w-[600px] text-pretty">{t.lead}</p>
        </div>

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((feature, index) => {
            const Icon = icons[index];
            const isVisible = !armed || visibleCards.includes(index);

            return (
              <div
                key={feature.title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`card bg-paper p-7 transition-all duration-700 hover:border-brand/40 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: isVisible ? `${(index % 3) * 90}ms` : '0ms' }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-brand-soft">
                  <Icon className="h-[22px] w-[22px] text-brand" strokeWidth={1.9} />
                </div>
                <h3 className="mt-[18px] text-[19px] font-extrabold tracking-[-.015em] text-ink">{feature.title}</h3>
                <p className="mt-2 text-pretty text-[14px] font-medium leading-[1.55] text-muted">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
