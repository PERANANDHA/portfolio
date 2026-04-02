import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Projects = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="projects" className="section">
      <div 
        ref={ref} 
        className={`container section-content scroll-reveal ${isVisible ? 'visible' : ''}`}
      >
        <h2 className="section-title">Featured <span className="highlight">Projects</span></h2>
        <div className="projects-grid">

          <div className="glass-card project-card">
            <div className="project-content">
              <a href="https://github.com/PERANANDHA/DATAPULSE" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>DATA PULSE <i className="fab fa-github" style={{ fontSize: '0.9em', marginLeft: '5px', opacity: 0.8 }}></i></h3>
              </a>
              <p>Developed software based on semester calculations and a consolidated report generator for semester exams. Developed only using modern prompt engineering techniques.</p>
              <div className="project-tech">
                <span>Prompt Engineering</span>
              </div>
            </div>
          </div>

          <div className="glass-card project-card">
            <div className="project-content">
              <a href="https://github.com/PERANANDHA/EcoCluck" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>ECOCLUCK <i className="fab fa-github" style={{ fontSize: '0.9em', marginLeft: '5px', opacity: 0.8 }}></i></h3>
              </a>
              <p>A sensor-embedded software system maintaining ideal temperatures for poultry birds. Ensures no environmental harm and includes multi-farm management. Developed entirely via prompt engineering.</p>
              <div className="project-tech">
                <span>Sensors</span>
                <span>Prompt Engineering</span>
              </div>
            </div>
          </div>

          <div className="glass-card project-card">
            <div className="project-content">
              <a href="https://github.com/PERANANDHA/Infosys_KnownMap_AI" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>KnowMap <i className="fab fa-github" style={{ fontSize: '0.9em', marginLeft: '5px', opacity: 0.8 }}></i><br/><span className="subtitle">Cross Domain Knowledge Mapping Tool</span></h3>
              </a>
              <p>Developed during Infosys Springboard Internship 6.0. Focuses on mapping knowledge across domains to enhance learning efficiency via guided practical exercises.</p>
              <div className="project-tech">
                <span>Knowledge Mapping</span>
              </div>
            </div>
          </div>

          <div className="glass-card project-card">
            <div className="project-content">
              <a href="https://github.com/PERANANDHA/Chroniccare-Agent---AICTE-EDUNET-IBM" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>Chronic Care Agent AI <i className="fab fa-github" style={{ fontSize: '0.9em', marginLeft: '5px', opacity: 0.8 }}></i></h3>
              </a>
              <p>An AI-powered agent designed to assist chronic patients by addressing their doubts and providing tailored solutions to improve their daily care routine.</p>
              <div className="project-tech">
                <span>AI Agent</span>
                <span>Jupyter Notebooks</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
