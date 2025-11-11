import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center group"
          >
            <img
              src="https://api.upvote.dev/storage/v1/object/public/assets/Blue_Horizontal.svg"
              alt="Upvote"
              className="h-8 md:h-10 group-hover:scale-105 transition-transform"
            />
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('features')} className="font-medium transition-colors text-gray-700 hover:text-upvote-pink">
              Features
            </button>
            <button onClick={() => scrollToSection('preview')} className="font-medium transition-colors text-gray-700 hover:text-upvote-pink">
              Preview
            </button>
            <button onClick={() => scrollToSection('about')} className="font-medium transition-colors text-gray-700 hover:text-upvote-pink">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="font-medium transition-colors text-gray-700 hover:text-upvote-pink">
              Contact
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white rounded-b-2xl shadow-xl">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-upvote-pink transition-colors font-medium text-left px-4">
                Features
              </button>
              <button onClick={() => scrollToSection('preview')} className="text-gray-700 hover:text-upvote-pink transition-colors font-medium text-left px-4">
                Preview
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-upvote-pink transition-colors font-medium text-left px-4">
                About
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-upvote-pink transition-colors font-medium text-left px-4">
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
