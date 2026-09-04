import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'termly-jssdk';
    script.src = 'https://app.termly.io/embed-policy.min.js';

    const existingScript = document.getElementById('termly-jssdk');
    if (!existingScript) {
      document.body.appendChild(script);
    }

    return () => {
      const scriptToRemove = document.getElementById('termly-jssdk');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <section id="privacy" className="min-h-screen bg-paper py-16 lg:py-20">
      <div className="site-container">
        <Link
          to="/"
          className="group mb-8 inline-flex items-center gap-2 text-[14px] font-bold text-muted transition-colors hover:text-brand"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="section-title mb-8">
            Privacy Policy
          </h1>

          <div className="rounded-[22px] border border-line bg-white p-6 sm:p-8 md:p-12">
            <div {...{ name: 'termly-embed' } as React.HTMLAttributes<HTMLDivElement>} data-id="babeea2f-52c8-4655-b2ec-061c72ff9f91"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
