'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle({ className = "" }: Readonly<{ className?: string }>) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const updateTheme = (dark: boolean) => {
    setIsDark(dark);
    const theme = dark ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    // Notify other components
    globalThis.dispatchEvent(new Event('themeChanged'));
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
      const saved = localStorage.getItem('theme');
      const initialIsDark = saved ? saved !== 'light' : true;
      setIsDark(initialIsDark);
    });

    const handleThemeChange = () => {
      const current = localStorage.getItem('theme');
      setIsDark(current !== 'light');
    };

    globalThis.addEventListener('themeChanged', handleThemeChange);
    return () => globalThis.removeEventListener('themeChanged', handleThemeChange);
  }, []);

  if (!mounted) return <div className={`w-10 h-10 ${className}`} />;

  return (
    <button
      className={`theme-toggle-btn ${className}`}
      aria-label="Toggle theme"
      onClick={() => updateTheme(!isDark)}
    >
      {/* Realistic Sun Icon */}
      <svg className="sun-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sunCore" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="15%" stopColor="#ffe600" />
            <stop offset="40%" stopColor="#ff9d00" />
            <stop offset="70%" stopColor="#ff4800" />
            <stop offset="100%" stopColor="#b31500" />
          </radialGradient>
        </defs>
        <g className="sun-rays" stroke="#ffe100" strokeWidth="1.5" strokeLinecap="round">
          <line x1="50" y1="2" x2="50" y2="14" />
          <line x1="50" y1="86" x2="50" y2="98" />
          <line x1="2" y1="50" x2="14" y2="50" />
          <line x1="86" y1="50" x2="98" y2="50" />
          <line x1="16" y1="16" x2="25" y2="25" />
          <line x1="84" y1="84" x2="75" y2="75" />
          <line x1="16" y1="84" x2="25" y2="75" />
          <line x1="84" y1="16" x2="75" y2="25" />
          <g transform="rotate(22.5 50 50)" strokeWidth="1" stroke="rgba(255, 200, 0, 0.8)">
            <line x1="50" y1="6" x2="50" y2="15" />
            <line x1="50" y1="85" x2="50" y2="94" />
            <line x1="6" y1="50" x2="15" y2="50" />
            <line x1="85" y1="50" x2="94" y2="50" />
            <line x1="18" y1="18" x2="26" y2="26" />
            <line x1="82" y1="82" x2="74" y2="74" />
            <line x1="18" y1="82" x2="26" y2="74" />
            <line x1="82" y1="18" x2="74" y2="26" />
          </g>
        </g>
        <circle cx="50" cy="50" r="28" fill="url(#sunCore)" />
      </svg>

      {/* Realistic Moon Icon */}
      <svg className="moon-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#c7d2fe" />
            <stop offset="70%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
          <filter id="moonCraterGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path d="M 65 20 A 35 35 0 1 0 80 85 A 40 40 0 1 1 65 20 Z" fill="url(#moonGrad)" />
        <circle cx="35" cy="45" r="3" fill="#1e1b4b" opacity="0.4" filter="url(#moonCraterGlow)" />
        <circle cx="50" cy="65" r="4" fill="#1e1b4b" opacity="0.3" filter="url(#moonCraterGlow)" />
        <circle cx="45" cy="30" r="2" fill="#1e1b4b" opacity="0.5" filter="url(#moonCraterGlow)" />
        <circle cx="28" cy="60" r="2.5" fill="#1e1b4b" opacity="0.3" filter="url(#moonCraterGlow)" />
        <circle cx="75" cy="35" r="1.5" fill="#ffffff" opacity="0.8" />
        <circle cx="65" cy="50" r="1" fill="#ffffff" opacity="0.5" />
        <circle cx="82" cy="65" r="2" fill="#ffffff" opacity="0.6" />
      </svg>
    </button>
  );
}
