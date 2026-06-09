import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Send, Github, MapPin, ExternalLink, MessageCircle } from 'lucide-react';
import SectionShell from './SectionShell';
import SectionHeader from './SectionHeader';

const primaryContacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sjrecm9258@gmail.com',
    href: 'mailto:sjrecm9258@gmail.com',
    accent: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-500/15',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9258505088',
    href: 'tel:+919258505088',
    accent: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-100 dark:bg-purple-500/15',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Mumbai, India',
    href: null,
    accent: 'text-cyan-600 dark:text-cyan-400',
    iconBg: 'bg-cyan-100 dark:bg-cyan-500/15',
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'satyam-jaysawal',
    href: 'https://www.linkedin.com/in/satyam-jaysawal-9b58b7238',
    accent: 'text-sky-600 dark:text-sky-400',
    iconBg: 'bg-sky-100 dark:bg-sky-500/15',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'satyamjaysawal',
    href: 'https://github.com/satyamjaysawal',
    accent: 'text-gray-700 dark:text-gray-300',
    iconBg: 'bg-gray-100 dark:bg-gray-500/15',
  },
  {
    icon: ExternalLink,
    label: 'Portfolio',
    value: 'satyam-portfolio-q196.onrender.com',
    href: 'https://satyam-portfolio-q196.onrender.com/',
    accent: 'text-pink-600 dark:text-pink-400',
    iconBg: 'bg-pink-100 dark:bg-pink-500/15',
  },
];

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <SectionShell id="contact" maxWidth="max-w-4xl">
        <SectionHeader
          label="Contact Me"
          title="Get In Touch"
          description="Open to full-time roles, freelance & AI engineering collaborations"
          descriptionMaxWidth="max-w-sm"
        />

        <div className="grid sm:grid-cols-3 gap-2 mb-2.5">
          {primaryContacts.map((item) => {
            const Wrapper = item.href ? 'a' : 'div';
            const linkProps = item.href
              ? { href: item.href, target: item.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
              : {};

            return (
              <Wrapper
                key={item.label}
                {...linkProps}
                className="group flex items-center gap-2.5 card-surface rounded-lg p-2.5 hover:border-purple-400/40 transition-all"
              >
                <div className={`shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${item.iconBg}`}>
                  <item.icon className={`w-3.5 h-3.5 ${item.accent}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] text-subtle uppercase tracking-wider">{item.label}</p>
                  <p className={`text-[11px] sm:text-xs font-medium truncate ${item.accent} group-hover:underline`}>
                    {item.value}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 card-surface rounded-full px-3 py-1.5 hover:border-purple-400/40 transition-all"
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.iconBg}`}>
                <item.icon className={`w-3 h-3 ${item.accent}`} />
              </div>
              <span className={`text-[11px] font-medium ${item.accent} group-hover:underline`}>
                {item.label}
              </span>
            </a>
          ))}
        </div>

        <div className="card-surface rounded-xl p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700/50">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Send a Message</h3>
              <p className="text-[10px] text-subtle mt-0.5">Share your project, job opportunity, or collaboration idea</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <MessageCircle className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span className="text-[10px] text-subtle">Replies within 24 hrs</span>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                <Send className="text-green-600 dark:text-green-400 w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">Message Sent!</h3>
              <p className="text-subtle text-[11px]">Thank you — I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="name" className="block text-[10px] text-subtle mb-0.5">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="input-surface w-full px-2.5 py-1.5 rounded-md text-xs"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] text-subtle mb-0.5">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="input-surface w-full px-2.5 py-1.5 rounded-md text-xs"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] text-subtle mb-0.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  rows="3"
                  className="input-surface w-full px-2.5 py-1.5 rounded-md text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-medium rounded-md hover:opacity-90 transition-all disabled:opacity-60"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
    </SectionShell>
  );
};

export default Contact;