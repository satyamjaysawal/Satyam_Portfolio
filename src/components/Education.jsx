import React from 'react';
import { School, Calendar, MapPin, ChevronRight } from 'lucide-react';

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
  },
];

const Education = () => {
  return (
    <section id="education" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-400 font-medium tracking-wider text-sm">MY EDUCATION JOURNEY</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-6">
            Educational Background
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            A chronicle of my academic pursuits and the knowledge that shapes my expertise in technology and healthcare innovation.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-8">
          {educationDetails.map((edu) => (
            <div
              key={edu.id}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 max-w-4xl mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Header */}
              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <School className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {edu.degree}
                    </h3>
                  </div>
                  <p className="text-lg text-purple-200/80">{edu.institution}</p>
                </div>
                
                <div className="mt-4 lg:mt-0 flex flex-col items-start lg:items-end space-y-2">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{edu.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{edu.location}</span>
                  </div>
                  <p className="text-gray-300 mt-2 text-sm">{edu.percentage}</p>
                </div>
              </div>

              {/* Description */}
              <p className="relative text-gray-300 mb-6">{edu.description}</p>

              {/* Tech Stack */}
              <div className="relative">
                <h4 className="text-sm font-semibold text-purple-400 mb-3">Technologies & Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {edu.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-1.5 bg-purple-500/20 text-purple-200 rounded-full text-sm hover:bg-purple-500/30 cursor-pointer transition-all duration-200 flex items-center"
                    >
                      {tech}
                      <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  ))}
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
