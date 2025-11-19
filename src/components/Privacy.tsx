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
    <section id="privacy" className="py-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center space-x-2 text-gray-600 hover:text-upvote-pink transition-colors mb-8 group inline-flex"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-gray-900">
            Privacy Policy
          </h1>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div name="termly-embed" data-id="babeea2f-52c8-4655-b2ec-061c72ff9f91"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
