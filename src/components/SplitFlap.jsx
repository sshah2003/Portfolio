import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ·-';

// Split-flap (Solari) text: once it scrolls into view, each character riffles
// through random glyphs before settling on the final letter, like an airport
// departures board. Renders the final text immediately under reduced motion.
export function SplitFlap({ text, className = '' }) {
  const reduced = useReducedMotion();
  const final = text.toUpperCase();
  const [display, setDisplay] = useState(reduced ? final : ' '.repeat(final.length));
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduced || started.current) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    let timers = [];
    const run = () => {
      if (started.current) return;
      started.current = true;
      final.split('').forEach((ch, i) => {
        if (ch === ' ') return;
        let ticks = 0;
        const total = 6 + i * 2; // later letters settle later → cascade
        const id = setInterval(() => {
          ticks += 1;
          setDisplay((prev) => {
            const arr = prev.split('');
            arr[i] = ticks >= total ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            return arr.join('');
          });
          if (ticks >= total) clearInterval(id);
        }, 45);
        timers.push(id);
      });
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearInterval);
    };
  }, [final, reduced]);

  return (
    <span ref={ref} className={`splitflap ${className}`} aria-label={text}>
      {display.split('').map((ch, i) => (
        <span className="splitflap-cell" key={i} aria-hidden="true">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}
