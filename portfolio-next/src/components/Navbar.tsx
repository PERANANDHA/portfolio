'use client';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Education',      href: '#education' },
  { label: 'Certifications', href: '#certifications' },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 h-[80px] md:h-[88px]" />
    );
  }

  return (
    <nav
      className={`absolute top-0 left-0 right-0 z-40 transition-all duration-300 navbar-base`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 h-[100px] md:h-[130px] flex items-center justify-center relative">
        {/* Logo */}
        <button onClick={() => globalThis.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-3xl md:text-4xl font-black tracking-wider nav-logo absolute left-6 sm:left-10 lg:left-16 xl:left-20">
          P<span className="gradient-text">K</span>L
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-10">
          {LINKS.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => scrollTo(l.href)}
                className="text-base lg:text-[1.05rem] font-semibold transition-colors duration-200 hover:text-cyan-400 nav-link"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Theme + hamburger (fixed to stay on scroll) */}
        <div className="flex items-center gap-4 fixed right-6 sm:right-10 lg:right-16 xl:right-20 top-[40px] md:top-[50px] z-50">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5">
            <span className={`block h-0.5 w-6 transition-all duration-300 menu-toggle-line ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 transition-all duration-300 menu-toggle-line ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 transition-all duration-300 menu-toggle-line ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 glass mobile-menu-container">
          {LINKS.map((l) => (
            <button key={l.label} onClick={() => scrollTo(l.href)}
              className="block w-full text-left py-3 text-sm font-medium border-b mobile-menu-link">
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
