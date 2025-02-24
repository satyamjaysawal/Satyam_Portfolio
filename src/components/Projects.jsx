import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'PROJECT 3 - Tailwind CSS : Røde Clone',
    description: 'A modern clone of the RODE microphone website, featuring a stunning UI and smooth animations.',
    category: 'UI Design',
    tech: ['Tailwind CSS', 'HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/ca91ea1c-6fe0-4803-8fdd-a7dbd829c968',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-TAILWIND-CSS-PROJECT-3-Rode-clone-main',
    deployedLink: 'https://html-css-projects-3-rode-clone.vercel.app/',
    featured: true
  },
  {
    id: 2,
    title: 'PROJECT 2 - Tailwind : Shopify Clone',
    description: 'A full-featured Shopify clone with a responsive design, animations, and modern e-commerce components.',
    category: 'E-commerce',
    tech: ['Tailwind CSS', 'HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/005e9077-626f-4aec-a2a5-45147dfe0a0d',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-TAILWIND-CSS-PROJECT-2-Shopify-clone-main',
    deployedLink: 'https://html-css-projects-2-shopify-clone.vercel.app/',
    featured: true
  },
  {
    id: 3,
    title: 'PROJECT 1 - Tailwind CSS : Paytm Clone',
    description: 'A pixel-perfect clone of Paytm, built using Tailwind CSS, featuring responsive design and modern UI components.',
    category: 'UI Design',
    tech: ['Tailwind CSS', 'HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/50b8dfb9-ea5a-4263-ab74-281862b4658c',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-TAILWIND-CSS-PROJECT-1-paytm-clone-main',
    deployedLink: 'https://html-css-projects-1-paytm-clone.vercel.app/',
    featured: true
  },
  {
    id: 4,
    title: 'PROJECT 15 : Responsive Portfolio',
    description: 'An interactive portfolio with dark mode, analytics, and real-time data visualization.',
    category: 'Portfolio',
    tech: ['Tailwind CSS', 'HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/e567d1ac-c074-4a5b-81e9-6304fbede686',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-CSS-PROJECT-15-main',
    deployedLink: 'https://html-css-projects-15.vercel.app/',
    featured: true
  },
  {
    id: 5,
    title: 'PROJECT 14 : Responsive Dance Home Page',
    description: 'A responsive homepage for a dance website, featuring smooth animations and modern design.',
    category: 'Web Design',
    tech: ['HTML', 'CSS', 'JavaScript'],
    videoUrl: 'https://github.com/user-attachments/assets/6e82f5ad-7b98-47b9-b538-feb3a8a4a023',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-CSS-PROJECT-14-main',
    deployedLink: 'https://html-css-projects-14.vercel.app/',
    featured: true
  },
  {
    id: 6,
    title: 'PROJECT 13 : SAAS Landing Page',
    description: 'A modern and responsive landing page for a SAAS product, designed with HTML and CSS.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/ffe7e443-3acc-45fb-a9d6-f8d046ce8b00',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-CSS-PROJECT-13-main',
    deployedLink: 'https://html-css-projects-13.vercel.app/',
    featured: true
  },
  {
    id: 7,
    title: 'PROJECT 12 : Business Landing Page',
    description: 'A responsive landing page designed for a fictional business.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS', 'JavaScript'],
    videoUrl: 'https://github.com/user-attachments/assets/51021c9e-8a83-4d73-a4f8-afce62764bbe',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-CSS-PROJECT-12-main',
    deployedLink: 'https://html-css-projects-12.vercel.app/',
    featured: true
  },
  {
    id: 8,
    title: 'PROJECT 11 : Hosting Landing Page',
    description: 'A professional landing page designed for hosting services, with modern web technologies.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/6121134d-37c0-4c15-8790-214803127ba8',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-CSS-PROJECT-11-main',
    deployedLink: 'https://html-css-projects-11.vercel.app/',
    featured: true
  },
  {
    id: 9,
    title: 'PROJECT 10 : Interior Design Page',
    description: 'A landing page for an interior design service, featuring a responsive layout.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/788a76d9-fe09-4182-8233-e97f32135171',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-10-main',
    deployedLink: 'https://html-css-projects-10.vercel.app/',
    featured: true
  },
  {
    id: 10,
    title: 'PROJECT 9 : Developer Landing Page',
    description: 'A landing page showcasing a developer’s portfolio with responsive design and modern features.',
    category: 'Portfolio',
    tech: ['HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/17b25cdd-64ed-407b-a4e2-b4a84a538583',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-9-main',
    deployedLink: 'https://html-css-projects-9.vercel.app/',
    featured: true
  },
  {
    id: 11,
    title: 'PROJECT 8 : Web Design Page',
    description: 'A professional landing page for developers to showcase their work with modern web design principles.',
    category: 'Portfolio',
    tech: ['HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/db5a70dc-262c-4718-843b-5ce8af4895a9',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-8-main',
    deployedLink: 'https://html-css-projects-8.vercel.app/',
    featured: true
  },
  {
    id: 12,
    title: 'PROJECT 7 : Product Home Page',
    description: 'A simple landing page for a product with clean, minimal design and responsive layout.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/fdb4b3ed-10bb-4302-bc95-3209d1e688e7',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-7-main',
    deployedLink: 'https://html-css-projects-7.vercel.app/',
    featured: true
  },
  {
    id: 13,
    title: 'PROJECT 6 : Plant Home Page',
    description: 'A landing page for a plant shop, with modern design and user-friendly interface.',
    category: 'E-commerce',
    tech: ['HTML', 'CSS'],
    videoUrl: '',
    imageUrl: 'https://github.com/user-attachments/assets/01b582e4-8bf0-43a7-8d1a-577152638524',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-6-main',
    deployedLink: 'https://html-css-projects-6.vercel.app/',
    featured: true
  },
  {
    id: 14,
    title: 'PROJECT 5 : Crypto Landing Page',
    description: 'A homepage designed for a cryptocurrency-related product, with modern UI and responsive design.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: '',
    imageUrl: 'https://github.com/user-attachments/assets/d013409e-11af-41a2-96d1-87f27d5585db',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-5-main',
    deployedLink: 'https://html-css-projects-5.vercel.app/',
    featured: true
  },
  {
    id: 15,
    title: 'PROJECT 4 : Digital Marketing Page',
    description: 'A landing page for a digital marketing service, designed with modern web technologies.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: '',
    imageUrl: 'https://github.com/user-attachments/assets/a921e5c7-5903-4548-819b-689554d054d7',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-4-main',
    deployedLink: 'https://html-css-projects-4.vercel.app/',
    featured: true
  },
  {
    id: 16,
    title: 'PROJECT 3 : Law Home Page',
    description: 'A landing page designed for a law firm or legal service provider with a modern, responsive design.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: '',
    imageUrl: 'https://github.com/user-attachments/assets/1423ff14-f8a3-4fde-9714-ecd1779d9bb9',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-3-main',
    deployedLink: 'https://html-css-projects-3.vercel.app/',
    featured: true
  },
  {
    id: 17,
    title: 'PROJECT 2 : Food Restaurant Page',
    description: 'A landing page designed for a restaurant with an interactive and responsive layout.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: '',
    imageUrl: 'https://github.com/user-attachments/assets/9ff55d20-aee7-4a52-b236-1223cbe8eb4a',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-2-main',
    deployedLink: 'https://html-css-projects-2-phi.vercel.app/',
    featured: true
  },
  {
    id: 18,
    title: 'PROJECT 1 : Street Style Landing Page',
    description: 'A modern landing page with street style aesthetics, perfect for a fashion-related service or product.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: '',
    imageUrl: 'https://github.com/user-attachments/assets/19498af8-db54-46d1-bfc3-bc360bfa098e',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-1-main',
    deployedLink: 'https://html-css-projects-1-eight.vercel.app/',
    featured: true
  }
];


const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Enhanced Animated Background with more dynamic elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Enhanced decorative grid with animated opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-50 animate-pulse" />
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto max-w-6xl z-10">
        {/* Enhanced Header Section with animated underline */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-4 mb-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-400 font-medium tracking-wider text-sm">PORTFOLIO PROJECTS SHOWCASE</span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-6">
            Featured Projects
          </h2>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed text-gray-300">
            Explore my latest web development projects showcasing modern design and technical expertise
          </p>
          
          {/* Animated underline */}
          <div className="relative h-1 w-32 mx-auto mt-6 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse"></div>
          </div>
        </div>

        {/* Enhanced Projects Grid with staggered animation effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                transitionDelay: `${index * 50}ms`
              }}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Enhanced Category Badge with glow effect */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                  {project.category}
                </span>
              </div>
              
              {/* Enhanced Project Title with animated gradient */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                {project.title}
              </h3>
              
              {/* Project Description with fade-in effect */}
              <p className="text-gray-300 text-sm mb-4 group-hover:text-white transition-colors duration-300">{project.description}</p>
              
              {/* Enhanced Tech Stack pills with hover effects */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-md bg-gray-700/50 text-gray-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:text-white transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Enhanced Media Container with floating animation */}
              <div className="relative mb-6 rounded-lg overflow-hidden group">
                {/* Video Player with enhanced controls */}
                {project.videoUrl && (
                  <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg shadow-purple-500/10 group-hover:shadow-purple-500/30 transition-all duration-500">
                    <video
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
                      controls
                      loop
                      muted
                    >
                      <source src={project.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {/* Custom Play Button Overlay with pulse animation */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600/80 to-pink-600/80 text-white group-hover:from-purple-500 group-hover:to-pink-500 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-purple-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    {/* Decorative corner accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}

                {/* Enhanced Image with zoom and glow effects */}
                {project.imageUrl && !project.videoUrl && (
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg shadow-purple-500/10 group-hover:shadow-purple-500/30 transition-all duration-500">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    {/* Decorative corner accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
              </div>

              {/* Enhanced Action Links with animated effects */}
              <div className="flex justify-between items-center mt-auto">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  <svg className="w-4 h-4 mr-1 group-hover:animate-bounce" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Code
                </a>
                <a
                  href={project.deployedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  Live Demo
                </a>
              </div>
              
              {/* Decorative hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl"></div>
            </div>
          ))}
        </div>
        
        {/* Enhanced Footer with view more button */}
        <div className="flex justify-center mt-16">
          <button className="group relative px-6 py-3 overflow-hidden rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
            <span className="relative z-10 flex items-center">
              View More Projects
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;