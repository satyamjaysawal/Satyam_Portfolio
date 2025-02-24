import React from 'react';
import { School, Calendar, MapPin, ChevronRight, BookOpen, Award, GraduationCap } from 'lucide-react';

const educationDetails = [
  {
    id: 1,
    degree: 'Bachelor of Technology (B.Tech)',
    institution: 'Rajkiya Engineering College, Mainpuri (AKTU UP)',
    location: 'Lucknow, Uttar Pradesh, India',
    duration: 'August 2018 - July 2022',
    description: 'Graduated with a focus on computer science, software engineering, and system design. Worked on projects that integrated hardware and software to create efficient solutions, including embedded systems and communication protocols.',
    techStack: ['C', 'C++', 'Embedded Systems', 'Data Structures', 'Algorithms', 'Digital Logic', 'Signal Processing', 'Microcontrollers', 'IoT', 'Communication Systems'],
    percentage: 'CGPA: 7.57',
    icon: <GraduationCap className="w-8 h-8" />,
    color: 'from-blue-500 to-purple-600',
    highlight: 'Software Engineering & System Design'
  },
  {
    id: 2,
    degree: 'Class 12th (Intermediate)',
    institution: 'S J G S S I C Sahunagar Gaderiha',
    location: 'Jaunpur, India',
    duration: 'July 2017 - April 2018',
    description: 'Focused on a strong foundation in Mathematics and Science, actively participating in school-level science exhibitions and coding contests.',
    techStack: ['Mathematics', 'Science', 'Technology Competitions'],
    percentage: '79.8%',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-600',
    highlight: 'Mathematics & Science'
  },
  {
    id: 3,
    degree: 'Class 10th (High School)',
    institution: 'S M P Y U M V M K B Shankar Ganj',
    location: 'Jaunpur, India',
    duration: 'May 2015 - April 2016',
    description: 'Developed a keen interest in science and mathematics, which set the foundation for future engineering education.',
    techStack: ['Mathematics', 'Science'],
    percentage: '83.5%',
    icon: <Award className="w-8 h-8" />,
    color: 'from-pink-500 to-orange-500',
    highlight: 'Early STEM Foundations'
  },
];

const Education = () => {
  return (
    <section id="education" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Advanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-pink-600/15 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl animate-pulse delay-300" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-2 h-2 bg-purple-400 rounded-full absolute top-1/4 left-1/3 animate-ping delay-300" style={{ animationDuration: '4s' }} />
          <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-1/2 left-2/3 animate-ping delay-700" style={{ animationDuration: '5s' }} />
          <div className="w-2 h-2 bg-pink-400 rounded-full absolute top-3/4 left-1/4 animate-ping delay-500" style={{ animationDuration: '6s' }} />
          <div className="w-2 h-2 bg-indigo-400 rounded-full absolute top-1/3 left-3/4 animate-ping delay-200" style={{ animationDuration: '7s' }} />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Enhanced Section Header with Animated Elements */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center justify-center space-x-4 mb-6 relative">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-500" />
            <span className="text-purple-400 font-medium tracking-wider text-sm uppercase relative">
              Academic Journey
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6 animate-shimmer">
            Educational Background
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto relative">
            A chronicle of my academic pursuits and the knowledge that shapes my expertise in technology and healthcare innovation.
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></span>
          </p>
        </div>

        {/* Display all education items */}
        <div className="flex flex-col space-y-8">
          {educationDetails.map((education) => (
            <div
              key={education.id}
              className="relative bg-gray-900/70 backdrop-blur-md rounded-lg p-6 lg:p-8 shadow-lg overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${education.color} opacity-10 transition-opacity duration-500`}></div>
                <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]"></div>
              </div>

              {/* Card content */}
              <div className="relative">
                <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <div className={`relative group p-1 rounded-2xl bg-gradient-to-br ${education.color} shadow-md transition-transform duration-300`}>
                      <div className="absolute inset-0 rounded-2xl bg-gray-900/30 backdrop-blur-sm"></div>
                      <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gray-900 rounded-xl flex items-center justify-center text-white overflow-hidden">
                        {education.icon}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${education.color} bg-opacity-20 text-white text-xs font-medium mb-4`}>
                      {education.highlight}
                    </div>
                    
                    <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${education.color} mb-3`}>
                      {education.degree}
                    </h3>

                    <p className="text-lg text-white/90 mb-2 flex items-center">
                      <School className="w-5 h-5 mr-2 text-purple-400" />
                      {education.institution}
                    </p>

                    <div className="flex flex-col md:flex-row md:space-x-6 mt-4">
                      <div className="flex items-center text-gray-300 mb-2 md:mb-0">
                        <Calendar className="w-4 h-4 mr-2 text-pink-400" />
                        <span>{education.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                        <span>{education.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:self-start">
                    <div className={`relative group overflow-hidden rounded-xl p-0.5 bg-gradient-to-r ${education.color} transition-all duration-300`}>
                      <div className={`bg-gray-900 px-6 py-3 rounded-lg flex items-center justify-center`}>
                        <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300">
                          {education.percentage}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`relative p-4 rounded-2xl bg-gray-800/40 backdrop-blur-md mb-8 border border-gray-700 overflow-hidden`}>
                  <p className="text-gray-300 leading-relaxed">{education.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-purple-400 mb-4 flex items-center">
                    <span className="mr-2">TECHNOLOGIES & SKILLS</span>
                    <div className="h-px flex-grow bg-gradient-to-r from-purple-400/30 to-transparent"></div>
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {education.techStack.map((tech, idx) => (
                      <div
                        key={idx}
                        className={`group relative p-0.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-md`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${education.color} opacity-70`}></div>
                        <div className="relative px-4 py-1.5 bg-gray-900/90 rounded-full text-white text-sm flex items-center">
                          {tech}
                          <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
