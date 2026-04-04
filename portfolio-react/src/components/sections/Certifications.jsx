import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Certifications = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="certifications" className="section">
      <div 
        ref={ref} 
        className={`container section-content scroll-reveal ${isVisible ? 'visible' : ''}`}
      >
        <h2 className="section-title">Licenses & <span className="highlight">Certifications</span></h2>
        <div className="certs-grid">

          <div className="glass-card cert-card">
            <i className="fas fa-robot cert-icon"></i>
            <h3>Prompt Engineering (AI Bootcamp)</h3>
            <p>Udemy</p>
            <a href="/prompt-udemy.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', marginTop: '15px' }}>
              <i className="fas fa-file-pdf"></i> View Certificate
            </a>
          </div>

          <div className="glass-card cert-card">
            <i className="fas fa-cloud cert-icon"></i>
            <h3>Oracle Cloud Infrastructure 2025 Certified DevOps Professional</h3>
            <p>Oracle</p>
            <a href="/oracle-devops-professional.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', marginTop: '15px' }}>
              <i className="fas fa-file-pdf"></i> View Certificate
            </a>
          </div>

          <div className="glass-card cert-card">
            <i className="fas fa-laptop-code cert-icon"></i>
            <h3>NPTEL Certifications</h3>
            <p>Programming in Java - Elite, Design Implementation & Human Computer Interface - Elite</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px', justifyContent: 'center' }}>
              <a href="/programming-in-java.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                <i className="fas fa-file-pdf"></i> Java
              </a>
              <a href="/hci-design.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                <i className="fas fa-file-pdf"></i> HCI Design
              </a>
            </div>
          </div>

          <div className="glass-card cert-card">
            <i className="fas fa-keyboard cert-icon"></i>
            <h3>Typewriting in English (Junior)</h3>
            <p>State Board Certification</p>
            <a href="/typewriting-jr.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', marginTop: '15px' }}>
              <i className="fas fa-file-pdf"></i> View Certificate
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Certifications;
