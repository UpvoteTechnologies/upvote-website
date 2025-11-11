import { Smartphone, Sparkles, Target, Shield, Share2, Gift } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const features = [
  {
    icon: Smartphone,
    title: 'Smart Scanning',
    description: 'Point your camera at any product label and get instant insights tailored to your needs',
    color: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    icon: Sparkles,
    title: 'Personal Profile',
    description: 'Set your dietary goals, allergies, and lifestyle preferences for truly personalized recommendations',
    color: 'linear-gradient(135deg, #a855f7, #ec4899)',
  },
  {
    icon: Target,
    title: 'Match Score 0-100',
    description: 'Every product gets a score based on how well it fits your unique profile',
    color: 'linear-gradient(135deg, #f97316, #ef4444)',
  },
  {
    icon: Shield,
    title: 'Allergen Alerts',
    description: 'Get instant notifications about ingredients you need to avoid for your safety',
    color: 'linear-gradient(135deg, #22c55e, #10b981)',
  },
  {
    icon: Share2,
    title: 'Community Reviews',
    description: 'Share experiences and discover products loved by people with similar preferences',
    color: 'linear-gradient(135deg, #6366f1, #3b82f6)',
  },
  {
    icon: Gift,
    title: 'Earn Rewards',
    description: 'Get Upcoins for every helpful review and redeem them for real rewards',
    color: 'linear-gradient(135deg, #eab308, #f97316)',
  },
];

export default function Features() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards((prev) =>
              prev.includes(index) ? prev : [...prev, index].sort((a, b) => a - b)
            );
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px',
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionMiddle = sectionRect.top + sectionRect.height / 2;
      const viewportMiddle = window.innerHeight / 2;

      let closestCard = null;
      let closestDistance = Infinity;

      cardRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const cardMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(cardMiddle - viewportMiddle);

        if (distance < closestDistance && rect.top < viewportMiddle && rect.bottom > viewportMiddle) {
          closestDistance = distance;
          closestCard = index;
        }
      });

      setActiveCard(closestCard);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {visibleCards.map((index) => (
          <div
            key={index}
            className="absolute w-96 h-96 rounded-full opacity-5 blur-3xl transition-all duration-1000"
            style={{
              background: features[index].color,
              left: `${(index % 3) * 33}%`,
              top: `${Math.floor(index / 3) * 50}%`,
              transform: activeCard === index ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to make informed product choices that align with your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.includes(index);
            const isActive = activeCard === index;

            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`group relative bg-white rounded-3xl p-8 border transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                } ${
                  isActive
                    ? 'shadow-2xl scale-105 border-transparent'
                    : 'shadow-md hover:shadow-xl border-gray-100 hover:border-gray-200'
                }`}
                style={{
                  transitionDelay: isVisible ? `${(index % 3) * 100}ms` : '0ms',
                }}
              >
                {/* Gradient overlay on active card */}
                <div
                  className={`absolute inset-0 rounded-3xl transition-opacity duration-700 ${
                    isActive ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'
                  }`}
                  style={{
                    background: feature.color
                  }}
                ></div>

                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-700 ${
                      isActive ? 'scale-110 rotate-6' : 'group-hover:scale-105 group-hover:rotate-3'
                    }`}
                    style={{
                      background: feature.color
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
                    isActive ? 'text-transparent bg-clip-text' : 'text-gray-900 group-hover:text-upvote-pink'
                  }`}
                  style={isActive ? {
                    backgroundImage: feature.color
                  } : undefined}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>

                  {/* Progress indicator for active card */}
                  {isActive && (
                    <div className="absolute -left-4 top-0 w-1 h-full rounded-full overflow-hidden">
                      <div
                        className="w-full h-full animate-pulse"
                        style={{
                          background: feature.color.replace('135deg', '180deg')
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
