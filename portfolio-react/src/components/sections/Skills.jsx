import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Skills = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="skills" className="section">
      <div 
        ref={ref} 
        className={`container section-content scroll-reveal ${isVisible ? 'visible' : ''}`}
      >
        <h2 className="section-title">My <span className="highlight">Skills</span></h2>
        <div className="skills-grid">

          <div className="glass-card skill-category">
            <h3><i className="fas fa-code"></i> Languages & Web</h3>
            <div className="badges">
              <span className="badge">HTML</span>
              <span className="badge">CSS</span>
              <span className="badge">JavaScript</span>
              <span className="badge">Java</span>
            </div>
          </div>

          <div className="glass-card skill-category">
            <h3><i className="fas fa-brain"></i> AI & Methodologies</h3>
            <div className="badges">
              <span className="badge">Selenium WebDriver</span>
              <span className="badge">Test Automation</span>
              <span className="badge">Vibe Coding</span>
              <span className="badge">Prompt Engineering</span>
            </div>
          </div>

          <div className="glass-card skill-category">
            <h3><i className="fas fa-tools"></i> Tools & Design</h3>
            <div className="badges">
              <span className="badge">Antigravity</span>
              <span className="badge">Lovable</span>
              <span className="badge">Canva</span>
              <span className="badge">ChatGPT</span>
              <span className="badge">Gemini</span>
              <span className="badge">Copilot</span>
              <span className="badge">Midjourney</span>
              <span className="badge">Dall-E</span>
            </div>
          </div>

          <div className="glass-card skill-category">
            <h3><i className="fas fa-users"></i> Soft Skills</h3>
            <div className="badges">
              <span className="badge">Team Management</span>
              <span className="badge">Communication</span>
              <span className="badge">Punctuality</span>
              <span className="badge">UI/UX Design</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
