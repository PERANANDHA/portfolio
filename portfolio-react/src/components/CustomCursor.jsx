import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorDot = useRef(null);
  const cursorOutline = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDot.current && cursorOutline.current) {
        cursorDot.current.style.left = `${posX}px`;
        cursorDot.current.style.top = `${posY}px`;

        // Smooth trailing effect for the outline using Web Animations API
        cursorOutline.current.animate(
          {
            left: `${posX}px`,
            top: `${posY}px`,
          },
          { duration: 500, fill: 'forwards' }
        );
      }
    };

    const handleMouseEnterInteractive = () => {
      if (cursorOutline.current) {
        cursorOutline.current.style.width = '50px';
        cursorOutline.current.style.height = '50px';
        cursorOutline.current.style.backgroundColor = 'var(--primary-glow)';
      }
    };

    const handleMouseLeaveInteractive = () => {
      if (cursorOutline.current) {
        cursorOutline.current.style.width = '30px';
        cursorOutline.current.style.height = '30px';
        cursorOutline.current.style.backgroundColor = 'transparent';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Setup hover listeners for interactive elements using delegation
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive') ||
        target.closest('.skill-category') ||
        target.closest('.project-card')
      ) {
        handleMouseEnterInteractive();
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive') ||
        target.closest('.skill-category') ||
        target.closest('.project-card')
      ) {
        handleMouseLeaveInteractive();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={cursorDot}></div>
      <div className="cursor-outline" ref={cursorOutline}></div>
    </>
  );
};

export default CustomCursor;
