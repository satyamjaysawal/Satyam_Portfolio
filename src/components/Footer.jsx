import React from "react";
import { Linkedin, Github, Mail, ChevronRight, Heart, MapPin, ExternalLink } from "lucide-react";
import { getExperienceText } from "../utils/experience";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/satyam-jaysawal-9b58b7238", icon: Linkedin, hoverColor: "hover:bg-blue-600" },
    { name: "GitHub", url: "https://github.com/satyamjaysawal", icon: Github, hoverColor: "hover:bg-purple-600" },
    { name: "Email", url: "mailto:sjrecm9258@gmail.com", icon: Mail, hoverColor: "hover:bg-green-600" },
    { name: "Portfolio", url: "https://satyam-portfolio-q196.onrender.com/", icon: ExternalLink, hoverColor: "hover:bg-pink-600" },
  ];

  const quickLinks = [
    { name: "About", url: "#about" },
    { name: "Skills", url: "#skills" },
    { name: "Certifications", url: "#certifications" },
    { name: "Projects", url: "#projects" },
    { name: "Experience", url: "#experience" },
    { name: "Education", url: "#education" },
    { name: "Contact", url: "#contact" },
  ];

  return (
    <footer className="relative section-bg overflow-hidden border-t border-gray-200 dark:border-gray-800/50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-10">
          <div className="space-y-5">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Satyam Jaysawal
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              Full Stack Python Developer &amp; AI Engineer specializing in GenAI, RAG, Agentic AI, and cloud-native applications. {getExperienceText()} of enterprise experience.
            </p>
            <div className="flex items-center gap-2 text-subtle text-sm">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Mumbai, India
            </div>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-lg text-subtle hover:text-gray-900 dark:hover:text-white card-surface ${social.hoverColor} transition-all duration-300 hover:scale-110`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <a key={link.name} href={link.url} className="flex items-center text-subtle hover:text-purple-600 dark:hover:text-purple-300 text-sm transition-colors group">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 opacity-0 group-hover:opacity-100 transition-all" />
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Contact</h4>
            <div className="space-y-3 text-sm">
              <a href="mailto:sjrecm9258@gmail.com" className="flex items-center text-subtle hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Mail className="w-4 h-4 mr-2 text-purple-400" /> sjrecm9258@gmail.com
              </a>
              <a href="tel:+919258505088" className="flex items-center text-subtle hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <span className="w-4 h-4 mr-2 text-center text-purple-400 font-bold text-xs">📞</span> +91 9258505088
              </a>
              <p className="text-subtle pt-2">Available for full-time roles, AI projects, and collaborations.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500 flex items-center">
            © {currentYear} Satyam Jaysawal. Made with
            <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" />
            All rights reserved.
          </p>
          <p className="text-xs text-gray-600">Full Stack Python Developer &amp; AI Engineer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;