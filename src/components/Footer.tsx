import { downloadHref, getDict, sectionHref, type Locale } from '../i18n';
import { CONTACT_EMAIL } from '../site';

interface FooterProps {
  locale: Locale;
  /** The same page in the other language, for the language switch. */
  switchHref: string;
}

export default function Footer({ locale, switchHref }: FooterProps) {
  const dict = getDict(locale);
  const t = dict.footer;

  const linkClass = 'text-left text-[13px] font-semibold text-footer-muted transition-colors hover:text-white';
  const headingClass = 'mb-[14px] text-[13.5px] font-extrabold text-white';

  return (
    <footer className="bg-footer text-footer-text">
      <div className="site-container pb-8 pt-12 lg:pt-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <img src="/brand/logo-white.svg" alt="Upvote" width="132" height="28" className="h-7 w-auto" />
            <p className="mt-[14px] max-w-[260px] text-[13px] font-medium leading-[1.55] text-footer-muted">
              {t.tagline}
            </p>
          </div>

          <div>
            <h3 className={headingClass}>{t.product}</h3>
            <ul className="flex flex-col gap-[9px]">
              <li>
                <a href={sectionHref(locale, 'features')} className={linkClass}>
                  {t.features}
                </a>
              </li>
              <li>
                <a href={sectionHref(locale, 'how-it-works')} className={linkClass}>
                  {t.howItWorks}
                </a>
              </li>
              <li>
                <a href={downloadHref(locale)} className={linkClass}>
                  {t.download}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>{t.company}</h3>
            <ul className="flex flex-col gap-[9px]">
              <li>
                <a href={sectionHref(locale, 'about')} className={linkClass}>
                  {t.about}
                </a>
              </li>
              <li>
                <a href="/privacy" className={linkClass}>
                  {t.privacy}
                </a>
              </li>
              <li>
                <a href={sectionHref(locale, 'rewards')} className={linkClass}>
                  {t.rewards}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>{t.contact}</h3>
            <ul className="flex flex-col gap-[9px]">
              <li>
                <a href={sectionHref(locale, 'contact')} className={linkClass}>
                  {t.contactForm}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
            <p className="mt-3 text-[11px] font-medium text-footer-faint">{t.support}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-[12.5px] font-semibold text-footer-faint">
            © {new Date().getFullYear()} {t.rights}{' '}
            <a
              href={switchHref}
              hrefLang={locale === 'en' ? 'pt-BR' : 'en'}
              className="ml-2 underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              {dict.nav.switchLanguage}
            </a>
          </p>
          <p className="max-w-[420px] text-center text-[11px] font-medium text-footer-faint md:text-right">
            {t.trademark}
          </p>
        </div>
      </div>
    </footer>
  );
}
