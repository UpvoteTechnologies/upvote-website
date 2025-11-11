import { Scan, Mail, Shield, FileText } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-upvote p-2 rounded-xl">
                <Scan className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Upvote</span>
            </div>
            <p className="text-sm">
              Product reviews that fit you. Scan, find, and share products that match your lifestyle.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('features')} className="hover:text-upvote-pink transition-colors text-sm">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-upvote-pink transition-colors text-sm">
                  How It Works
                </button>
              </li>
              <li>
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="hover:text-upvote-pink transition-colors text-sm">
                  Download App
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-upvote-pink transition-colors text-sm">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('privacy')} className="hover:text-upvote-pink transition-colors text-sm flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>Privacy</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('rewards')} className="hover:text-upvote-pink transition-colors text-sm flex items-center space-x-1">
                  <FileText className="w-3 h-3" />
                  <span>Rewards Terms</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-upvote-pink transition-colors text-sm flex items-center space-x-1">
                  <Mail className="w-3 h-3" />
                  <span>Contact Form</span>
                </button>
              </li>
              <li>
                <a href="mailto:admin@upvote.app" className="hover:text-upvote-pink transition-colors text-sm">
                  admin@upvote.app
                </a>
              </li>
              <li className="text-xs text-gray-400 pt-2">
                For app support, open Settings → Help in the app
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Upvote. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 text-center md:text-right max-w-md">
              Amazon is a trademark of Amazon.com, Inc. or its affiliates. Amazon does not sponsor or endorse Upvote.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
