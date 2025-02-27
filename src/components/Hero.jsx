import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Github, Linkedin, Twitter, Mail, ArrowRight, Star, CheckCircle, XCircle, Code, Sparkles, Database } from "lucide-react";
import { motion } from "framer-motion"; // Adding Framer Motion
import Typed from "typed.js";

const roles = [
  { text: "Full Stack Developer", icon: <Code className="w-5 h-5" /> },
  { text: "AI Chatbot Developer", icon: <Sparkles className="w-5 h-5" /> },
  { text: "Data Scientist", icon: <Database className="w-5 h-5" /> },
];

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });
  const fileInputRef = useRef(null);
  const typedRef = useRef(null);
  const typedElementRef = useRef(null);

  useEffect(() => {
    typedRef.current = new Typed(typedElementRef.current, {
      strings: ["Web Designer", "Web Developer", "Graphic Designer", "YouTuber"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
      showCursor: true,
      cursorChar: "_",
      autoInsertCss: true,
    });

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setFade(true);
      }, 600);
    }, 3500);

    return () => {
      clearInterval(interval);
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3000);
  };

  const handleDownloadCV = () => {
    try {
      const cvUrl = '/path-to-your-cv.pdf';
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = 'Satyam_Jaysawal_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showNotification("CV download started successfully!");
    } catch (error) {
      showNotification("Error downloading CV. Please try again.", "error");
    }
  };

  const handleUpdateCV = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      showNotification("Please upload a PDF file", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification("File size should be less than 5MB", "error");
      return;
    }

    try {
      // Simulate upload
      showNotification("CV updated successfully!");
    } catch (error) {
      showNotification("Error updating CV. Please try again.", "error");
    }
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about') || document.querySelector('section:nth-child(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 overflow-hidden flex items-center justify-center px-6 py-20"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-600/15 to-cyan-600/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Notification */}
      {notification.show && (
        <motion.div
          className="fixed top-6 right-6 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div
            className={`flex items-center gap-3 px-6 py-3 rounded-xl backdrop-blur-lg shadow-lg ${
              notification.type === "success"
                ? "bg-green-500/20 border border-green-500/30 text-green-300"
                : "bg-red-500/20 border border-red-500/30 text-red-300"
            }`}
          >
            {notification.type === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        </motion.div>
      )}

      <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileUpload} />

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        {/* Welcome Banner */}
        <motion.div
          className="bg-gradient-to-r from-purple-500/10 via-pink-500/15 to-purple-500/10 backdrop-blur-md rounded-full px-8 py-3 mb-10 border border-white/10 shadow-lg"
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
        >
          <div className="inline-flex items-center justify-center space-x-4">
            <motion.div
              className="h-[1px] w-10 bg-gradient-to-r from-transparent to-purple-400"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 1 }}
            />
            <p className="text-gray-200 font-light tracking-widest text-sm">WELCOME TO MY WORLD</p>
            <motion.div
              className="h-[1px] w-10 bg-gradient-to-l from-transparent to-purple-400"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>

        {/* Name & Roles */}
        <motion.div className="space-y-8 mb-10" variants={fadeIn}>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-100 leading-tight">
            Hello, I'm{" "}
            <motion.span
              className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text relative inline-block"
              style={{ fontFamily: "'Clicker Script', cursive" }}
              whileHover={{ scale: 1.05 }}
            >
              Satyam Jaysawal
            </motion.span>
          </h1>

          <div className="space-y-4">
            <motion.h2
              className={`text-2xl md:text-4xl font-medium text-gray-200 flex items-center justify-center gap-3 transition-opacity duration-600 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
              key={roleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              I'm a{" "}
              <span className="font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text flex items-center">
                {roles[roleIndex].icon}
                <span className="ml-2">{roles[roleIndex].text}</span>
              </span>
            </motion.h2>

            <h3 className="text-2xl md:text-3xl font-semibold text-gray-200 flex items-center justify-center gap-2">
              An{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text inline-block">
                <span ref={typedElementRef}></span>
              </span>{" "}
              Professional
            </h3>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div className="relative" variants={fadeIn}>
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 rounded-xl blur-md"></div>
          <p className="relative bg-gray-900/60 backdrop-blur-lg text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-8 py-6 rounded-xl border border-purple-500/20 font-light shadow-lg">
            Passionate about crafting exceptional digital experiences through clean code and intuitive design. Transforming ideas into powerful, scalable solutions.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12" variants={fadeIn}>
          <motion.button
            onClick={handleDownloadCV}
            className="group px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            onClick={handleUpdateCV}
            className="group px-10 py-4 border border-purple-500/40 rounded-full text-gray-200 hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-2 backdrop-blur-lg hover:border-purple-500/60"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Update CV
            <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div className="flex justify-center space-x-10 mt-12" variants={staggerChildren}>
          {[
            { href: "https://github.com/satyamjaysawal", icon: Github },
            { href: "https://www.linkedin.com/in/satyam-jaysawal-9b58b7238", icon: Linkedin },
            { href: "#", icon: Twitter },
            { href: "mailto:sjrecm9258@gmail.com", icon: Mail },
          ].map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group transform transition duration-300"
              variants={fadeIn}
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <div className="p-3 rounded-full bg-gray-800/60 border border-gray-700/40 backdrop-blur-lg group-hover:border-purple-500/60 group-hover:bg-purple-500/10 transition-all">
                <link.icon className="w-6 h-6 text-gray-300 group-hover:text-purple-400 transition-colors" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Down Button */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <button
            onClick={scrollToNextSection}
            className="p-4 rounded-full bg-gray-800/60 border border-gray-700/40 backdrop-blur-lg hover:border-purple-500/60 hover:bg-purple-500/10 transition-all text-gray-300 hover:text-white"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.div>

      {/* Enhanced Floating Stars */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-purple-400/40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: i * 0.5 }}
        >
          <Star className={`w-${Math.floor(Math.random() * 3) + 3} h-${Math.floor(Math.random() * 3) + 3}`} />
        </motion.div>
      ))}

      {/* CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
