import { Heart, Shield, Sparkles, Award, Lock, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              About Upvote
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A free app for everyone whose diet doesn't fit the label
            </p>
          </div>

          <div className="mb-20">
            <p className="text-xl text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              Nutrition labels are written for an average shopper who doesn't exist. If you're keto, diabetic, gluten-free, or managing an allergy, the label makes you do the work every aisle, every time. Upvote does it for you. Set your diet once, scan any product, and get a 0–100 score for how well it fits you specifically. The more you scan, the sharper it gets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="group bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-upvote w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Built For Your Diet</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Keto, diabetic-friendly, gluten-free, low-sodium, or an allergy you can't take chances on
              </p>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-upvote-blue w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Free to Use</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                No hidden fees, no subscriptions, no paywall. The full app, for everyone
              </p>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-upvote w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">People Who Eat Like You</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Reviews from people managing the same diet, not from the average shopper
              </p>
            </div>
          </div>

          <div id="privacy" className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 sm:p-10 md:p-12 mb-12 border border-blue-100">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
              <div className="bg-upvote-blue w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
                  Privacy & How Upvote Stays Free
                </h3>
                {/*
                  LEGAL REVIEW REQUIRED before this ships. This copy must match the
                  Termly policy on /privacy and the B2B data products actually in
                  production. Targeted advertising and dynamic pricing carry specific
                  CCPA/CPRA obligations (incl. a "Do Not Sell or Share My Personal
                  Information" link) that this section does not yet address.
                */}
                <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                  <p>
                    You are in control of your profile. Update it or delete it at any time.
                  </p>
                  <p>
                    Upvote is free, with no subscription and no paywall. We fund it by turning what
                    the community scans and reviews into consumer insights and research that we
                    license to business partners.
                  </p>
                  <p>
                    Our{' '}
                    <Link to="/privacy" className="text-upvote-blue font-semibold hover:text-upvote-pink transition-colors">
                      Privacy Policy
                    </Link>{' '}
                    sets out exactly what we collect, how it is used, and the choices you have.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="rewards" className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-3xl p-6 sm:p-10 md:p-12 border border-orange-100">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
              <div className="bg-gradient-upvote w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="w-full">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
                  Rewards Program
                </h3>
                <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                  <p>
                    Earn Upcoins for contributing genuine reviews and redeem them for rewards. Your honest feedback helps the next person on your diet, and gets you closer to great rewards.
                  </p>

                  <div className="bg-white/80 rounded-2xl p-4 sm:p-6 mt-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center text-base sm:text-lg">
                      <Coins className="w-5 h-5 mr-2 text-upvote-orange flex-shrink-0" />
                      How it works:
                    </h4>
                    <ul className="space-y-3 ml-0 sm:ml-7">
                      <li className="flex items-start">
                        <span className="text-upvote-pink mr-2 flex-shrink-0">•</span>
                        <span>Write helpful product reviews</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-upvote-pink mr-2 flex-shrink-0">•</span>
                        <span>Earn Upcoins for each contribution</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-upvote-pink mr-2 flex-shrink-0">•</span>
                        <span>Redeem your Upcoins for rewards like gift cards</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-upvote-pink mr-2 flex-shrink-0">•</span>
                        <span>Track your balance in the app</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-orange-200 pt-6 mt-6">
                    <p className="text-xs sm:text-sm text-gray-600 italic">
                      Availability and amounts may vary by region and over time. Terms apply. Amazon is a trademark of Amazon.com, Inc. or its affiliates. Amazon does not sponsor or endorse Upvote.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
