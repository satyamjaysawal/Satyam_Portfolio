import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Send, Sparkles } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 3000);
    }, 1500);
  };
  
  return (
    <section id="contact" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Animated Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-400 font-medium tracking-wider text-sm flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              CONTACT ME
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            I'm always open to new opportunities and collaborations. Feel free to reach out to me via the contact details below or send me a message!
          </p>
        </div>

        {/* Enhanced Contact Cards */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex flex-col items-center bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all duration-300 border border-gray-700 group w-64">
            <div className="p-3 bg-blue-500/10 rounded-full mb-4 group-hover:bg-blue-500/20 transition-all duration-300">
              <Mail className="text-blue-400 text-3xl group-hover:text-blue-300 transition-colors" />
            </div>
            <span className="font-semibold text-white mb-2">Email</span>
            <a href="mailto:sjrecm9258@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors group-hover:underline">
              sjrecm9258@gmail.com
            </a>
          </div>
          
          <div className="flex flex-col items-center bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all duration-300 border border-gray-700 group w-64">
            <div className="p-3 bg-purple-500/10 rounded-full mb-4 group-hover:bg-purple-500/20 transition-all duration-300">
              <Phone className="text-purple-400 text-3xl group-hover:text-purple-300 transition-colors" />
            </div>
            <span className="font-semibold text-white mb-2">Phone</span>
            <a href="tel:+919258505088" className="text-purple-400 hover:text-purple-300 transition-colors group-hover:underline">
              +91 92585 05088
            </a>
          </div>
          
          <div className="flex flex-col items-center bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all duration-300 border border-gray-700 group w-64">
            <div className="p-3 bg-pink-500/10 rounded-full mb-4 group-hover:bg-pink-500/20 transition-all duration-300">
              <Linkedin className="text-pink-400 text-3xl group-hover:text-pink-300 transition-colors" />
            </div>
            <span className="font-semibold text-white mb-2">LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/satyam-jaysawal-9b58b7238"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 transition-colors group-hover:underline"
            >
              linkedin.com/in/satyam-jaysawal
            </a>
          </div>
        </div>

        {/* Enhanced Contact Form */}
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <Send className="text-green-400 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-center">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
                  <input 
                    id="name"
                    name="name"
                    type="text" 
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    required
                    className="w-full p-4 border border-gray-700 rounded-lg bg-gray-900/80 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Your Email</label>
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    required
                    className="w-full p-4 border border-gray-700 rounded-lg bg-gray-900/80 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Your Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Hello, I'd like to discuss a project..." 
                    required
                    className="w-full p-4 border border-gray-700 rounded-lg bg-gray-900/80 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                    rows="5"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 font-medium"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    <span className="flex items-center">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;