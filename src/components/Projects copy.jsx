import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, Sparkles, Code2, Star } from 'lucide-react';

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


const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-2xl overflow-hidden border border-gray-700/50 transition-all duration-500 hover:scale-[1.02]"
      style={{
        animationDelay: `${index * 200}ms`,
        animation: 'fadeIn 0.6s ease-out forwards'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      {/* Glass Morphism Effect */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Media Container */}
        <div className="relative w-full h-48 lg:h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
          {project.videoUrl ? (
            <iframe
              src={project.videoUrl}
              title={project.title}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <img 
              src={project.imageUrl || '/api/placeholder/400/300'}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          )}
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 backdrop-blur-md rounded-full border border-yellow-500/20">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Featured</span>
            </div>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 backdrop-blur-md rounded-full border border-purple-500/20 shadow-lg transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <Code2 className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {project.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs font-medium text-purple-200 bg-purple-500/10 rounded-full border border-purple-500/20 hover:bg-purple-500/20 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href={project.githubLink} 
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300 border border-gray-700 group"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Code
              </span>
            </a>
            <a 
              href={project.deployedLink} 
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/20 group"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  useEffect(() => {
    const iframeElements = document.querySelectorAll('iframe');
    iframeElements.forEach(iframe => {
      const iframeSrc = iframe.getAttribute('src');
      if (iframeSrc && !iframeSrc.includes('autoplay=1')) {
        iframe.setAttribute('src', `${iframeSrc}?autoplay=1&mute=1`);
      }
    });
  }, []);

  return (
    <section id="projects" className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-4 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-400 font-medium tracking-wider text-sm uppercase">Portfolio Showcase</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-6">
            Featured Projects
          </h2>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed text-gray-300">
            Explore my latest web development projects showcasing modern design and technical expertise
          </p>
        </div>

        {/* Projects Grid - Now 3 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;