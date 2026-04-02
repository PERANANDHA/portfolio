'use client';
import Image from 'next/image';

export default function Hero() {

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">

        {/* Left content */}
        <div className="hero-left-content reveal-left">
          <p className="hero-greeting hero-greeting-text">
            Hi, I am
          </p>

          <h1 className="hero-name hero-name-heading">
            PERANANDHA K L
          </h1>

          <h2 className="hero-title hero-title-subheading">
            CS Engineer, <span className="gradient-text">QA Automation</span> & AI Enthusiast
          </h2>

          <p className="hero-tagline hero-tagline-text">
            Expertise in Vibe Coding, QA Testing, and building intuitive AI-driven scalable applications,
            with a strong passion for software and web development.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions hero-actions-wrapper">
            <button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-btn-main"
            >
              View My Work
            </button>
            <a href="/PERANANDHA_K_L_Resume.pdf" target="_blank" rel="noreferrer" className="hero-btn-outline">
              View Resume
            </a>
            <a href="mailto:peranandha17@gmail.com" className="hero-btn-outline">
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          <div className="hero-socials hero-socials-container">
            {[
              { href: 'https://github.com/PERANANDHA', icon: 'fab fa-github', label: 'GitHub' },
              { href: 'https://linkedin.com/in/peranandha-k-l-0143b9292', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
              { href: 'mailto:peranandha17@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
            ].map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                className="hero-social-icon-link"
              >
                <i className={`${s.icon} text-sm`} />
              </a>
            ))}
            <a href="tel:+918148537603" className="hero-contact-pill">
              <i className="fas fa-phone text-xs" />
              <span className="hero-contact-text">+91 81485 37603</span>
            </a>
          </div>
        </div>

        {/* Right – Profile Image */}
        <div className="hero-image-wrapper hero-image-outer-wrapper reveal-right">
          <div className="hero-image-size-box">
            <div className="hero-profile-image-mask">
              <Image src="/profile1.png" alt="PERANANDHA K L" fill className="object-cover object-top" priority />
            </div>

            {/* Floating badges */}
            <div className="hero-floating-badge hero-badge-dev">
              <i className="fas fa-code mr-1 hero-badge-icon-dev" /> Developer
            </div>
            <div className="hero-floating-badge hero-badge-ai">
              <i className="fas fa-robot mr-1 hero-badge-icon-ai" /> AI Enthusiast
            </div>
          </div>
        </div>

      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-indicator">
        <button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="hero-scroll-btn"
          aria-label="Scroll down"
        >
          <i className="fas fa-chevron-down hero-scroll-icon" />
        </button>
      </div>
    </section>
  );
}
