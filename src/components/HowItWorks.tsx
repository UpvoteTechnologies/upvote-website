import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'Download Upvote',
    description: 'Get started in seconds. Download from the App Store or Google Play and open the app',
  },
  {
    number: '02',
    title: 'Set Your Diet',
    description: 'Pick your diet, add your allergies and anything you avoid. It takes under a minute',
  },
  {
    number: '03',
    title: 'Scan Any Product',
    description: 'Point your camera at the label and Upvote reads the ingredients and nutrition facts',
  },
  {
    number: '04',
    title: 'Get Your Match Score',
    description: 'A 0-100 score showing how well the product fits the diet you set, plus what to watch for',
  },
  {
    number: '05',
    title: 'Help Others Like You',
    description: 'Review what you tried, help the next person on your diet, and earn rewards for it',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-brand-dark">
      <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-8 lg:px-10 lg:py-[88px]">
        <div className="mb-10 text-center lg:mb-[52px]">
          <h2 className="section-title !text-white">How It Works</h2>
          <p className="mx-auto mt-[14px] text-base font-medium text-white/[.72] sm:text-[17px]">
            Five steps between you and knowing exactly what fits your diet
          </p>
        </div>

        <div className="flex flex-col gap-[14px]">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-4 rounded-[20px] border border-white/[.14] bg-white/[.07] px-5 py-5 transition-colors hover:bg-white/[.11] sm:items-center sm:gap-5 sm:px-[26px] sm:py-[22px]"
            >
              <span className="w-9 flex-none font-mono text-[20px] font-bold leading-none text-brand-mint sm:w-11 sm:text-[22px]">
                {step.number}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[17px] font-extrabold tracking-[-.015em] text-white sm:text-[19px]">{step.title}</h3>
                <p className="mt-1 text-[14px] font-medium leading-[1.5] text-white/[.72]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-11 text-center">
          <Link
            to="/download"
            className="inline-block rounded-full bg-paper px-[38px] py-4 text-[16px] font-extrabold text-brand-dark shadow-[0_10px_26px_rgba(0,0,0,.25)] transition-transform hover:scale-[1.03]"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
