import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Add section detection for active link highlight
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'hero';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      
      setActiveLink(currentSection);
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
          {/* Enhanced Logo with Clicker Script font and Pulse Animation */}
          <div className="relative group">
            <a href="#hero" className="flex items-center space-x-2">
              <div className="relative px-4 py-2 overflow-hidden">
                {/* Animated background pulse effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                              animate-pulse"></div>
                
                {/* Top-left corner with rotation animation */}
                <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-purple-600 
                              group-hover:border-pink-600 transition-colors duration-300
                              group-hover:animate-spin-slow"></div>
                              
                {/* Bottom-right corner with rotation animation */}
                <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-pink-600 
                              group-hover:border-purple-600 transition-colors duration-300
                              group-hover:animate-spin-slow"></div>
                
                <span 
                  className="text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent
                            hover:from-pink-600 hover:to-purple-600 transition-all duration-300
                            group-hover:animate-bounce-subtle"
                  style={{ fontFamily: "'Clicker Script', cursive" }}
                >
                  Port
                </span>
                <span 
                  className="text-3xl text-white group-hover:animate-bounce-subtle"
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

          {/* Desktop Navigation with Staggered Animation on Page Load */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => {
              const isActive = link.href.substring(1) === activeLink;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-white font-medium group animate-fade-in-right`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className={`relative z-10 ${isActive ? 'text-pink-300' : ''}`}>{link.name}</span>
                  
                  {/* Hover effect */}
                  <div className={`absolute inset-0 h-full w-full transform ${
                    isActive ? 'scale-100 bg-gradient-to-r from-purple-600/20 to-pink-600/20' : 'scale-0'
                  } group-hover:scale-100 transition-transform duration-300 ease-out rounded-lg bg-gradient-to-r 
                              from-purple-600/10 to-pink-600/10`}></div>
                  
                  {/* Underline effect with animation */}
                  <span className={`absolute bottom-0 left-0 h-0.5 w-full transform ${
                    isActive ? 'scale-x-100 bg-pink-500' : 'scale-x-0'
                  } group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r 
                              from-purple-600 to-pink-600`}></span>
                </a>
              );
            })}
            
            {/* CTA Button with Pulse Animation */}
            <button className="px-6 py-2 text-white font-medium bg-gradient-to-r from-purple-600 to-pink-600 
                           rounded-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 
                           transition-all duration-300 shadow-lg hover:shadow-xl relative
                           animate-fade-in-right"
                    style={{ animationDelay: `${navLinks.length * 100}ms` }}>
              <span>Hire Me</span>
              
              {/* Pulsing background for extra attention */}
              <span className="absolute inset-0 rounded-lg bg-white opacity-0 animate-ping-slow"></span>
            </button>
          </div>

          {/* Animated Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-gray-100 
                       dark:hover:bg-gray-800 transition-colors duration-300
                       relative overflow-hidden group"
            >
              {/* Ripple effect on click */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 
                            transform scale-0 group-hover:scale-100 transition-transform 
                            duration-500 rounded-full origin-center"></span>
              
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 relative z-10 animate-rotate-in" />
              ) : (
                <Menu className="w-6 h-6 relative z-10 animate-rotate-in" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu with Animation */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 dark:bg-gray-800/80 
                       backdrop-blur-lg rounded-lg mb-4 shadow-xl">
            {navLinks.map((link, index) => {
              const isActive = link.href.substring(1) === activeLink;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-white hover:bg-gradient-to-r 
                          hover:from-purple-600/10 hover:to-pink-600/10 rounded-lg transition-all duration-300
                          ${isActive ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20' : ''}
                          transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
                          transition-all duration-300 ease-out`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {link.name}
                  {isActive && (
                    <span className="inline-block w-2 h-2 ml-2 rounded-full bg-pink-500 animate-pulse"></span>
                  )}
                </a>
              );
            })}
            <button className="w-full px-4 py-3 mt-2 text-white font-medium bg-gradient-to-r 
                           from-purple-600 to-pink-600 rounded-lg hover:from-pink-600 
                           hover:to-purple-600 transition-all duration-300
                           transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                           transition-all duration-500 ease-out"
                    style={{ transitionDelay: `${navLinks.length * 50}ms` }}>
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Add these custom animations to your Tailwind config
// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'spin-slow': 'spin 3s linear infinite',
//         'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
//         'bounce-subtle': 'bounce 1s ease-in-out',
//         'fade-in-right': 'fadeInRight 0.5s ease-out forwards',
//         'rotate-in': 'rotateIn 0.3s ease-out forwards',
//       },
//       keyframes: {
//         fadeInRight: {
//           '0%': {
//             opacity: '0',
//             transform: 'translateX(10px)'
//           },
//           '100%': {
//             opacity: '1',
//             transform: 'translateX(0)'
//           }
//         },
//         rotateIn: {
//           '0%': {
//             transform: 'rotate(-90deg)',
//             opacity: '0'
//           },
//           '100%': {
//             transform: 'rotate(0)',
//             opacity: '1'
//           }
//         }
//       }
//     }
//   }
// }

export default Navbar;