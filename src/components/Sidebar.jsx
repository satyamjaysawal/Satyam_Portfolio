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
  Award,
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
    { id: "certifications", icon: Award, label: "Certs", href: "#certifications" },
    { id: "projects", icon: Folder, label: "Projects", href: "#projects" },
    { id: "experience", icon: Briefcase, label: "Experience", href: "#experience" },
    { id: "education", icon: Book, label: "Education", href: "#education" },
    { id: "contact", icon: Mail, label: "Contact", href: "#contact" },
  ];

  return (
    <div
      className={`fixed top-11 sm:top-12 left-0 h-[calc(100vh-2.75rem)] sm:h-[calc(100vh-3rem)] z-20 transition-all duration-500 ease-in-out
                ${isOpen ? "w-56" : "w-16"} 
                backdrop-blur-lg bg-white/85 dark:bg-gray-900/70 shadow-lg border-r border-gray-200/80 dark:border-gray-700/50 rounded-r-2xl`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
        className="absolute -right-4 top-5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
                  p-1 rounded-full border border-gray-300 dark:border-gray-700 transition-all duration-300
                  hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                            ? "text-purple-700 dark:text-white bg-purple-500/15 dark:bg-gradient-to-r dark:from-purple-600/30 dark:to-pink-600/30 shadow-lg"
                            : "text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/40"}`
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
                  className="absolute left-14 top-2 px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md opacity-0 transition-all duration-300
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
        <div className="p-3 rounded-lg card-surface">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-subtle">Online Status</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
