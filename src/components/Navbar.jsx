import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-md shadow-lg dark:bg-black/90'
          : 'bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-md dark:bg-black/80'
      }`}
    >
      {/* Import Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Clicker+Script&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo with Clicker Script font */}
          <div className="relative group">
            <a href="#hero" className="flex items-center space-x-2">
              <div className="relative px-4 py-2">
                {/* Top-left corner */}
                <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-purple-600 
                              group-hover:border-pink-600 transition-colors duration-300"></div>
                {/* Bottom-right corner */}
                <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-pink-600 
                              group-hover:border-purple-600 transition-colors duration-300"></div>
                
                <span 
                  className="text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent
                            hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                  style={{ fontFamily: "'Clicker Script', cursive" }}
                >
                  Port
                </span>
                <span 
                  className="text-3xl text-white"
                  style={{ fontFamily: "'Clicker Script', cursive" }}
                >
                  folio
                </span>
                
                {/* Animated glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 
                              group-hover:opacity-20 transition-opacity duration-300 blur"></div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-white font-medium group"
              >
                <span className="relative z-10">{link.name}</span>
                {/* Hover effect */}
                <div className="absolute inset-0 h-full w-full transform scale-0 group-hover:scale-100 
                              transition-transform duration-300 ease-out rounded-lg bg-gradient-to-r 
                              from-purple-600/10 to-pink-600/10"></div>
                {/* Underline effect */}
                <span className="absolute bottom-0 left-0 h-0.5 w-full transform scale-x-0 group-hover:scale-x-100 
                              transition-transform duration-300 bg-gradient-to-r from-purple-600 to-pink-600"></span>
              </a>
            ))}
            {/* CTA Button */}
            <button className="px-6 py-2 text-white font-medium bg-gradient-to-r from-purple-600 to-pink-600 
                           rounded-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 
                           transition-all duration-300 shadow-lg hover:shadow-xl">
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-gray-100 
                       dark:hover:bg-gray-800 transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu with Animation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 dark:bg-gray-800/80 
                       backdrop-blur-lg rounded-lg mb-4 shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-white hover:bg-gradient-to-r 
                        hover:from-purple-600/10 hover:to-pink-600/10 rounded-lg transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full px-4 py-3 mt-2 text-white font-medium bg-gradient-to-r 
                           from-purple-600 to-pink-600 rounded-lg hover:from-pink-600 
                           hover:to-purple-600 transition-all duration-300">
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
