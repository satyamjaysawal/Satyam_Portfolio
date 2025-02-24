import React from "react";
import { Linkedin, Twitter, Github, Mail, ChevronRight, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://in.linkedin.com/in/satyam-jaysawal-9b58b7238",
      icon: <Linkedin className="w-5 h-5" />,
      hoverColor: "hover:bg-blue-600",
    },
    {
      name: "Twitter",
      url: "#",
      icon: <Twitter className="w-5 h-5" />,
      hoverColor: "hover:bg-sky-500",
    },
    {
      name: "GitHub",
      url: "https://github.com/satyamjaysawal",
      icon: <Github className="w-5 h-5" />,
      hoverColor: "hover:bg-purple-600",
    },
    {
      name: "Email",
      url: "mailto:sjrecm9258@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      hoverColor: "hover:bg-green-600",
    },
  ];

  const quickLinks = [
    { name: "About", url: "#about" },
    { name: "Projects", url: "#projects" },
    { name: "Skills", url: "#skills" },
    { name: "Experience", url: "#experience" },
    { name: "Contact", url: "#contact" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Footer wave separator */}
      <div className="relative">
        <svg className="absolute -top-20 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0L48 8.33333C96 16.6667 192 33.3333 288 41.6667C384 50 480 50 576 41.6667C672 33.3333 768 16.6667 864 16.6667C960 16.6667 1056 33.3333 1152 41.6667C1248 50 1344 50 1392 50L1440 50V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V0Z" fill="url(#paint0_linear)" />
          <defs>
            <linearGradient id="paint0_linear" x1="720" y1="0" x2="720" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#111827" stopOpacity="0" />
              <stop offset="1" stopColor="#111827" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Top Section */}
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-flex items-center">
                Portfolio
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Creating amazing experiences through innovative design and technology solutions. Let's build something incredible together.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className={`p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110 text-gray-400 hover:text-white bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 ${social.hoverColor}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-8">
            <h4 className="text-xl font-semibold text-white mb-6 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="lg:ml-8">
            <h4 className="text-xl font-semibold text-white mb-6 relative">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <p className="text-gray-400 mb-4">Stay updated with the latest projects and news.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-l-lg focus:outline-none focus:border-purple-500 text-white w-full text-sm"
              />
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:ml-8">
            <h4 className="text-xl font-semibold text-white mb-6 relative">
              Contact
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <div className="space-y-4">
              <p className="text-gray-400 flex items-start">
                <Mail className="w-5 h-5 mr-3 text-purple-400 mt-1 flex-shrink-0" />
                <span>sjrecm9258@gmail.com</span>
              </p>
              <p className="text-gray-400">
                Available for freelance opportunities and collaborations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 flex items-center">
              © {currentYear} Satyam Jaysawal. Made with 
              <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" />
              All rights reserved.
            </p>
            <div className="space-x-6">
              <a href="#privacy" className="text-gray-400 hover:text-white text-sm relative group">
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white text-sm relative group">
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;