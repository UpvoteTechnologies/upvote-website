import { Linkedin } from 'lucide-react';

type Leader = {
  name: string;
  role: string;
  photo: string;
  highlights: string[];
  linkedin?: string;
};

const leadership: Leader[] = [
  {
    name: 'Jaques Castello',
    role: 'Co-Founder & CEO',
    photo: '/team/jaques-castello.jpg',
    highlights: [
      '12+ years in CPG, Pricing & Analytics at Kraft Heinz',
      'Former Management Consultant at McKinsey',
      "Mechanical Engineer, ITA '12",
      'National medalist in Math and Astronomy',
    ],
  },
  {
    name: 'João Steiner',
    role: 'Co-Founder & CFO',
    photo: '/team/joao-steiner.png',
    highlights: [
      '8+ years in CPG, Strategy & eCommerce at Kraft Heinz',
      'Former Management Consultant at Falconi',
      "Industrial Engineer, Northwestern University '17",
      'Division 1 student-athlete, Swimming',
    ],
  },
  {
    name: 'Michel Sena',
    role: 'CTO',
    photo: '/team/michel-sena.jpg',
    highlights: [
      '7+ years in software development',
      'Founder & CTO at Teora.app and Guilda',
      "Electronic Engineer, ITA '20",
      'React Native, PostgreSQL, Next.js, Node.js',
    ],
  },
];

const engineers = [
  { name: 'Gustavo M.', background: 'ITA / Teora', photo: '/team/gustavo-m.jpg' },
  { name: 'Caio M.', background: 'ITA / FoodAtlas', photo: '/team/caio-m.png' },
  { name: 'Lucas F.', background: 'ITA / Funniie Tech', photo: '/team/lucas-f.png' },
];

export default function Team() {
  return (
    <section id="team" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built by people who spent their careers inside the food industry, in pricing, analytics
              and eCommerce, and saw how little of what's on the label ever reaches the shopper.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <img
                    src={person.photo}
                    alt={person.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{person.name}</h3>
                  <p className="text-sm font-semibold bg-gradient-upvote bg-clip-text text-transparent mb-5">
                    {person.role}
                  </p>

                  <ul className="space-y-2.5">
                    {person.highlights.map((item) => (
                      <li key={item} className="flex items-start text-gray-600 leading-relaxed">
                        <span className="text-upvote-pink mr-2 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 text-gray-500 hover:text-upvote-pink transition-colors text-sm font-medium"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 sm:p-12 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Engineering</h3>

            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
              {engineers.map((person) => (
                <div key={person.name} className="text-center w-32">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                    <img
                      src={person.photo}
                      alt={person.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h4 className="font-bold text-gray-900">{person.name}</h4>
                  <p className="text-sm text-gray-600">{person.background}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
