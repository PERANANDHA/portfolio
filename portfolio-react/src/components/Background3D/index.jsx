import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleConnections from './ParticleConnections';
import CoreHologram from './CoreHologram';
import AtmosphericDust from './AtmosphericDust';
import OrbitalRings from './OrbitalRings';

const Background3D = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Initial check
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsLightMode(theme === 'light');
    };
    checkTheme();

    // Listen for custom theme change events (dispatched from Navbar)
    window.addEventListener('themeChanged', checkTheme);
    return () => window.removeEventListener('themeChanged', checkTheme);
  }, []);

  return (
    <div className="background-container">
      <Canvas
        camera={{ position: [0, 0, 150], fov: 75 }}
        gl={{ alpha: true, antialias: true, pixelRatio: Math.min(window.devicePixelRatio, 2) }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 1 }}
      >
        <ParticleConnections isLightMode={isLightMode} />
        <CoreHologram isLightMode={isLightMode} />
        <AtmosphericDust isLightMode={isLightMode} />
        <OrbitalRings isLightMode={isLightMode} />
      </Canvas>
    </div>
  );
};

export default Background3D;
