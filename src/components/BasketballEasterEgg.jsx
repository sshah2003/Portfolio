import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useFinePointer } from '../hooks/usePointer.js';

const SIZE = 64;
const GRAVITY = 0.7;
const BOUNCE = 0.78;
const FRICTION = 0.992;

// A flingable basketball with simple gravity + edge-bounce physics. Hidden
// until summoned with the "B" key (or the footer court button via the
// `open`/`onClose` props). Grab and throw it; it bounces around the viewport.
// Disabled on touch devices and under reduced motion.
export function BasketballEasterEgg({ open, onClose }) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const ballRef = useRef(null);
  const state = useRef({ x: 120, y: 120, vx: 6, vy: 0, dragging: false, lastX: 0, lastY: 0 });
  const raf = useRef(0);
  const [spin, setSpin] = useState(0);

  useEffect(() => {
    if (!open || reduced || !fine) return undefined;
    const s = state.current;
    s.x = window.innerWidth / 2;
    s.y = 140;
    s.vx = (Math.random() - 0.5) * 14;
    s.vy = 0;
    let rot = 0;

    const tick = () => {
      const maxX = window.innerWidth - SIZE;
      const maxY = window.innerHeight - SIZE;
      if (!s.dragging) {
        s.vy += GRAVITY;
        s.x += s.vx;
        s.y += s.vy;
        if (s.x <= 0) { s.x = 0; s.vx = -s.vx * BOUNCE; }
        if (s.x >= maxX) { s.x = maxX; s.vx = -s.vx * BOUNCE; }
        if (s.y >= maxY) { s.y = maxY; s.vy = -s.vy * BOUNCE; s.vx *= FRICTION; }
        if (s.y <= 0) { s.y = 0; s.vy = -s.vy * BOUNCE; }
        rot += s.vx * 1.4;
      }
      if (ballRef.current) {
        ballRef.current.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${rot}deg)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [open, reduced, fine, spin]);

  if (!open || reduced || !fine) return null;

  const onDown = (e) => {
    const s = state.current;
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    e.target.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    const s = state.current;
    if (!s.dragging) return;
    s.x += e.clientX - s.lastX;
    s.y += e.clientY - s.lastY;
    s.vx = (e.clientX - s.lastX) * 0.9;
    s.vy = (e.clientY - s.lastY) * 0.9;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
  };
  const onUp = () => { state.current.dragging = false; };

  return (
    <>
      <div
        ref={ballRef}
        className="bball"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        role="img"
        aria-label="A bouncing basketball — drag to fling it"
      />
      <button className="bball-dismiss" onClick={onClose}>
        Catch the ball ✕
      </button>
    </>
  );
}

// Small global listener: pressing "B" (outside inputs) toggles the easter egg.
export function useBasketballKey(setter) {
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey) return;
      if (e.key === 'b' || e.key === 'B') setter((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setter]);
}
