import { useEffect, useRef, useState } from 'react';

// Tracks which full-screen panel is currently centered, and wires keyboard
// navigation (Arrow / Page / Home / End) to step between panels.
export function useActivePanel(sections) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const scrollToPanel = (i) => {
    const clamped = Math.max(0, Math.min(sections.length - 1, i));
    const el = document.getElementById(sections[clamped].id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target);
            if (idx !== -1) {
              activeRef.current = idx;
              setActive(idx);
            }
          }
        });
      },
      { threshold: 0.55 }
    );

    els.forEach((el) => observer.observe(el));

    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const keys = {
        ArrowDown: activeRef.current + 1,
        PageDown: activeRef.current + 1,
        ArrowUp: activeRef.current - 1,
        PageUp: activeRef.current - 1,
        Home: 0,
        End: sections.length - 1,
      };
      if (e.key in keys) {
        e.preventDefault();
        scrollToPanel(keys[e.key]);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  return { active, scrollToPanel };
}
