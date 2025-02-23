import React, { useState, useEffect } from 'react';
import { Home, User, Code, Mail, ChevronLeft, ChevronRight, Settings, HelpCircle, Folder, Briefcase, Book } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [activeItem, setActiveItem] = useState('about');

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false); 
      }, 3000); 
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  const navItems = [
    { id: 'hero', icon: Home, label: 'Home', href: '#hero' },
    { id: 'about', icon: User, label: 'About', href: '#about' },
    { id: 'skills', icon: Code, label: 'Skills', href: '#skills' },
    { id: 'projects', icon: Folder, label: 'Projects', href: '#projects' },
    { id: 'experience', icon: Briefcase, label: 'Experience', href: '#experience' },
    { id: 'education', icon: Book, label: 'Education', href: '#education' },
    { id: 'contact', icon: Mail, label: 'Contact', href: '#contact' },
  ];

  const bottomItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' }
  ];

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-20 transition-all duration-300 ease-in-out
                ${isOpen ? 'w-48' : 'w-16'} 
                bg-gradient-to-b from-gray-900 to-gray-800
                border-r border-gray-700/50`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
        className="absolute -right-3 top-6 bg-gray-800 text-gray-400 hover:text-white
                  p-1 rounded-full border border-gray-700 transition-all duration-300
                  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {isOpen ? (
          <ChevronLeft
            className="w-4 h-4 transition-transform duration-300 ease-in-out transform rotate-180"
          />
        ) : (
          <ChevronRight
            className="w-4 h-4 transition-transform duration-300 ease-in-out"
          />
        )}
      </button>

      {/* Navigation Items */}
      <div className="px-2 py-6">
        <ul className="space-y-3">
          {navItems.map(({ id, icon: Icon, label, href }) => (
            <li key={id}>
              <a
                href={href}
                onClick={() => setActiveItem(id)}
                className={`flex items-center group relative p-2 rounded-lg
                          transition-all duration-300 ease-in-out
                          ${activeItem === id
                            ? 'text-white bg-gradient-to-r from-purple-600/20 to-pink-600/20'
                            : 'text-gray-400 hover:text-white'}`}
              >
                {/* Icon */}
                <Icon
                  className={`w-4 h-4 transition-transform duration-300
                              ${activeItem === id ? 'text-purple-400' : 'group-hover:text-purple-400'}`}
                />

                {/* Label */}
                <span
                  className={`ml-2 transition-all duration-500
                              ${!isOpen ? 'opacity-0 w-0' : 'opacity-100 w-auto text-sm'}`}
                >
                  {label}
                </span>

                {/* Active Indicator */}
                {activeItem === id && (
                  <span
                    className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-600 to-pink-600 
                                rounded-r-lg transition-all duration-300"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div
        className={`absolute bottom-6 left-0 right-0 px-4 transition-opacity duration-300
                    ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-400">Online Status</span>
          </div>
        </div>

        {/* Additional Bottom Buttons */}
        <div className="mt-5 space-y-3">
          {bottomItems.map(({ id, icon: Icon, label }) => (
            <a
              key={id}
              href="#"
              className="flex items-center text-gray-400 hover:text-white p-2 rounded-lg transition-all duration-300 ease-in-out"
            >
              <Icon className="w-4 h-4" />
              <span className="ml-2 text-sm">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
