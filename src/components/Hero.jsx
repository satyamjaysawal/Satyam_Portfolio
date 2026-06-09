import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Code,
  Sparkles,
  MapPin,
  ExternalLink,
  Brain,
  Phone,
  Briefcase,
  Trophy,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import { getExperienceText } from "../utils/experience";

const roles = [
  { text: "Full Stack Python Developer", icon: Code },
  { text: "AI & GenAI Engineer", icon: Brain },
  { text: "LLM / RAG Specialist", icon: Sparkles },
];

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const socialLinks = [
  { href: "https://github.com/satyamjaysawal", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/satyam-jaysawal-9b58b7238", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:sjrecm9258@gmail.com", icon: Mail, label: "Email" },
];

const codingPlatforms = [
  { name: "LeetCode", accent: "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-500/10 border-yellow-300 dark:border-yellow-500/25" },
  { name: "HackerRank", accent: "text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/25" },
  { name: "Codeforces", accent: "text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/25" },
];

const contactPills = [
  { icon: MapPin, text: "Mumbai, India", href: null, color: "text-cyan-400" },
  { icon: Mail, text: "sjrecm9258@gmail.com", href: "mailto:sjrecm9258@gmail.com", color: "text-pink-400" },
  { icon: Phone, text: "+91 9258505088", href: "tel:+919258505088", color: "text-emerald-400" },
  { icon: ExternalLink, text: "Live Portfolio", href: "https://satyam-portfolio-q196.onrender.com/", color: "text-blue-400" },
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const typedRef = useRef(null);
  const typedElementRef = useRef(null);

  useEffect(() => {
    typedRef.current = new Typed(typedElementRef.current, {
      strings: [
        "RAG Pipelines",
        "Agentic AI Systems",
        "Cloud-Native Apps",
        "GenAI Solutions",
      ],
      typeSpeed: 55,
      backSpeed: 35,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);

    return () => {
      clearInterval(interval);
      typedRef.current?.destroy();
    };
  }, []);

  const scrollToNextSection = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const CurrentRoleIcon = roles[roleIndex].icon;

  return (
    <section
      id="hero"
      className="section-surface section-bg relative min-h-screen flex items-center overflow-hidden pt-14 sm:pt-16 pb-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-[size:16px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_75%,transparent_100%)]" />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        {/* Left — Text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center gap-3 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-[11px] sm:text-xs tracking-[0.2em] text-subtle uppercase">Welcome to my world</span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-purple-400" />
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-gray-900 dark:text-gray-100 leading-[1.15] mb-4"
          >
            Hello, I&apos;m{" "}
            <span
              className="block sm:inline text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text mt-1 sm:mt-0"
              style={{ fontFamily: "'Clicker Script', cursive" }}
            >
              Satyam Jaysawal
            </span>
          </motion.h1>

          <motion.div variants={fadeIn} className="space-y-3 mb-6 w-full">
            <div
              key={roleIndex}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium min-h-[2.5rem]"
            >
              <span>I&apos;m a</span>
              <span className="inline-flex items-center gap-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                <CurrentRoleIcon className="w-5 h-5 text-purple-400 shrink-0" />
                {roles[roleIndex].text}
              </span>
            </div>

            <p className="text-base sm:text-lg text-subtle">
              Expert in{" "}
              <span
                ref={typedElementRef}
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold"
              />
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="w-full max-w-xl lg:max-w-none mb-4">
            <p className="text-sm sm:text-base text-muted leading-relaxed card-surface rounded-xl px-4 py-4">
              Full Stack Python Developer &amp; AI Engineer with{" "}
              <span className="text-purple-300 font-semibold">{getExperienceText()}</span> of experience
              building scalable web apps, Generative AI solutions, RAG pipelines, and multi-agent LLM systems on AWS &amp; Azure.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="w-full max-w-xl lg:max-w-none mb-6">
            <div className="card-surface rounded-xl px-4 py-3.5 border-l-[3px] border-l-amber-500/70">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                  <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                  1000+ DSA &amp; Algo Problems Solved
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-muted">
                  <Layers className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  System Design (LLD &amp; HLD)
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-subtle mb-2.5">
                Competitive programming practice on LeetCode, HackerRank &amp; Codeforces — algorithms, data structures &amp; scalable architecture.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {codingPlatforms.map((platform) => (
                  <span
                    key={platform.name}
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold border ${platform.accent}`}
                  >
                    {platform.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8 w-full"
          >
            {contactPills.map((item, i) => {
              const Tag = item.href ? "a" : "span";
              const linkProps = item.href
                ? { href: item.href, target: item.href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" }
                : {};
              return (
                <Tag
                  key={i}
                  {...linkProps}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full card-surface text-[11px] sm:text-xs text-muted hover:border-purple-500/40 transition-colors"
                >
                  <item.icon className={`w-3.5 h-3.5 shrink-0 ${item.color}`} />
                  <span className="truncate max-w-[180px] sm:max-w-none">{item.text}</span>
                </Tag>
              );
            })}
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 mb-8 w-full"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white text-sm font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all"
            >
              View My Work
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full border border-purple-500/40 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-purple-500/10 transition-all"
            >
              <Briefcase className="w-4 h-4" />
              Hire Me
            </a>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="flex items-center justify-center lg:justify-start gap-4"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-2.5 rounded-full card-surface hover:border-purple-500/50 hover:bg-purple-500/10 transition-all group"
              >
                <link.icon className="w-5 h-5 text-subtle group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — Photos */}
        <motion.div
          variants={fadeIn}
          className="flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <div className="relative flex items-end justify-center gap-3 sm:gap-4">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
              <div className="relative p-1 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl shadow-xl -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src="/profile/satyam-profile.jpg"
                  alt="Satyam Jaysawal"
                  className="w-32 h-40 sm:w-40 sm:h-52 md:w-44 md:h-56 object-cover object-top rounded-[0.85rem]"
                />
              </div>
            </div>

            <div className="relative group mb-4 sm:mb-6">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
              <div className="relative p-1 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 rounded-2xl shadow-xl rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src="/profile/satyam-profile-2.jpg"
                  alt="Satyam Jaysawal at work"
                  className="w-32 h-40 sm:w-40 sm:h-52 md:w-44 md:h-56 object-cover object-top rounded-[0.85rem]"
                />
              </div>
            </div>

            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1.5 card-surface border-purple-500/30 rounded-full text-xs text-purple-600 dark:text-purple-300 font-medium whitespace-nowrap">
              Available for Work
            </span>
          </div>
        </motion.div>
      </motion.div>

      <button
        type="button"
        onClick={scrollToNextSection}
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 p-3 rounded-full card-surface hover:border-purple-500/50 hover:bg-purple-500/10 text-subtle hover:text-purple-600 dark:hover:text-white transition-all animate-bounce"
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
};

export default Hero;