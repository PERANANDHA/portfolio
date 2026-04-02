'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0, x: 150, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="section main-content">
      <div className="container-narrow">
        <h2 className="section-heading">
          Profile <span className="gradient-text">Summary</span>
        </h2>

        <div className="glass glass-padding">
          <p className="text-description">
            Computer Science Engineer with strong expertise in <strong className="highlight-text">Vibe Coding</strong> as a primary skill
            and also leveraging <strong className="highlight-text">prompt engineering</strong> to build and optimize AI-driven projects.
            Experienced in translating ideas into functional solutions through intuitive, creative, and
            efficient coding practices.
          </p>
          <p className="text-description">
            Skilled in <strong className="highlight-text">software development</strong> and <strong className="highlight-text">QA Automation</strong>.
            I have hands-on experience designing scalable applications and ensuring their reliability through
            comprehensive automated testing frameworks. My expertise includes writing robust test scripts using{' '}
            <strong className="highlight-text">Selenium</strong> and modern testing methodologies to deliver bug-free software.
          </p>
        </div>
      </div>
    </section>
  );
}
