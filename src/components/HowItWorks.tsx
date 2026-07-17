import { ArrowDown } from 'lucide-react';
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
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-upvote-blue to-upvote-pink relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
            How It Works
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Five steps between you and knowing exactly what fits your diet
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-start gap-6 md:gap-8 mb-12">
                <div className="flex-shrink-0">
                  <div className="glass-effect w-20 h-20 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1 glass-effect rounded-3xl p-8 md:p-10 group hover:bg-white/20 transition-all duration-300">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex justify-center mb-12">
                  <ArrowDown className="w-8 h-8 text-white/60 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/download"
            className="inline-block bg-white text-upvote-pink px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
