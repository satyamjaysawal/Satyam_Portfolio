import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certs', href: '#certifications' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);

      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'hero';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 80;
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

  const navShell = isDark
    ? isScrolled
      ? 'bg-[#0a0f1c]/98 border-violet-500/30 shadow-md shadow-black/40'
      : 'bg-[#0a0f1c]/92 border-violet-500/20'
    : isScrolled
      ? 'bg-white/98 border-purple-200 shadow-md shadow-purple-100/60'
      : 'bg-gradient-to-r from-white via-purple-50/80 to-white border-purple-100';

  const logoClass = isDark
    ? 'text-white'
    : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600';

  const navLinkBase = isDark
    ? 'text-slate-300 hover:text-white hover:bg-white/10'
    : 'text-gray-600 hover:text-purple-800 hover:bg-purple-50';

  const navLinkActive = isDark
    ? 'text-white bg-violet-500/25 border border-violet-400/30'
    : 'text-purple-800 bg-purple-100 border border-purple-200';

  const themeBtnClass = isDark
    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
    : 'bg-white border-gray-300 text-gray-700 hover:bg-purple-50 hover:border-purple-300';

  const menuBtnClass = isDark
    ? 'text-white hover:bg-white/10'
    : 'text-gray-700 hover:bg-purple-50';

  const mobileMenuBg = isDark
    ? 'bg-[#0a0f1c] border-violet-500/25'
    : 'bg-white border-purple-100';

  const mobileLinkBase = isDark
    ? 'text-slate-300 hover:bg-white/10 hover:text-white'
    : 'text-gray-600 hover:bg-purple-50 hover:text-purple-800';

  const mobileLinkActive = isDark
    ? 'bg-violet-500/25 text-white font-medium'
    : 'bg-purple-100 text-purple-800 font-medium';

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className={`h-11 sm:h-12 border-b backdrop-blur-xl transition-all duration-300 ${navShell}`}>
        <div className="h-full w-full max-w-[100vw] px-3 sm:px-5 md:px-6 lg:px-8">
          <div className="grid h-full grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4">
            {/* Logo — left */}
            <a href="#hero" className="flex items-center shrink-0 min-w-0">
              <span
                className={`text-base sm:text-lg md:text-xl font-bold leading-none truncate ${logoClass}`}
                style={{ fontFamily: "'Clicker Script', cursive" }}
              >
                Portfolio
              </span>
            </a>

            {/* Nav — center (desktop) */}
            <div className="hidden lg:flex items-center justify-center min-w-0 px-2">
              <div className="flex items-center justify-center flex-wrap gap-0.5 max-w-full">
                {navLinks.map((link) => {
                  const isActive = link.href.substring(1) === activeLink;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`px-2 xl:px-2.5 py-1 text-[10px] xl:text-[11px] font-medium rounded-md transition-all whitespace-nowrap ${
                        isActive ? navLinkActive : navLinkBase
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Actions — right */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border transition-colors ${themeBtnClass}`}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-purple-700" />
                )}
              </button>

              <a
                href="#contact"
                className="hidden sm:inline-flex items-center justify-center h-8 sm:h-9 px-3 sm:px-4 text-[11px] sm:text-xs font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all shadow-sm whitespace-nowrap"
              >
                Hire Me
              </a>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg transition-colors ${menuBtnClass}`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile / tablet menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 border-b ${mobileMenuBg} ${
          isMobileMenuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-3 sm:px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {navLinks.map((link) => {
            const isActive = link.href.substring(1) === activeLink;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-2 py-2 text-xs rounded-lg text-center transition-colors ${
                  isActive ? mobileLinkActive : mobileLinkBase
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="col-span-2 sm:col-span-4 text-center px-3 py-2.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;