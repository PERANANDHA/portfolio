'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'DATA PULSE',
    github: 'https://github.com/PERANANDHA/DATAPULSE',
    desc: 'Developed software based on semester calculations and a consolidated report generator for semester exams. Developed only using modern prompt engineering techniques.',
    tags: ['Prompt Engineering'],
  },
  {
    title: 'ECOCLUCK',
    github: 'https://github.com/PERANANDHA/EcoCluck',
    desc: 'A sensor-embedded software system maintaining ideal temperatures for poultry birds. Ensures no environmental harm and includes multi-farm management. Developed entirely via prompt engineering.',
    tags: ['Sensors', 'Prompt Engineering'],
  },
  {
    title: 'KnowMap',
    subtitle: 'Cross Domain Knowledge Mapping Tool',
    github: 'https://github.com/PERANANDHA/Infosys_KnownMap_AI',
    desc: 'Developed during Infosys Springboard Internship 6.0. Focuses on mapping knowledge across domains to enhance learning efficiency via guided practical exercises.',
    tags: ['Knowledge Mapping'],
  },
  {
    title: 'Chronic Care Agent AI',
    github: 'https://github.com/PERANANDHA/Chroniccare-Agent---AICTE-EDUNET-IBM',
    desc: 'An AI-powered agent designed to assist chronic patients by addressing their doubts and providing tailored solutions to improve their daily care routine.',
    tags: ['AI Agent', 'Jupyter Notebooks'],
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll('.project-card');
      gsap.fromTo(cards,
        { opacity: 0, x: 100 },
        {
          opacity: 1, x: 0,
          stagger: 0.15, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="projects" className="projects-section">
      <div className="container-narrow">
        <h2 className="section-heading">
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <div ref={gridRef} className="projects-grid">
          {PROJECTS.map((p) => (
            <div key={p.title} className="project-card glass hover:-translate-y-1 project-card-custom">
              <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                <h3 className="project-title">
                  {p.title}{' '}
                  <i className="fab fa-github project-github-icon" />
                  {p.subtitle && (
                    <><br /><span className="project-subtitle">{p.subtitle}</span></>
                  )}
                </h3>
              </a>
              <p className="project-description">{p.desc}</p>
              <div className="project-tags-container">
                {p.tags.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
