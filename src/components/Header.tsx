import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pulsingElement, setPulsingElement] = useState<string | null>(null);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleClick = (elementId: string) => {
    setPulsingElement(elementId);
    
    setTimeout(() => {
      setPulsingElement(null);
    }, 600);
  };

  const isPulsing = (elementId: string) => pulsingElement === elementId;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => handleClick('logo')}
            className="flex items-center space-x-2 group flex-shrink-0 transition-all duration-300"
          >
            <img 
              src="/Buzigawalkers.png" 
              alt="Buziga Dog Walkers" 
              className={`h-12 w-auto transition-all duration-300 ${isPulsing('logo') ? 'animate-pulse' : ''}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center max-w-3xl mx-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => handleClick(`nav-${item.name}`)}
                className={`text-sm font-medium transition-all duration-300 relative group/nav px-2 py-2 rounded-lg whitespace-nowrap ${
                  isActive(item.href) 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-gray-700 hover:text-amber-600'
                } ${isPulsing(`nav-${item.name}`) ? 'animate-pulse' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Contact & CTA */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <a
              href="tel:+256784749832"
              onClick={() => handleClick('phone-1')}
              className={`flex items-center space-x-2 text-sm text-gray-700 hover:text-amber-600 transition-all duration-300 group/phone px-3 py-2 rounded-lg whitespace-nowrap ${
                isPulsing('phone-1') ? 'animate-pulse' : ''
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>+256 784 749 832</span>
            </a>
            <Link
              to="/contact"
              onClick={() => handleClick('cta')}
              className={`bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-all duration-300 group/cta whitespace-nowrap text-sm ${
                isPulsing('cta') ? 'animate-pulse' : ''
              }`}
            >
              <span className="flex items-center space-x-1">
                <span>Book a Walk</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              handleClick('menu-button');
              setIsMenuOpen(!isMenuOpen);
            }}
            className={`lg:hidden p-2 rounded-md text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-all duration-300 flex-shrink-0 ${
              isPulsing('menu-button') ? 'animate-pulse' : ''
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => {
                  handleClick(`mobile-nav-${item.name}`);
                  setIsMenuOpen(false);
                }}
                className={`block px-4 py-2 rounded-md text-base font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive(item.href)
                    ? 'bg-amber-50 text-amber-600'
                    : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                } ${isPulsing(`mobile-nav-${item.name}`) ? 'animate-pulse' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t">
              <a
                href="tel:+256784749832"
                onClick={() => handleClick('mobile-phone-1')}
                className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-md transition-all duration-300 whitespace-nowrap ${
                  isPulsing('mobile-phone-1') ? 'animate-pulse' : ''
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>+256 784 749 832</span>
              </a>
              <a
                href="tel:+256781296804"
                onClick={() => handleClick('mobile-phone-2')}
                className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-md transition-all duration-300 whitespace-nowrap ${
                  isPulsing('mobile-phone-2') ? 'animate-pulse' : ''
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>+256 781 296 804</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}