import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { STATIONS } from '../data/journey.js';
import { SectionTransitionContext } from '../hooks/useSectionTransition.js';

// Timing for the curtain wipe (ms).
const COVER = 460; // panels sweep in to fully cover the screen
const HOLD = 220; // brief "loading" hold while we jump scroll
const REVEAL = 460; // panels sweep back out

// Provider that wraps the app, exposes goToSection(id), and renders the
// GTA-style transition: stacked colored bars sweep across, a spinning loading
// wheel and the destination station name flash in, we scroll under cover, then
// the bars sweep away. Fully bypassed under prefers-reduced-motion.
export function TransitionProvider({ children }) {
  const reduced = useReducedMotion();
  const [trip, setTrip] = useState(null); // { id, label, accent, key }
  const busy = useRef(false);

  const goToSection = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const station = STATIONS.find((s) => s.id === id);
      const accent = station?.accent || 'var(--m-blue)';
      const label = station?.station || '';

      if (reduced) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (busy.current) return;
      busy.current = true;

      setTrip({ id, label, accent, key: Date.now() });

      // Jump scroll while the screen is fully covered.
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, COVER + HOLD / 2);

      // Tear down once the reveal finishes.
      window.setTimeout(() => {
        setTrip(null);
        busy.current = false;
      }, COVER + HOLD + REVEAL);
    },
    [reduced],
  );

  const bars = [
    'var(--m-red)',
    'var(--m-orange)',
    'var(--m-yellow)',
    'var(--m-green)',
    'var(--m-blue)',
  ];

  return (
    <SectionTransitionContext.Provider value={{ goToSection }}>
      {children}
      <AnimatePresence>
        {trip && (
          <div className="rt" aria-hidden="true" key={trip.key}>
            {bars.map((c, i) => (
              <motion.span
                key={c}
                className="rt-bar"
                style={{ background: c }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{
                  scaleX: [0, 1, 1, 0],
                  originX: [0, 0, 1, 1],
                }}
                transition={{
                  duration: (COVER + HOLD + REVEAL) / 1000,
                  ease: [0.7, 0, 0.3, 1],
                  times: [0, COVER / (COVER + HOLD + REVEAL), (COVER + HOLD) / (COVER + HOLD + REVEAL), 1],
                  delay: i * 0.03,
                }}
              />
            ))}
            <motion.div
              className="rt-hud"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -6] }}
              transition={{ duration: (COVER + HOLD + REVEAL) / 1000, times: [0, 0.4, 0.7, 1] }}
            >
              <span className="rt-wheel" style={{ '--rt-accent': trip.accent }} />
              <span className="rt-label">
                <em>Now approaching</em>
                <strong>{trip.label}</strong>
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SectionTransitionContext.Provider>
  );
}
