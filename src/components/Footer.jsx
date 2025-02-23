import React from "react";
import { Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://in.linkedin.com/in/satyam-jaysawal-9b58b7238",
      icon: <Linkedin className="w-6 h-6" />,
    },
    {
      name: "Twitter",
      url: "#",
      icon: <Twitter className="w-6 h-6" />,
    },
    {
      name: "GitHub",
      url: "https://github.com/satyamjaysawal",
      icon: <Github className="w-6 h-6" />,
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Creating amazing experiences through innovative design and technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="space-y-3">
              {['About', 'Projects', 'Blog', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-right space-y-4">
            <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
            <p className="text-gray-400 text-sm">
              sjrecm9258@gmail.com
            </p>
            {/* Social Links */}
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110 text-gray-400 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Your Brand. All rights reserved.
            </p>
            <div className="space-x-4">
              <a href="#privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
