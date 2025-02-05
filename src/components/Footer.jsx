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
  ArrowRight,
  CreditCard
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

  const paymentMethods = [
    { icon: 'visa', color: 'text-blue-500', name: 'Visa' },
    { icon: 'mastercard', color: 'text-red-500', name: 'MasterCard' },
    { icon: 'paypal', color: 'text-blue-400', name: 'PayPal' },
    { icon: 'amex', color: 'text-green-500', name: 'Amex' },
    { icon: 'stripe', color: 'text-purple-500', name: 'Stripe' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900/80 to-gray-900/95 backdrop-blur-md text-white">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl" />
      </div>

      <div className="relative container mx-auto px-6 py-12">
        {/* Top Section with Logo and Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg blur group-hover:blur-md transition-all" />
              <div className="relative bg-gray-900 p-2 rounded-lg">
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform text-cyan-300" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              E-Commerce
            </span>
          </Link>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 text-gray-400 hover:text-cyan-300 transition-all transform group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-white/10">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              About Us
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premier destination for exceptional shopping experiences with meticulously curated products and unparalleled customer service.
            </p>
            <Link 
              to="/about" 
              className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <span>Discover Our Story</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Quick Navigation
            </h3>
            <nav className="grid grid-cols-2 gap-2 text-sm">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center space-x-2 group"
                >
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Get in Touch
            </h3>
            <div className="space-y-3">
              {[
                { icon: Mail, text: "support@ecommerce.com" },
                { icon: Phone, text: "(555) 123-4567" },
                { icon: MapPin, text: "123 Commerce St, Business City, 12345" }
              ].map(({ icon: Icon, text }, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-400 group">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment & Legal Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Payment Methods */}
            <div className="flex flex-wrap items-center gap-4 mb-6 md:mb-0">
              <h4 className="text-base font-bold text-white mr-4">We Accept:</h4>
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CreditCard className={`w-6 h-6 ${method.color}`} />
                  <span className={`${method.color} font-semibold text-sm`}>
                    {method.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-bold text-white mb-2">Follow Us:</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright and Additional Links */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {currentYear} E-Commerce Inc. All Rights Reserved.</p>
            <nav className="flex space-x-4 mt-4 md:mt-0">
              {["Accessibility", "Sitemap", "Affiliate Program"].map((link, index) => (
                <a key={index} href="#" className="hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;