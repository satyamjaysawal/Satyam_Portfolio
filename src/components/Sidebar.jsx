import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Code,
  Mail,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  Folder,
  Briefcase,
  Book,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("about");

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const navItems = [
    { id: "hero", icon: Home, label: "Home", href: "#hero" },
    { id: "about", icon: User, label: "About", href: "#about" },
    { id: "skills", icon: Code, label: "Skills", href: "#skills" },
    { id: "projects", icon: Folder, label: "Projects", href: "#projects" },
    { id: "experience", icon: Briefcase, label: "Experience", href: "#experience" },
    { id: "education", icon: Book, label: "Education", href: "#education" },
    { id: "contact", icon: Mail, label: "Contact", href: "#contact" },
  ];

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-20 transition-all duration-500 ease-in-out
                ${isOpen ? "w-56" : "w-16"} 
                backdrop-blur-lg bg-gray-900/70 shadow-lg border-r border-gray-700/50 rounded-r-2xl`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
        className="absolute -right-4 top-6 bg-gray-800 text-gray-400 hover:text-white
                  p-1 rounded-full border border-gray-700 transition-all duration-300
                  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {isOpen ? (
          <ChevronLeft className="w-5 h-5 transition-transform duration-300 ease-in-out transform rotate-180" />
        ) : (
          <ChevronRight className="w-5 h-5 transition-transform duration-300 ease-in-out" />
        )}
      </button>

      {/* Navigation Items */}
      <div className="px-3 py-6">
        <ul className="space-y-4">
          {navItems.map(({ id, icon: Icon, label, href }) => (
            <li key={id} className="relative group">
              <a
                href={href}
                onClick={() => setActiveItem(id)}
                className={`flex items-center group p-2 rounded-xl transition-all duration-300 ease-in-out
                          ${activeItem === id
                            ? "text-white bg-gradient-to-r from-purple-600/30 to-pink-600/30 shadow-lg"
                            : "text-gray-400 hover:text-white hover:bg-gray-700/40"}`
                }
              >
                {/* Icon */}
                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:text-purple-400" />

                {/* Label */}
                <span
                  className={`ml-3 transition-all duration-500 text-sm
                              ${!isOpen ? "opacity-0 w-0 hidden" : "opacity-100 w-auto"}`}
                >
                  {label}
                </span>

                {/* Active Indicator */}
                {activeItem === id && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-lg transition-all duration-300" />
                )}
              </a>

              {/* Tooltip for collapsed mode */}
              {!isOpen && (
                <span
                  className="absolute left-14 top-2 px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md opacity-0 transition-all duration-300 
                            group-hover:opacity-100 group-hover:translate-x-1"
                >
                  {label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div
        className={`absolute bottom-6 left-0 right-0 px-4 transition-opacity duration-300
                    ${isOpen ? "opacity-100" : "opacity-0"}`}
      >
        <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-400">Online Status</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
