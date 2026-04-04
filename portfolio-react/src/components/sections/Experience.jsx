import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Experience = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="experience" className="section">
      <div 
        ref={ref} 
        className={`container section-content scroll-reveal ${isVisible ? 'visible' : ''}`}
      >
        <h2 className="section-title">Internship <span className="highlight">Experience</span></h2>
        <div className="timeline">

          <div className="timeline-item glass-card">
            <div className="timeline-dot"></div>
            <div className="timeline-date">Sep 2025 - Dec 2025</div>
            <h3>Web Development Intern</h3>
            <h4>Nexyuga Innovations Pvt Ltd</h4>
            <p>Designed and developed complete web pages and components from scratch, converting requirements into functional, responsive user interfaces using modern web technologies.</p>
            <a href="/nexyuga-internship.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', marginTop: '15px' }}>
              <i className="fas fa-file-pdf"></i> View Certificate
            </a>
          </div>

          <div className="timeline-item glass-card">
            <div className="timeline-dot"></div>
            <div className="timeline-date">Sep 2025 - Nov 2025</div>
            <h3>Infosys Internship 6.0</h3>
            <h4>Infosys Springboard</h4>
            <p>Completed mandatory assignments on cross-domain knowledge mapping tool development. Gained hands-on exposure to problem-solving, domain mapping, and applied learning.</p>
            <a href="/infosys-internship.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', marginTop: '15px' }}>
              <i className="fas fa-file-pdf"></i> View Certificate
            </a>
          </div>

          <div className="timeline-item glass-card">
            <div className="timeline-dot"></div>
            <div className="timeline-date">July 2025</div>
            <h3>IBM SkillsBuild Internship</h3>
            <h4>Edunet Foundation</h4>
            <p>4-week internship focused on AI and IBM Cloud Technologies. Showcased technical proficiency via hands-on project development under expert mentorship.</p>
            <a href="/aicte-internship.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', marginTop: '15px' }}>
              <i className="fas fa-file-pdf"></i> View Certificate
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
