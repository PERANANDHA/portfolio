import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Education = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="education" className="section">
      <div 
        ref={ref} 
        className={`container section-content scroll-reveal ${isVisible ? 'visible' : ''}`}
      >
        <h2 className="section-title"><span className="highlight">Education</span> Path</h2>
        <div className="timeline">

          <div className="timeline-item glass-card">
            <div className="timeline-dot"></div>
            <div className="timeline-date">Graduation: 05/2027 (Ongoing)</div>
            <h3>B.E. in Computer Science and Engineering</h3>
            <h4>K.S. Rangasamy College of Technology, Tiruchengode</h4>
            <p>CGPA: 8.4</p>
          </div>

          <div className="timeline-item glass-card">
            <div className="timeline-dot"></div>
            <div className="timeline-date">Graduation: 03/2023</div>
            <h3>Higher Secondary (Class XII)</h3>
            <h4>SRK Matric Higher Secondary School, Salem</h4>
            <p>Percentage: 86.17%</p>
          </div>

          <div className="timeline-item glass-card">
            <div className="timeline-dot"></div>
            <div className="timeline-date">Graduation: 03/2021</div>
            <h3>SSLC (Class X)</h3>
            <h4>SRK Matric Higher Secondary School, Salem</h4>
            <p>Percentage: 100%</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;
