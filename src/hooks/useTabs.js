import { useCallback, useEffect, useRef, useState } from 'react';

export function useTabs(count) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState('fwd');
  const prevRef = useRef(0);

  const goTo = useCallback(
    (i) => {
      const clamped = Math.max(0, Math.min(count - 1, i));
      if (clamped === active) return;
      setDirection(clamped > active ? 'fwd' : 'bwd');
      prevRef.current = active;
      setActive(clamped);
    },
    [active, count]
  );

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(active - 1); }
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= count) { e.preventDefault(); goTo(num - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, count, goTo]);

  return { active, direction, goTo };
}
