'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import ThemeToggle from '@/components/ThemeToggle';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Certifications from '@/components/sections/Certifications';
import Footer from '@/components/Footer';

// Load Three.js scene client-side only (no SSR)
const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <CustomCursor />
      <Scene3D />
      
      {/* Intro Gate Overlay */}
      <div className={`intro-overlay ${entered ? 'intro-hidden' : ''}`}>
        {/* Toggle in same fixed position as navbar for continuity */}
        <div className="fixed right-6 sm:right-10 lg:right-16 xl:right-20 top-[40px] md:top-[50px] z-50">
          <ThemeToggle />
        </div>

        <div className="intro-content-wrapper flex flex-col items-center justify-center relative z-10 w-full px-6 text-center">
          <div className="intro-badge mb-6">
            <span className="intro-badge-text">Welcome to my universe</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter drop-shadow-2xl intro-title">
            PERANANDHA <span className="gradient-text">K L</span>
          </h1>
          <p className="intro-subtitle text-base md:text-lg max-w-2xl mt-6 mb-12 font-medium tracking-wide">
            CS Engineer <span className="text-accent mx-3 opacity-50">•</span> QA Automation <span className="text-accent mx-3 opacity-50">•</span> AI Enthusiast
          </p>
          <button className="intro-button group" onClick={() => setEntered(true)}>
            <span className="relative z-10 flex items-center justify-center gap-3">
              Witness the Experience
              <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-2"></i>
            </span>
          </button>
        </div>
      </div>

      {/* Main Portfolio Content */}
      <div className={`portfolio-content ${entered ? 'content-visible' : ''}`}>
        <Navbar />
        <main className="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
        </main>
        <Footer />
      </div>
    </>
  );
}
