import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Github, Linkedin, Twitter, Mail, ArrowRight, Star, CheckCircle, XCircle } from "lucide-react";
import Typed from "typed.js";

const roles = ["Full Stack Developer", "AI Chatbot Developer", "Data Scientist"];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });
  const fileInputRef = useRef(null);
  const typedRef = useRef(null);

  useEffect(() => {
    typedRef.current = new Typed(".typing", {
      strings: ["Web Designer", "Web Developer", "Graphic Designer", "YouTuber"],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
      showCursor: false,
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
    // Replace this URL with your actual CV file URL
    const cvUrl = '/path-to-your-cv.pdf';
    
    try {
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

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden flex items-center justify-center pt-12 px-4">
            <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />
        
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>
      
      {/* Custom Notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className={`flex items-center gap-2 px-4 py-3 rounded-lg backdrop-blur-lg shadow-lg ${
            notification.type === "success" 
              ? "bg-green-500/10 border border-green-500/20" 
              : "bg-red-500/10 border border-red-500/20"
          }`}>
            {notification.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <p className="text-gray-200 text-sm font-medium">
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

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Floating Elements */}
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="absolute text-purple-400/20 animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
        {/* Welcome Banner */}
        <div className="bg-white/5 backdrop-blur-lg rounded-full shadow-lg px-6 py-2 mb-6">
          <div className="inline-flex items-center justify-center space-x-4">
            <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-purple-400" />
            <p className="text-gray-300 font-light tracking-widest text-sm animate-pulse">WELCOME TO MY PORTFOLIO</p>
            <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
        </div>

        {/* Name & Roles */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-100">
            Hello, I'm{" "}
            <span
              className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text"
              style={{ fontFamily: "'Clicker Script', cursive" }}
            >
              Satyam Jaysawal
            </span>
          </h1>

          <div className="space-y-3">
            <h2 className={`text-2xl md:text-4xl font-medium text-gray-200 transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
              I'm a{" "}
              <span className="font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
                {roles[roleIndex]}
              </span>
            </h2>

            <h3 className="text-2xl md:text-3xl font-semibold text-gray-200">
              An{" "}
              <span className="typing text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
                Experienced
              </span>{" "}
              Professional
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mt-6 font-light">
          Passionate about crafting exceptional digital experiences through clean code and intuitive design.
          Transforming ideas into powerful, scalable solutions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button 
            onClick={handleDownloadCV}
            className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 flex items-center gap-2"
          >
            Download CV
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={handleUpdateCV}
            className="group px-6 py-3 border border-purple-500/30 rounded-xl text-gray-300 hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
          >
            Update CV
            <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mt-6">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition duration-300">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition duration-300">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition duration-300">
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;