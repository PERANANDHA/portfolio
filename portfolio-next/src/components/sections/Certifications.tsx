'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CERTS = [
  {
    icon: 'fas fa-robot',
    title: 'Prompt Engineering (AI Bootcamp)',
    issuer: 'Udemy',
    pdf: '/PROMPT UDEMY.pdf',
    colorClass: 'icon-amber',
    buttons: [{ label: 'View Certificate', href: '/PROMPT UDEMY.pdf' }],
  },
  {
    icon: 'fas fa-cloud',
    title: 'Oracle Cloud Infrastructure 2025 Certified DevOps Professional',
    issuer: 'Oracle',
    pdf: '/Oracle Cloud Infrastructure 2025 Certified DevOps Professional.pdf',
    colorClass: 'icon-red',
    buttons: [{ label: 'View Certificate', href: '/Oracle Cloud Infrastructure 2025 Certified DevOps Professional.pdf' }],
  },
  {
    icon: 'fas fa-laptop-code',
    title: 'NPTEL Certifications',
    issuer: 'Programming in Java - Elite, Design Implementation & Human Computer Interface - Elite',
    colorClass: 'icon-emerald',
    buttons: [
      { label: 'Java', href: '/Programming in Java.pdf' },
      { label: 'HCI Design', href: '/Design & Implementation of Human-Computer Interfaces.pdf' },
    ],
  },
  {
    icon: 'fas fa-keyboard',
    title: 'Typewriting in English (Junior)',
    issuer: 'State Board Certification',
    pdf: '/TypeWriting Jr.pdf',
    colorClass: 'icon-cyan',
    buttons: [{ label: 'View Certificate', href: '/TypeWriting Jr.pdf' }],
  },
];

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll('.cert-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="certifications" className="section-padding relative z-10">
      <div className="container-narrow">
        <h2 className="section-heading">
          Licenses & <span className="gradient-text">Certifications</span>
        </h2>
        <p className="section-intro">
          Verified credentials from global platforms and government boards — showcasing continuous
          learning across AI, cloud, programming, and professional skills.
        </p>

        <div ref={gridRef} className="cert-grid">
          {CERTS.map((c) => (
            <div key={c.title} className="cert-card glass cert-card-content hover:-translate-y-1">
              <i className={`${c.icon} cert-card-icon ${c.colorClass}`} />
              <h3 className="cert-card-title">{c.title}</h3>
              <p className="cert-card-issuer">{c.issuer}</p>
              <div className="cert-card-buttons">
                {c.buttons.map((b) => (
                  <a key={b.label} href={b.href} target="_blank" rel="noreferrer" className="cert-card-link">
                    <i className="fas fa-file-pdf" /> {b.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
