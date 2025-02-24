import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Github, Linkedin, Twitter, Mail, ArrowRight, Star, CheckCircle, XCircle, Code, Sparkles, Database } from "lucide-react";
import Typed from "typed.js";

const roles = [
  { text: "Full Stack Developer", icon: <Code className="w-5 h-5" /> },
  { text: "AI Chatbot Developer", icon: <Sparkles className="w-5 h-5" /> },
  { text: "Data Scientist", icon: <Database className="w-5 h-5" /> }
];

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
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,
    });

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setFade(true);
      }, 500);
    }, 4000);

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
      // Replace this URL with your actual CV file URL
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

    // Validate file type
    if (file.type !== 'application/pdf') {
      showNotification("Please upload a PDF file", "error");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification("File size should be less than 5MB", "error");
      return;
    }

    try {
      // Here you would typically handle the file upload to your server
      // const formData = new FormData();
      // formData.append('cv', file);
      // await fetch('/api/upload-cv', { method: 'POST', body: formData });
      
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
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden flex items-center justify-center px-4 py-16">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                backgroundColor: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.3 + 0.1})`,
                animation: `float ${Math.random() * 10 + 20}s linear infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>
      
      {/* Custom Notification */}
      {notification.show && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in">
          <div className={`flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-lg shadow-lg ${
            notification.type === "success" 
              ? "bg-green-500/10 border border-green-500/20 text-green-400" 
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}>
            {notification.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <p className="text-sm font-medium">
              {notification.message}
            </p>
          </div>
        </div>
      )}

      {/* Hidden file input for CV upload */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf"
        onChange={handleFileUpload}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Enhanced Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-500/5 via-pink-500/10 to-purple-500/5 backdrop-blur-sm rounded-full shadow-lg px-8 py-3 mb-8 border border-white/5 animate-pulse">
          <div className="inline-flex items-center justify-center space-x-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-purple-400" />
            <p className="text-gray-300 font-light tracking-widest text-sm">WELCOME TO MY PORTFOLIO</p>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
        </div>

        {/* Enhanced Name & Roles */}
        <div className="space-y-6 mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-100 leading-tight">
            Hello, I'm{" "}
            <span
              className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text relative inline-block"
              style={{ fontFamily: "'Clicker Script', cursive" }}
            >
              Satyam Jaysawal
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-70 rounded-full"></span>
            </span>
          </h1>

          <div className="space-y-3">
            <h2 className={`text-2xl md:text-4xl font-medium text-gray-200 transition-opacity duration-500 flex items-center justify-center gap-2 ${fade ? "opacity-100" : "opacity-0"}`}>
              I'm a{" "}
              <span className="font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text flex items-center">
                {roles[roleIndex].icon}
                <span className="ml-2">{roles[roleIndex].text}</span>
              </span>
            </h2>

            <h3 className="text-2xl md:text-3xl font-semibold text-gray-200 flex items-center justify-center gap-2">
              An{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text inline-block">
                <span ref={typedElementRef}></span>
              </span>{" "}
              Professional
            </h3>
          </div>
        </div>

        {/* Enhanced Description */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 rounded-lg blur"></div>
          <p className="relative bg-gray-900/50 backdrop-blur-sm text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-6 py-4 rounded-lg border border-purple-500/10 font-light">
            Passionate about crafting exceptional digital experiences through clean code and intuitive design.
            Transforming ideas into powerful, scalable solutions.
          </p>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button 
            onClick={handleDownloadCV}
            className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-xl text-white font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 flex items-center gap-2"
          >
            Download CV
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={handleUpdateCV}
            className="group px-8 py-4 border border-purple-500/30 rounded-xl text-gray-300 hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm hover:border-purple-500/50"
          >
            Update CV
            <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Enhanced Social Links */}
        <div className="flex justify-center space-x-8 mt-8">
          <a 
            href="https://github.com/satyamjaysawal" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group text-gray-300 transform transition duration-300"
          >
            <div className="p-3 rounded-full bg-gray-800/50 border border-gray-700/30 backdrop-blur-sm group-hover:border-purple-500/50 group-hover:scale-110 transition-all">
              <Github className="w-6 h-6 group-hover:text-purple-400 transition-colors" />
            </div>
          </a>
          <a 
            href="https://www.linkedin.com/in/satyam-jaysawal-9b58b7238" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group text-gray-300 transform transition duration-300"
          >
            <div className="p-3 rounded-full bg-gray-800/50 border border-gray-700/30 backdrop-blur-sm group-hover:border-purple-500/50 group-hover:scale-110 transition-all">
              <Linkedin className="w-6 h-6 group-hover:text-purple-400 transition-colors" />
            </div>
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group text-gray-300 transform transition duration-300"
          >
            <div className="p-3 rounded-full bg-gray-800/50 border border-gray-700/30 backdrop-blur-sm group-hover:border-purple-500/50 group-hover:scale-110 transition-all">
              <Twitter className="w-6 h-6 group-hover:text-purple-400 transition-colors" />
            </div>
          </a>
          <a 
            href="mailto:sjrecm9258@gmail.com" 
            className="group text-gray-300 transform transition duration-300"
          >
            <div className="p-3 rounded-full bg-gray-800/50 border border-gray-700/30 backdrop-blur-sm group-hover:border-purple-500/50 group-hover:scale-110 transition-all">
              <Mail className="w-6 h-6 group-hover:text-purple-400 transition-colors" />
            </div>
          </a>
        </div>
        
        {/* Scroll Down Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToNextSection}
            className="p-3 rounded-full bg-gray-800/50 border border-gray-700/30 backdrop-blur-sm hover:border-purple-500/50 transition-all text-gray-400 hover:text-white"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Enhanced floating stars */}
      {[...Array(8)].map((_, i) => (
        <Star
          key={i}
          className={`absolute text-purple-400/30 w-${Math.floor(Math.random() * 3) + 3} h-${Math.floor(Math.random() * 3) + 3} animate-pulse`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </section>
  );
};

export default Hero;