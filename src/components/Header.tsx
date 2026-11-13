import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AnimatedLockup from '../brand/AnimatedLockup';
import { downloadHref, getDict, localePath, sectionHref, type Locale } from '../i18n';

interface HeaderProps {
  locale: Locale;
  /** The same page in the other language, for the language switch. */
  switchHref: string;
}

export default function Header({ locale, switchHref }: HeaderProps) {
  const dict = getDict(locale);
  const t = dict.nav;
  // Content sections first, then the landing page anchors.
  const links = [
    ...dict.pages.links,
    ...t.items.map((item) => ({ href: sectionHref(locale, item.id), label: item.label })),
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
      <nav className="site-container">
        <div className="flex h-[68px] items-center gap-6 lg:h-[76px] lg:gap-9">
          {/* The lockup plays the app's splash once on load, then stays as the static logo. */}
          <a
            href={localePath(locale)}
            className="flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label={t.homeLabel}
          >
            <AnimatedLockup height={34} className="h-7 w-auto sm:h-[34px]" />
          </a>

          <div className="hidden flex-1 items-center gap-6 lg:flex lg:gap-[26px]">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13.5px] font-bold text-ink-3 transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={switchHref}
              hrefLang={locale === 'en' ? 'pt-BR' : 'en'}
              aria-label={t.switchLanguage}
              className="rounded-full px-3 py-[9px] text-[13px] font-extrabold text-muted transition-colors hover:bg-paper-2 hover:text-brand"
            >
              {t.switchLanguageShort}
            </a>

            <a
              href={downloadHref(locale)}
              className="rounded-full bg-brand px-5 py-[11px] text-[13.5px] font-extrabold text-white shadow-btn-inset transition-colors hover:bg-brand-deep"
            >
              {t.getApp}
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-ink-3 transition-colors hover:bg-paper-2 lg:hidden"
              aria-label={t.toggleMenu}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-line py-3 lg:hidden">
            <div className="flex flex-col">
              {links.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-left text-[15px] font-bold text-ink-3 transition-colors hover:bg-paper-2 hover:text-brand"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
