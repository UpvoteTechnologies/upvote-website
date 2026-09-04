import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AnimatedLockup from '../brand/AnimatedLockup';

const navItems = [
  { id: 'diets', label: 'Diets' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'about', label: 'About' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = '/';
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/[.82] backdrop-blur-xl backdrop-saturate-150">
      <nav className="site-container">
        <div className="flex h-[68px] items-center gap-6 lg:h-[76px] lg:gap-9">
          {/* The lockup plays the app's splash once on load, then stays as the static logo. */}
          <button
            onClick={scrollToTop}
            className="flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Upvote — back to top"
          >
            <AnimatedLockup height={34} className="h-7 w-auto sm:h-[34px]" />
          </button>

          <div className="hidden flex-1 items-center gap-6 md:flex lg:gap-[26px]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[13.5px] font-bold text-ink-3 transition-colors hover:text-brand"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/download"
              className="rounded-full bg-brand px-5 py-[11px] text-[13.5px] font-extrabold text-white shadow-btn-inset transition-colors hover:bg-brand-deep"
            >
              Get the app
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-ink-3 transition-colors hover:bg-paper-2 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-line py-3 md:hidden">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="rounded-xl px-3 py-3 text-left text-[15px] font-bold text-ink-3 transition-colors hover:bg-paper-2 hover:text-brand"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
