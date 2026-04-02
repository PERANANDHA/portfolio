'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  {
    icon: 'fas fa-code',
    title: 'Languages & Web',
    items: ['HTML', 'CSS', 'JavaScript', 'Java'],
  },
  {
    icon: 'fas fa-brain',
    title: 'AI & Methodologies',
    items: ['Prompt Engineering', 'Vibe Coding', 'Selenium WebDriver', 'Test Automation'],
  },
  {
    icon: 'fas fa-tools',
    title: 'Tools & Platforms',
    items: ['Antigravity', 'Lovable', 'Canva', 'ChatGPT', 'Gemini', 'Copilot', 'Midjourney', 'Dall-E'],
  },
  {
    icon: 'fas fa-users',
    title: 'Soft Skills',
    items: ['Team Management', 'Communication', 'Punctuality', 'UI/UX Design'],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll('.skill-card');
      gsap.fromTo(cards,
        { opacity: 0, x: -100 },
        {
          opacity: 1, x: 0,
          stagger: 0.12, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="skills" className="section-padding main-content">
      <div className="container-narrow">
        <h2 className="section-heading">
          My <span className="gradient-text">Skills</span>
        </h2>

        <div ref={gridRef} className="skills-grid">
          {SKILLS.map((s) => (
            <div key={s.title} className="skill-card glass hover:-translate-y-1 skill-card-content">
              <h3 className="skill-card-title">
                <i className={`${s.icon} skill-card-icon`} />
                {s.title}
              </h3>
              <div className="skill-badge-container">
                {s.items.map((item) => (
                  <span key={item} className="badge">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
