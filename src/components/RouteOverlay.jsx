import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { STATIONS } from '../data/journey.js';

// "View my route" — a route card listing every stop, like a pocket map.
export function RouteOverlay({ open, onClose }) {
  const closeRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="route-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="route-card"
            role="dialog"
            aria-label="Route map"
            initial={reduced ? false : { y: 30, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { y: 30, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 0.6, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="route-card-head">
              <h3>The route</h3>
              <button ref={closeRef} className="route-close" onClick={onClose} aria-label="Close route map">
                ✕
              </button>
            </div>
            <ol className="route-list">
              {STATIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={onClose}>
                    <span className="route-list-dot" style={{ background: s.accent }} />
                    <span className="route-list-station">{s.station}</span>
                    <span className="route-list-nav">{s.nav}</span>
                  </a>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
