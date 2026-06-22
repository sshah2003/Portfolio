import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { STATIONS } from '../data/journey.js';
import { useSectionTransition } from '../hooks/useSectionTransition.js';

// Hand-tuned node positions (viewBox 0 0 900 360) so the line snakes across
// the map like a real transit diagram rather than a straight list.
const NODES = [
  { x: 70, y: 285 },
  { x: 175, y: 235 },
  { x: 275, y: 285 },
  { x: 385, y: 205 },
  { x: 480, y: 250 },
  { x: 575, y: 150 },
  { x: 675, y: 205 },
  { x: 770, y: 110 },
  { x: 845, y: 165 },
];

function linePath() {
  return NODES.map((n, i) => `${i === 0 ? 'M' : 'L'} ${n.x} ${n.y}`).join(' ');
}

// Full-screen interactive "City Map": every station is a clickable node on a
// snaking subway line, framed by an NYC skyline and a half-court. Picking a
// node fires the cinematic transition and closes the map. Built on the same
// overlay pattern as the old RouteOverlay (backdrop + Esc + focus).
export function CityMap({ open, onClose }) {
  const reduced = useReducedMotion();
  const closeRef = useRef(null);
  const { goToSection } = useSectionTransition();
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const jump = (id) => {
    onClose();
    // Let the overlay begin closing before the curtain takes over.
    window.setTimeout(() => goToSection(id), reduced ? 0 : 120);
  };

  const active = hover != null ? STATIONS[hover] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="citymap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={onClose}
        >
          <motion.div
            className="citymap-card"
            role="dialog"
            aria-label="City map — jump to any stop"
            initial={reduced ? false : { y: 36, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { y: 36, scale: 0.96 }}
            transition={{ duration: 0.34, ease: [0.22, 0.6, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="citymap-head">
              <div>
                <p className="citymap-kicker">System map · hop anywhere</p>
                <h3>{active ? active.station : 'Where to?'}</h3>
                <p className="citymap-sub">
                  {active ? active.title : 'Tap a stop — the train will take you there.'}
                </p>
              </div>
              <button ref={closeRef} className="citymap-close" onClick={onClose} aria-label="Close map">
                ✕
              </button>
            </div>

            <div className="citymap-stage">
              <svg className="citymap-svg" viewBox="0 0 900 360" preserveAspectRatio="xMidYMid meet">
                {/* NYC skyline silhouette */}
                <g className="citymap-skyline" aria-hidden="true">
                  <rect x="40" y="250" width="26" height="80" />
                  <rect x="74" y="210" width="30" height="120" />
                  <rect x="112" y="265" width="22" height="65" />
                  <rect x="150" y="150" width="20" height="180" rx="2" />
                  <rect x="166" y="120" width="6" height="40" />
                  <rect x="300" y="240" width="28" height="90" />
                  <rect x="336" y="200" width="24" height="130" />
                  <rect x="640" y="230" width="30" height="100" />
                  <rect x="676" y="190" width="22" height="140" />
                  <rect x="790" y="245" width="26" height="85" />
                  <rect x="822" y="215" width="30" height="115" />
                </g>

                {/* Half-court inset */}
                <g className="citymap-court" aria-hidden="true">
                  <rect x="430" y="300" width="120" height="54" rx="3" />
                  <circle cx="490" cy="354" r="26" />
                  <line x1="490" y1="300" x2="490" y2="354" />
                </g>

                {/* The line */}
                <path className="citymap-line" d={linePath()} />

                {/* Stops */}
                {NODES.map((n, i) => {
                  const s = STATIONS[i];
                  const isHot = hover === i;
                  return (
                    <g
                      key={s.id}
                      className={`map-node ${isHot ? 'is-hot' : ''}`}
                      transform={`translate(${n.x} ${n.y})`}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(i)}
                      onBlur={() => setHover(null)}
                      onClick={() => jump(s.id)}
                      role="button"
                      tabIndex={0}
                      aria-label={`${s.station} — ${s.nav}`}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && jump(s.id)}
                    >
                      <circle className="map-node-halo" r="18" style={{ fill: s.accent }} />
                      <circle className="map-node-dot" r="9" style={{ stroke: s.accent }} />
                      <text className="map-node-num" y="1">{i + 1}</text>
                      <text className="map-node-label" y="-26">{s.station}</text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <p className="citymap-hint">
              <span className="citymap-hint-key">M</span> toggles the map · {STATIONS.length} stops on the line
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
