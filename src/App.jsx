import React from 'react';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <Sidebar />

      <main className="lg:pl-16">
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default App;