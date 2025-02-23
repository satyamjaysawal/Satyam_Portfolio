import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-400 font-medium tracking-wider text-sm">CONTACT ME</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            I’m always open to new opportunities and collaborations. Feel free to reach out to me via the contact details below or send me a message!
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-wrap justify-center gap-12 mb-8">
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <Mail className="text-blue-400 text-4xl mb-4 hover:text-blue-500 transition-colors" />
            <span className="font-semibold text-white">Email</span>
            <a href="mailto:sjrecm9258@gmail.com" className="text-blue-400 hover:text-blue-500">
              sjrecm9258@gmail.com
            </a>
          </div>
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <Phone className="text-blue-400 text-4xl mb-4 hover:text-blue-500 transition-colors" />
            <span className="font-semibold text-white">Phone</span>
            <a href="tel:+919258505088" className="text-blue-400 hover:text-blue-500">
              +91 92585 05088
            </a>
          </div>
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <Linkedin className="text-blue-400 text-4xl mb-4 hover:text-blue-500 transition-colors" />
            <span className="font-semibold text-white">LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/satyam-jaysawal-9b58b7238"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500"
            >
              linkedin.com/in/satyam-jaysawal
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="w-full max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-4 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          <div className="mb-6">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full p-4 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          <div className="mb-8">
            <textarea 
              placeholder="Your Message" 
              className="w-full p-4 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
              rows="6"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
