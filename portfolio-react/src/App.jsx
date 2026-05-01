import React, { useEffect } from 'react';
import './index.css';
import { Analytics } from '@vercel/analytics/react';

import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Background3D from './components/Background3D/index.jsx';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      // Ensure the background catches it on initial load if needed
      window.dispatchEvent(new Event('themeChanged'));
    }
  }, []);

  return (
    <>
      <CustomCursor />
      <Background3D />
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
      </main>

      <Footer />
      <Analytics />
    </>
  );
}

export default App;
