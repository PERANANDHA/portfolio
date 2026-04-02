import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const About = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="about" className="section">
      <div 
        ref={ref} 
        className={`container section-content scroll-reveal ${isVisible ? 'visible' : ''}`}
      >
        <h2 className="section-title">Profile <span className="highlight">Summary</span></h2>
        <div className="glass-card about-card">
          <p>
            Computer Science Engineer with strong expertise in <strong>Vibe Coding</strong> as a primary skill
            and also leveraging <strong>prompt engineering</strong> to build and optimize AI-driven projects.
            Experienced in translating ideas into functional solutions through intuitive, creative, and
            efficient coding practices.
          </p>
          <p>
            Skilled in <strong>software development</strong> and <strong>QA Automation</strong>. I have hands-on
            experience designing scalable applications and ensuring their reliability through comprehensive
            automated testing frameworks. My expertise includes writing robust test scripts using
            <strong>Selenium</strong> and modern testing methodologies to deliver bug-free software.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
