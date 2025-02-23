import React from 'react';

// Importing components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
// import NotFound from './components/NotFound';

const App = () => {
  return (
    <div className="bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Sidebar (optional, you can toggle visibility or make it responsive) */}
      <Sidebar />

      {/* Main Content */}
      <div >
      <Sidebar />
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Experience Section */}
        <Experience />

        {/* Education Section */}
        <Education />

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <Footer />
      </div>
      
      {/* Handle Page Not Found (404) */}
      {/* You might handle this through React Router or some routing logic */}
      {/* <NotFound /> */}
    </div>
  );
}

export default App;
