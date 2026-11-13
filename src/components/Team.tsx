import { Linkedin } from 'lucide-react';
import { getDict, type Locale } from '../i18n';

// Roles and highlights live in the dictionaries, index-aligned with this list.
type Leader = {
  name: string;
  photo: string;
  linkedin?: string;
};

const leadership: Leader[] = [
  {
    name: 'Jaques Castello',
    photo: '/team/jaques-castello.jpg',
  },
  {
    name: 'João Steiner',
    photo: '/team/joao-steiner.png',
  },
  {
    name: 'Michel Sena',
    photo: '/team/michel-sena.jpg',
  },
];

const engineers = [
  { name: 'Gustavo M.', background: 'ITA / Teora', photo: '/team/gustavo-m.jpg' },
  { name: 'Caio M.', background: 'ITA / FoodAtlas', photo: '/team/caio-m.png' },
];

export default function Team({ locale }: { locale: Locale }) {
  const t = getDict(locale).team;

  return (
    <section id="team" className="border-t border-line bg-paper-2">
      <div className="site-container py-16 lg:py-24">
        <div className="max-w-[720px]">
          <h2 className="section-title">{t.title}</h2>
          <p className="section-lead mt-5 text-pretty">{t.lead}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person, index) => (
            <div key={person.name}>
              <img
                src={person.photo}
                alt={person.name}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-[24px] bg-line object-cover object-top"
              />

              <h3 className="mt-5 text-[21px] font-extrabold tracking-[-.015em] text-ink">{person.name}</h3>
              <p className="mt-[2px] text-[14px] font-bold text-brand">{t.leadership[index].role}</p>

              <ul className="mt-4 border-b border-line-2 text-[13.5px] font-medium leading-[1.45] text-ink-3">
                {t.leadership[index].highlights.map((item) => (
                  <li key={item} className="border-t border-line-2 py-[9px]">
                    {item}
                  </li>
                ))}
              </ul>

              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-brand"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-x-12 gap-y-5 border-t border-line-2 pt-8 sm:flex-row sm:items-center">
          <h3 className="text-[17px] font-extrabold text-ink">{t.engineering}</h3>

          <ul className="flex flex-wrap gap-x-10 gap-y-5">
            {engineers.map((person) => (
              <li key={person.name} className="flex items-center gap-3">
                <img
                  src={person.photo}
                  alt={person.name}
                  loading="lazy"
                  className="h-14 w-14 flex-none rounded-full bg-line object-cover object-top"
                />
                <div>
                  <p className="text-[14.5px] font-extrabold text-ink">{person.name}</p>
                  <p className="text-[13px] font-semibold text-muted">{person.background}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
