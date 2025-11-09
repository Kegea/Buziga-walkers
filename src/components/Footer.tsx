import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">Buziga Dog Walkers</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Professional dog walking and pet care services in Kampala. Giving your furry friend 
              the exercise and care they deserve.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/bzugawalkers"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors duration-300 p-2 hover:bg-gray-800 rounded-lg"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-amber-500 transition-colors duration-300 text-sm block py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-amber-500 transition-colors duration-300 text-sm block py-1">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-amber-500 transition-colors duration-300 text-sm block py-1">
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-amber-500 transition-colors duration-300 text-sm block py-1">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-amber-500 transition-colors duration-300 text-sm block py-1">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-amber-500 transition-colors duration-300 text-sm block py-1">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-amber-500 transition-colors duration-300 text-sm block py-1">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-amber-500 transition-colors duration-300 text-sm block py-1">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-amber-500 transition-colors duration-300 text-sm block py-1">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Contact Info</h4>
            <div className="space-y-4">
              {/* Phone Numbers */}
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" />
                <div className="space-y-2">
                  <a 
                    href="tel:+256784749832" 
                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 block text-sm"
                  >
                    +256 784 749 832
                  </a>
                  <a 
                    href="tel:+256781296804" 
                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 block text-sm"
                  >
                    +256 781 296 804
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" />
                <a 
                  href="mailto:emask2.0user1@outlook.com" 
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-300 text-sm break-words"
                >
                  emask2.0user1@outlook.com
                </a>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Serving Buziga, Munyonyo, Bunga, Kansanga, Ggaba
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} Buziga Dog Walkers. All rights reserved.</p>
            </div>
            
            <div className="text-gray-500 text-sm text-center md:text-right">
              <p>Monday - Friday: 7:00 AM - 6:00 PM | Saturday: 9:00 AM - 1:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}