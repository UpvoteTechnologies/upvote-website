import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkClass = 'text-left text-[13px] font-semibold text-footer-muted transition-colors hover:text-white';
  const headingClass = 'mb-[14px] text-[13.5px] font-extrabold text-white';

  return (
    <footer className="bg-footer text-footer-text">
      <div className="site-container pb-8 pt-12 lg:pt-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <img src="/brand/logo-white.svg" alt="Upvote" className="h-7 w-auto" />
            <p className="mt-[14px] max-w-[260px] text-[13px] font-medium leading-[1.55] text-footer-muted">
              Know what fits your diet. Scan any product and see how well it matches the way you eat.
            </p>
          </div>

          <div>
            <h3 className={headingClass}>Product</h3>
            <ul className="flex flex-col gap-[9px]">
              <li>
                <button onClick={() => scrollToSection('features')} className={linkClass}>
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className={linkClass}>
                  How It Works
                </button>
              </li>
              <li>
                <Link to="/download" className={linkClass}>
                  Download App
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>Company</h3>
            <ul className="flex flex-col gap-[9px]">
              <li>
                <button onClick={() => scrollToSection('about')} className={linkClass}>
                  About Us
                </button>
              </li>
              <li>
                <Link to="/privacy" className={linkClass}>
                  Privacy
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection('rewards')} className={linkClass}>
                  Rewards Terms
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>Contact</h3>
            <ul className="flex flex-col gap-[9px]">
              <li>
                <button onClick={() => scrollToSection('contact')} className={linkClass}>
                  Contact Form
                </button>
              </li>
              <li>
                <a href="mailto:admin@upvote.app" className={linkClass}>
                  admin@upvote.app
                </a>
              </li>
            </ul>
            <p className="mt-3 text-[11px] font-medium text-footer-faint">
              For app support, open Settings → Help in the app
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-[12.5px] font-semibold text-footer-faint">
            © {new Date().getFullYear()} Upvote. All rights reserved.
          </p>
          <p className="max-w-[420px] text-center text-[11px] font-medium text-footer-faint md:text-right">
            Amazon is a trademark of Amazon.com, Inc. or its affiliates. Amazon does not sponsor or endorse Upvote.
          </p>
        </div>
      </div>
    </footer>
  );
}
