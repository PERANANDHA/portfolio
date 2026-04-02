'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    date: 'Sep 2025 – Dec 2025',
    role: 'Web Development Intern',
    company: 'Nexyuga Innovations Pvt Ltd',
    desc: 'Designed and developed complete web pages and components from scratch, converting requirements into functional, responsive user interfaces using modern web technologies.',
    cert: '/NEXYUGA INTERSHIP.pdf',
  },
  {
    date: 'Sep 2025 – Nov 2025',
    role: 'Infosys Internship 6.0',
    company: 'Infosys Springboard',
    desc: 'Completed mandatory assignments on cross-domain knowledge mapping tool development. Gained hands-on exposure to problem-solving, domain mapping, and applied learning.',
    cert: '/INFOSYS INTERSHIP.pdf',
  },
  {
    date: 'July 2025',
    role: 'IBM SkillsBuild Internship',
    company: 'Edunet Foundation',
    desc: '4-week internship focused on AI and IBM Cloud Technologies. Showcased technical proficiency via hands-on project development under expert mentorship.',
    cert: '/AICTE INTERSHIP.pdf',
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!timelineRef.current) return;
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      gsap.fromTo(items,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0,
          stagger: 0.18, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 80%' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="experience" className="section-padding main-content">
      <div className="container-narrow">
        <h2 className="section-heading">
          Internship <span className="gradient-text">Experience</span>
        </h2>
        <p className="section-intro">
          Hands-on industry exposure through structured internships in web development, AI, and cloud
          technologies — building real products under professional mentorship.
        </p>

        <div ref={timelineRef} className="exp-timeline">
          {/* Vertical line */}
          <div className="exp-line" />

          <div className="exp-list">
            {EXPERIENCES.map((e) => (
              <div key={e.role} className="timeline-item glass exp-item">
                {/* Dot */}
                <div className="exp-dot" />

                <div className="exp-date">
                  {e.date}
                </div>
                <h3 className="exp-role">{e.role}</h3>
                <h4 className="exp-company">{e.company}</h4>
                <p className="exp-desc">{e.desc}</p>
                <a href={e.cert} target="_blank" rel="noreferrer" className="exp-btn">
                  <i className="fas fa-file-pdf" /> View Certificate
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
