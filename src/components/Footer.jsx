import React from 'react';
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ShoppingCart, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  ArrowRight
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" }
  ];

  const quickLinks = [
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms & Conditions" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900/70 to-gray-900/90 backdrop-blur-md text-white border-t border-white/10">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl" />
      </div>

      <div className="relative container mx-auto px-6 py-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6">
          {/* Logo */}
          <Link to="/" className="text-xl font-extrabold flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg blur group-hover:blur-md transition-all" />
              <div className="relative bg-gray-900 p-2 rounded-lg">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              E-Commerce
            </span>
          </Link>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <social.icon className="w-4 h-4 hover:text-cyan-300 transition-all transform group-hover:scale-110" />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 border-t border-white/10">
          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-md font-semibold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              About Us
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premier destination for exceptional shopping experiences with carefully curated products.
            </p>
            <Link to="/about" className="inline-flex items-center space-x-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors group">
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-3">
            <h3 className="text-md font-semibold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <nav className="grid grid-cols-2 gap-1 text-sm">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center space-x-1 group w-fit"
                >
                  <span>{link.label}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div className="space-y-3">
            <h3 className="text-md font-semibold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>support@ecommerce.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>123 Commerce St, Business City, 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 mt-4 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} E-Commerce Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
