import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

// Drives the whole journey: measures section offsets, converts scroll
// position into a fractional station index (0 … count-1), and reports the
// active station. The probe sits 45% down the viewport so a station counts
// as "current" while its content is what you're reading.
export function useJourney(count) {
  const [active, setActive] = useState(0);
  const raw = useMotionValue(0);
  const progress = useSpring(raw, { stiffness: 120, damping: 26, mass: 0.6 });
  const sectionsRef = useRef([]);

  useEffect(() => {
    let tops = [];
    const els = sectionsRef.current;

    const measure = () => {
      tops = els.map((el) => (el ? el.offsetTop : 0));
    };

    const onScroll = () => {
      if (!tops.length) return;
      const probe = window.scrollY + window.innerHeight * 0.45;
      let i = 0;
      while (i < count - 1 && probe >= tops[i + 1]) i += 1;
      const start = tops[i];
      const end = i < count - 1 ? tops[i + 1] : start + window.innerHeight;
      const p = Math.min(1, Math.max(0, (probe - start) / Math.max(1, end - start)));
      // Snap to the end of the line once the page bottom is reached.
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      raw.set(atBottom ? count - 1 : Math.min(count - 1, i + p));
      setActive(atBottom ? count - 1 : i);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // Content height changes when cards expand — remeasure.
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [count, raw]);

  const registerSection = (index) => (el) => {
    sectionsRef.current[index] = el;
  };

  return { progress, active, registerSection };
}
