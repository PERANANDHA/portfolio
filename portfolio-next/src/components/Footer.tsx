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
        <div className="flex justify-center gap-4 mb-6">
          <a href="https://github.com/PERANANDHA" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
               className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 footer-social-link">
              <i className="fab fa-github text-xl" />
          </a>
          <a href="https://linkedin.com/in/peranandha-k-l-0143b9292" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
               className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 footer-social-link">
              <i className="fab fa-linkedin-in text-xl" />
          </a>
        </div>
        
        <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=peranandha17@gmail.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mb-6 text-base font-medium opacity-80 hover:opacity-100 transition-all duration-300 hover:-translate-y-0.5 footer-email"
        >
          <i className="fas fa-envelope mr-2 footer-email-icon" /> peranandha17@gmail.com
        </a>

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
