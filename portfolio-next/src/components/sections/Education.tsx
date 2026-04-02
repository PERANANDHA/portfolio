'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EDU = [
  {
    date: 'Graduation: 05/2027 (Ongoing)',
    degree: 'B.E. in Computer Science and Engineering',
    inst: 'K.S. Rangasamy College of Technology, Tiruchengode',
    score: 'CGPA: 8.4',
  },
  {
    date: 'Graduation: 03/2023',
    degree: 'Higher Secondary (Class XII)',
    inst: 'SRK Matric Higher Secondary School, Salem',
    score: 'Percentage: 86.17%',
  },
  {
    date: 'Graduation: 03/2021',
    degree: 'SSLC (Class X)',
    inst: 'SRK Matric Higher Secondary School, Salem',
    score: 'Percentage: 100%',
  },
];

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!timelineRef.current) return;
      const items = timelineRef.current.querySelectorAll('.edu-item');
      gsap.fromTo(items,
        { opacity: 0, x: 40 },
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
    <section ref={ref} id="education" className="section-padding main-content">
      <div className="container-narrow">
        <h2 className="section-heading">
          <span className="gradient-text">Education</span> Path
        </h2>
        <p className="section-intro">
          A strong academic foundation backed by top scores, from perfect marks in school to an ongoing
          B.E. in Computer Science with a solid CGPA.
        </p>

        <div ref={timelineRef} className="edu-timeline">
          <div className="edu-line" />

          <div className="edu-list">
            {EDU.map((e) => (
              <div key={e.degree} className="edu-item glass glass-padding relative">
                <div className="edu-dot" />
                <div className="edu-date">{e.date}</div>
                <h3 className="edu-degree">{e.degree}</h3>
                <h4 className="edu-inst">{e.inst}</h4>
                <p className="edu-score">{e.score}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
