import React from "react";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: 'AI Engineer & Full Stack Developer',
    company: 'Capgemini India',
    location: 'Mumbai, India (Remote)',
    projectName: 'H&K Holland & Knight - AI Chatbot Development',
    duration: 'Dec 2022 - Present',
    description: [
      'Developed an AI-powered chatbot for Microsoft Teams, enhancing ITSM knowledge retrieval.',
      'Integrated **Azure OpenAI** for intent classification and content summarization to improve response accuracy.',
      'Built a data pipeline to extract and index documents from SharePoint using **Azure Cognitive Search**.',
      'Connected the bot to **ServiceNow** KB articles, delivering formatted responses via adaptive cards.',
      'Implemented scalable backend services using **FastAPI**, **Azure Functions**, and **CosmosDB**.',
      'Automated workflows with **Azure Logic Apps** and utilized **Document Intelligence** for OCR-based text extraction.',
      'Integrated **Power BI** dashboards for monitoring chatbot performance and user engagement.'
    ],
    techStack: ['FastAPI', 'Azure Functions', 'CosmosDB', 'App Service', 'Unstructured.io', 'Bot Service', 'Cognitive Search', 'Power BI', 'Logic Apps', 'Blob Storage', 'ServiceNow', 'Document Intelligence', 'Azure OpenAI', 'SharePoint']
  },
  {
    id: 2,
    role: 'AI Engineer & Full Stack Developer',
    company: 'Capgemini India',
    location: 'Mumbai, India (Remote)',
    projectName: 'Skoda Project - AI-Powered Chatbot & Document Processing Suite',
    duration: 'Feb 2023 - Present',
    description: [
      'Developed an AI-powered chatbot to automate document analysis, query handling, and data extraction, enhancing customer-service team interactions.',
      'Implemented "Ask to Files", enabling users to query uploaded documents for summaries, key data, and specific clauses.',
      'Created "Ask to URL", allowing users to retrieve insights from web pages, simplifying information extraction.',
      'Designed a Document Comparison feature for side-by-side analysis, highlighting key differences and similarities.',
      'Integrated OpenAI API and NLP models for improved chatbot accuracy and contextual understanding.'
    ],
    techStack: ['Python (Flask)', 'Streamlit', 'Azure', 'OpenAI API', 'BeautifulSoup', 'Langchain', 'Fine-tuning', 'NLP models', 'Pandas', 'SQL']
  },
  {
    id: 3,
    role: 'Python Developer & AI Engineer',
    company: 'Capgemini India',
    location: 'Mumbai, India (Remote)',
    projectName: 'Amplifier Knowledge Mining & GenAIHUB',
    duration: 'Jul 2023 - Present',
    description: [
      'Developed a data-driven application using Python and Flask for the Amplifier Knowledge Mining & GenAIHUB project.',
      'Diagnosed and resolved data-related issues to ensure consistent application reliability.',
      'Applied data-driven improvements to enhance usability and meet evolving business needs.',
      'Developed new features using GenAI and OpenAI, improving the application analytical capabilities and user experience.',
      'Managed database operations in MongoDB and MySQL, optimizing queries for enhanced data integrity and performance with SQLAlchemy.',
      'Implemented strong data security measures to minimize vulnerabilities and ensure secure data access.'
    ],
    techStack: ['Python', 'Flask', 'MongoDB', 'MySQL', 'SQLAlchemy', 'OpenAI', 'GenAI', 'Security measures']
  },
  {
    id: 4,
    role: 'Java Web Application Support and Maintenance',
    company: 'Capgemini India',
    location: 'Mumbai, India (Remote)',
    projectName: 'Liberty Mutual Account',
    duration: 'Oct 2022 - Present',
    description: [
      'Provided comprehensive support for a web-based application utilizing Java, Servlets, JSP, Spring MVC, Spring Boot, and Oracle SQL.',
      'Collaborated with the development team to diagnose and resolve issues raised by end-users.',
      'Implemented bug fixes and enhancements to improve application usability and accommodate changing business requirements.',
      'Ensured timely resolution of support tickets in adherence to service-level agreements (SLAs).',
      'Developed custom Servlets and JSP pages to introduce new features and functionalities.'
    ],
    techStack: ['Java', 'Servlets', 'JSP', 'Spring MVC', 'Spring Boot', 'Oracle SQL', 'Dependency Injection', 'Oracle DB']
  }
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-left">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-4 mb-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-400 font-medium tracking-wider text-sm">PROFESSIONAL JOURNEY</span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-6">
            Work Experience
          </h2>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed text-gray-300">
            Building cutting-edge AI solutions and applications across diverse industries
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent" />
              )}
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Timeline icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {/* Content card */}
                <div className="flex-1 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {exp.role}
                      </h3>
                      <p className="text-lg font-semibold text-white">{exp.projectName}</p>
                    </div>
                    <span className="mt-2 md:mt-0 px-4 py-1 rounded-full bg-purple-900/50 border border-purple-700/50 text-purple-300 text-sm flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.duration}
                    </span>
                  </div>
                  
                  {/* Company & Location */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 text-gray-400">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center mr-2">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      {exp.company}
                    </div>
                    <div className="hidden sm:block text-gray-600">•</div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center mr-2">
                        <MapPin className="w-4 h-4" />
                      </div>
                      {exp.location}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {exp.description.map((line, idx) => (
                        <li key={idx} className="flex items-start">
                          <ChevronRight className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 ml-2">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-600/40 to-pink-600/40 text-gray-200 border border-purple-500/30 hover:from-purple-500/60 hover:to-pink-500/60 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

export default Experience;