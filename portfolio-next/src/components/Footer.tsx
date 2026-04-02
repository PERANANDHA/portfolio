import { useState, useEffect } from 'react';

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  return (
    <footer className="py-12 footer-main">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 flex flex-col items-center gap-6 text-center">
        <p className="text-3xl font-black tracking-wider footer-logo">
          P<span className="gradient-text">K</span>L
        </p>
        <div className="flex items-center gap-5">
          {[
            { href: 'https://github.com/PERANANDHA', icon: 'fab fa-github', label: 'GitHub' },
            { href: 'https://linkedin.com/in/peranandha-k-l-0143b9292', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
            { href: 'mailto:peranandha17@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
          ].map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer"
               className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 footer-social-link"
               aria-label={s.label}>
              <i className={`${s.icon} text-sm`} />
            </a>
          ))}
        </div>
        <p className="text-xs footer-location">
          <i className="fas fa-map-marker-alt mr-1 footer-location-icon" /> Salem, Tamil Nadu, India — 636307
        </p>
        <p className="text-xs footer-copyright">
          © {mounted ? new Date().getFullYear() : '2026'} PERANANDHA K L. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
