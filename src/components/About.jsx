import React from 'react';
import { Mail, ArrowRight, Star, Code, Brain, Cloud, ChevronRight, ExternalLink } from "lucide-react";

const About = () => {
  const skills = [
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
      category: "Backend",
      items: ["Python", "Node.js", "Django", "FastAPI"]
    },
    {
      category: "AI/ML",
      items: ["TensorFlow", "PyTorch", "OpenAI", "Langchain"]
    }
  ];

  return (
    <section id="about" className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />
        
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-6 max-w-6xl z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-4 mb-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-400 font-medium tracking-wider text-sm">ABOUT ME</span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-6">
            Passionate Developer & AI Engineer
          </h2>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed text-gray-300">
            Crafting digital experiences through code and creativity
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - About Text */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
              <p className="text-gray-300 leading-relaxed">
                I am a Full Stack Python Developer & AI Engineer with 2 years of experience in building scalable and intelligent web applications. My passion lies in creating innovative solutions that merge cutting-edge AI technology with robust web development practices.
              </p>
            </div>
            
            {/* Skills List */}
            <div className="space-y-4">
              {skills.map((skillGroup, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
                  <h3 className="text-lg font-medium text-purple-400 mb-3">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-500/10 rounded-full text-sm text-purple-300 hover:bg-purple-500/20 transition-colors duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Services Cards */}
          <div className="grid gap-6">
            <div className="group bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Code className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-200">Full Stack Development</h3>
              </div>
              <p className="text-gray-400 mb-4">Building responsive and scalable web applications using modern technologies and best practices.</p>
              <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                <span className="text-sm">Learn more</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/10 hover:border-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-200">AI & Machine Learning</h3>
              </div>
              <p className="text-gray-400 mb-4">Implementing intelligent solutions using cutting-edge AI and ML technologies.</p>
              <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                <span className="text-sm">Learn more</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-gradient-to-r from-teal-500/10 to-green-500/10 backdrop-blur-xl rounded-2xl p-6 border border-teal-500/10 hover:border-teal-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-teal-500/20 rounded-xl">
                  <Cloud className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-200">Cloud Technologies</h3>
              </div>
              <p className="text-gray-400 mb-4">Deploying and managing applications using modern cloud infrastructure.</p>
              <div className="flex items-center text-teal-400 group-hover:text-teal-300 transition-colors">
                <span className="text-sm">Learn more</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
          <button className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 flex items-center gap-2">
            View My Work
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group px-6 py-3 border border-purple-500/30 rounded-xl text-gray-300 hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm">
            Contact Me
            <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;