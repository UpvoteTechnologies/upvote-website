import { Heart, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  {
    icon: Heart,
    title: 'Built For Your Diet',
    body: "Keto, diabetic-friendly, gluten-free, low-sodium, or an allergy you can't take chances on",
  },
  {
    icon: Shield,
    title: 'Free to Use',
    body: 'No hidden fees, no subscriptions, no paywall. The full app, for everyone',
  },
  {
    icon: Sparkles,
    title: 'People Who Eat Like You',
    body: 'Reviews from people managing the same diet, not from the average shopper',
  },
];

const rewardSteps = [
  'Write helpful product reviews',
  'Earn Upcoins for each contribution',
  'Redeem your Upcoins for rewards like gift cards',
  'Track your balance in the app',
];

export default function About() {
  return (
    <section id="about" className="border-t border-line bg-paper">
      <div className="site-container py-16 lg:py-[88px]">
        <div className="text-center">
          <h2 className="section-title">About Upvote</h2>
          <p className="section-lead mx-auto mt-[14px]">A free app for everyone whose diet doesn't fit the label</p>
        </div>

        <p className="mx-auto mt-9 max-w-[820px] text-pretty text-center text-[16px] font-medium leading-[1.6] text-ink-2 sm:text-[18px]">
          Nutrition labels are written for an average shopper who doesn't exist. If you're keto, diabetic, gluten-free, or managing an allergy, the label makes you do the work every aisle, every time. Upvote does it for you. Set your diet once, scan any product, and get a 0–100 score for how well it fits you specifically. The more you scan, the sharper it gets.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
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
          <h3 className="text-[22px] font-extrabold tracking-[-.02em] text-ink sm:text-[24px]">
            Privacy &amp; How Upvote Stays Free
          </h3>
          {/*
            LEGAL REVIEW REQUIRED before this ships. This copy must match the
            Termly policy on /privacy and the B2B data products actually in
            production. Targeted advertising and dynamic pricing carry specific
            CCPA/CPRA obligations (incl. a "Do Not Sell or Share My Personal
            Information" link) that this section does not yet address.
          */}
          <div className="mt-4 flex max-w-[840px] flex-col gap-3 text-[15px] font-medium leading-[1.6] text-ink-3">
            <p>You are in control of your profile. Update it or delete it at any time.</p>
            <p>
              Upvote is free, with no subscription and no paywall. We fund it by turning what the
              community scans and reviews into consumer insights and research that we license to
              business partners.
            </p>
            <p>
              Our{' '}
              <Link to="/privacy" className="font-bold text-brand transition-colors hover:text-brand-deep">
                Privacy Policy
              </Link>{' '}
              sets out exactly what we collect, how it is used, and the choices you have.
            </p>
          </div>
        </div>

        <div id="rewards" className="mt-[18px] rounded-[22px] border border-line bg-paper-2 p-6 sm:px-10 sm:py-9">
          <h3 className="text-[22px] font-extrabold tracking-[-.02em] text-ink sm:text-[24px]">Rewards Program</h3>
          <p className="mt-4 max-w-[840px] text-[15px] font-medium leading-[1.6] text-ink-3">
            Earn Upcoins for contributing genuine reviews and redeem them for rewards. Your honest feedback helps the next person on your diet, and gets you closer to great rewards.
          </p>

          <div className="mt-5 rounded-2xl bg-paper px-5 py-5 sm:px-[26px] sm:py-[22px]">
            <div className="flex items-center gap-2 text-[15px] font-extrabold text-ink">
              <img src="/upcoin.png" alt="" className="h-[18px] w-[18px] object-contain" />
              How it works:
            </div>
            <ul className="mt-3 flex flex-col gap-2 text-[14px] font-medium leading-[1.5] text-ink-3">
              {rewardSteps.map((step) => (
                <li key={step} className="flex gap-[9px]">
                  <span className="font-extrabold text-brand">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-[18px] text-[12px] font-medium italic text-muted-3">
            Availability and amounts may vary by region and over time. Terms apply. Amazon is a trademark of Amazon.com, Inc. or its affiliates. Amazon does not sponsor or endorse Upvote.
          </p>
        </div>
      </div>
    </section>
  );
}
