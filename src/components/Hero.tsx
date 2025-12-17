import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const appPreviews = [
  'https://api.upvote.dev/storage/v1/object/public/assets/app_preview_1.png',
  'https://api.upvote.dev/storage/v1/object/public/assets/app_preview_2.png',
  'https://api.upvote.dev/storage/v1/object/public/assets/app_preview_3.png',
  'https://api.upvote.dev/storage/v1/object/public/assets/app_preview_4.png',
  'https://api.upvote.dev/storage/v1/object/public/assets/app_preview_5.png',
  'https://api.upvote.dev/storage/v1/object/public/assets/app_preview_6.png',
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [fullscreenIndex, setFullscreenIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % appPreviews.length);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleImageClick = (preview: string, index: number) => {
    setFullscreenImage(preview);
    setFullscreenIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const navigateFullscreen = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (fullscreenIndex + 1) % appPreviews.length
      : (fullscreenIndex - 1 + appPreviews.length) % appPreviews.length;
    setFullscreenIndex(newIndex);
    setFullscreenImage(appPreviews[newIndex]);
  };

  const handleFullscreenImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const imageWidth = rect.width;

    if (clickX < imageWidth / 2) {
      navigateFullscreen('prev');
    } else {
      navigateFullscreen('next');
    }
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex;
    const total = appPreviews.length;
    const normalizedDiff = ((diff + total) % total);

    if (normalizedDiff === 0) {
      return { x: 0, z: 0, opacity: 1, scale: 1 };
    } else if (normalizedDiff === 1 || normalizedDiff === -total + 1) {
      return { x: 70, z: -200, opacity: 0.4, scale: 0.75 };
    } else if (normalizedDiff === total - 1 || normalizedDiff === -1) {
      return { x: -70, z: -200, opacity: 0.4, scale: 0.75 };
    } else {
      return { x: 0, z: -400, opacity: 0, scale: 0.5 };
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up text-gray-900">
              Product Reviews
              <br />
              <span className="bg-gradient-upvote bg-clip-text text-transparent">That Fit You</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Scan, find, and share products that match your lifestyle and dietary needs. Get personalized match scores from 0-100 tailored just for you.
            </p>

            <div className="flex flex-row gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a
                href="https://apps.apple.com/us/app/upvote-food-diet-scanner/id6753091251"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:scale-105 transition-transform flex-shrink-0"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-12 sm:h-14"
                />
              </a>
              <button
                onClick={() => alert('Coming Soon!')}
                className="inline-block hover:scale-105 transition-transform flex-shrink-0"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-12 sm:h-14"
                />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div>
                <div className="text-4xl font-bold mb-1 bg-gradient-upvote bg-clip-text text-transparent">0-100</div>
                <div className="text-sm text-gray-600">Match Score</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1 bg-gradient-upvote bg-clip-text text-transparent">Free</div>
                <div className="text-sm text-gray-600">Always</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1 bg-gradient-upvote bg-clip-text text-transparent">Smart</div>
                <div className="text-sm text-gray-600">Personalized</div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {!isMobile ? (
              <>
                <div className="relative w-full max-w-2xl mx-auto h-[600px] flex items-center justify-center" style={{ perspective: '1200px' }}>
                  <div className="absolute -inset-4 bg-gradient-upvote opacity-10 rounded-3xl blur-3xl"></div>

                  <div className="relative w-full h-full flex items-center justify-center">
                    {appPreviews.map((preview, index) => {
                      const { x, z, opacity, scale } = getSlidePosition(index);
                      const isCenter = index === currentIndex;

                      return (
                        <div
                          key={preview}
                          className="absolute transition-all duration-700 ease-out cursor-pointer"
                          style={{
                            transform: `translateX(${x}%) translateZ(${z}px) scale(${scale})`,
                            opacity,
                            zIndex: isCenter ? 20 : 10 - Math.abs(z) / 100,
                            pointerEvents: 'auto',
                          }}
                          onClick={() => !isCenter && handleDotClick(index)}
                        >
                          <img
                            src={preview}
                            alt={`Upvote App Preview ${index + 1}`}
                            className="w-[320px] h-auto rounded-3xl shadow-2xl"
                            style={{
                              animation: isCenter ? 'float 6s ease-in-out infinite' : 'none'
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-16">
                  {appPreviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-2 rounded-full transition-all ${
                        currentIndex === index ? 'w-8 bg-gradient-upvote' : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to preview ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="relative w-full overflow-x-auto -mx-4 px-4 scrollbar-hide">
                  <div
                    className="flex gap-4 pb-4"
                    style={{
                      scrollSnapType: 'x mandatory',
                      WebkitOverflowScrolling: 'touch'
                    }}
                    onScroll={(e) => {
                      const scrollLeft = e.currentTarget.scrollLeft;
                      const itemWidth = 280 + 16;
                      const newIndex = Math.round(scrollLeft / itemWidth);
                      setCurrentIndex(newIndex);
                    }}
                  >
                    {appPreviews.map((preview, index) => (
                      <div
                        key={preview}
                        className="flex-shrink-0 cursor-pointer"
                        style={{ scrollSnapAlign: 'center' }}
                        onClick={() => handleImageClick(preview, index)}
                      >
                        <img
                          src={preview}
                          alt={`Upvote App Preview ${index + 1}`}
                          className="w-[280px] h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-6">
                  {appPreviews.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        currentIndex === index ? 'w-8 bg-gradient-upvote' : 'w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {fullscreenImage && createPortal(
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close fullscreen"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen preview"
            className="max-w-full max-h-full object-contain cursor-pointer"
            onClick={handleFullscreenImageClick}
          />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {appPreviews.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  fullscreenIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
