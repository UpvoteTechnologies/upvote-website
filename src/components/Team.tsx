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
      <div className="site-container py-16 lg:py-[88px]">
        <div className="mb-10 text-center lg:mb-[52px]">
          <h2 className="section-title">{t.title}</h2>
          <p className="section-lead mx-auto mt-4 max-w-[660px] text-pretty">{t.lead}</p>
        </div>

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {leadership.map((person, index) => (
            <div key={person.name} className="card group overflow-hidden bg-paper">
              <div className="h-[280px] overflow-hidden bg-[#EDEAE0]">
                <img
                  src={person.photo}
                  alt={person.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="px-[26px] pb-7 pt-6">
                <h3 className="text-[20px] font-extrabold tracking-[-.015em] text-ink">{person.name}</h3>
                <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[.12em] text-brand">{t.leadership[index].role}</p>

                <ul className="mt-4 flex flex-col gap-[7px]">
                  {t.leadership[index].highlights.map((item) => (
                    <li key={item} className="flex gap-2 text-[12.5px] font-medium leading-[1.45] text-muted">
                      <span className="font-extrabold text-brand">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-muted-2 transition-colors hover:text-brand"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[22px] border border-line bg-paper px-6 py-8 sm:px-10">
          <h3 className="text-center text-[20px] font-extrabold text-ink">{t.engineering}</h3>

          <div className="mt-[26px] flex flex-wrap justify-center gap-x-[52px] gap-y-8">
            {engineers.map((person) => (
              <div key={person.name} className="w-[120px] text-center">
                <div className="mx-auto h-[88px] w-[88px] overflow-hidden rounded-[18px] bg-[#EDEAE0]">
                  <img
                    src={person.photo}
                    alt={person.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <h4 className="mt-[11px] text-[14px] font-extrabold text-ink">{person.name}</h4>
                <p className="mt-[2px] text-[12px] font-semibold text-muted-2">{person.background}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
