import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Hero = () => {
  // Call the hook at the top level
  const [contentRef, contentVisible] = useScrollReveal();
  const [imageRef, imageVisible] = useScrollReveal();

  return (
    <header id="home" className="hero">
      <div className="container hero-container">
        
        <div 
          ref={contentRef} 
          className={`hero-content scroll-reveal ${contentVisible ? 'visible' : ''}`}
        >
          <p className="greeting">Hi, I am</p>
          <h1 className="name">PERANANDHA K L</h1>
          <h2 className="title">
            CS Engineer, <span className="highlight">QA Automation</span> & AI Enthusiast
          </h2>
          <p className="tagline">
            Expertise in Vibe Coding, QA Testing, and building intuitive AI-driven scalable applications, with a strong passion for software and web development.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="/PERANANDHA_K_L_Resume.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary">View Resume</a>
            <a href="mailto:peranandha17@gmail.com" className="btn btn-secondary">Contact Me</a>
          </div>
          <div className="social-links">
            <a href="https://github.com/PERANANDHA" target="_blank" rel="noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/peranandha-k-l-0143b9292" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="mailto:peranandha17@gmail.com" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="tel:+918148537603" aria-label="Phone" className="phone-link">
              <i className="fas fa-phone"></i>
              <span>+91 81485 37603</span>
            </a>
          </div>
        </div>

        <div 
          ref={imageRef} 
          className={`hero-image-wrapper scroll-reveal ${imageVisible ? 'visible' : ''}`} 
          style={{ transitionDelay: '200ms' }}
        >
          <div className="image-border">
            <img src="/profile1.png" alt="PERANANDHA K L Profile" className="profile-img" />
          </div>
          <div className="floating-badge badge-1">
            <i className="fas fa-code"></i> Developer
          </div>
          <div className="floating-badge badge-2">
            <i className="fas fa-robot"></i> AI Enthusiast
          </div>
        </div>

      </div>
      <div className="scroll-down">
        <a href="#about"><i className="fas fa-chevron-down"></i></a>
      </div>
    </header>
  );
};

export default Hero;
