import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useFinePointer } from '../hooks/usePointer.js';

// Wraps a child (button/link) so it gently pulls toward the pointer on hover.
// Degrades to a plain passthrough on touch devices or under reduced motion.
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  if (reduced || !fine) {
    return <span className={`magnetic ${className}`}>{children}</span>;
  }

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </span>
  );
}

// Tilts a card toward the pointer in 3D. Returns props to spread onto the
// element; no-op (empty props) on touch / reduced motion.
export function useTilt(max = 9) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  if (reduced || !fine) return {};

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
  };
  return { ref, onMouseMove: onMove, onMouseLeave: reset, className: 'tilt' };
}

// Accent ring that trails the cursor and swells over interactive elements.
// Mounted once globally; renders nothing on touch devices.
export function CustomCursor() {
  const fine = useFinePointer();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!fine) return undefined;
    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let tx = rx;
    let ty = ry;
    let raf;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
      }
      const interactive = e.target.closest('a, button, .tilt, .map-node, [role="button"]');
      setHot(Boolean(interactive));
    };

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [fine]);

  if (!fine) return null;
  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className={`cursor-ring ${hot ? 'is-hot' : ''}`} aria-hidden="true" />
    </>
  );
}
