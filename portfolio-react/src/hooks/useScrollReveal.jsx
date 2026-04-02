import { useEffect, useRef, useState, useMemo } from 'react';

const defaultOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

export const useScrollReveal = (options = defaultOptions) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  // Memoize to prevent infinite re-renders if a new object is passed each time
  const memoizedOptions = useMemo(() => options, [options]);

  useEffect(() => {
    if (isVisible || !elementRef.current) return; 

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (elementRef.current) observer.unobserve(elementRef.current);
      }
    }, memoizedOptions);

    observer.observe(elementRef.current);

    // Initial check without triggering cascading render warning
    const checkInitial = setTimeout(() => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setIsVisible(true);
        }
      }
    }, 50);

    return () => {
      clearTimeout(checkInitial);
      observer.disconnect();
    };
  }, [isVisible, memoizedOptions]);

  return [elementRef, isVisible];
};
