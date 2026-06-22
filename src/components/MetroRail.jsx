import { useTransform, motion } from 'framer-motion';
import { STATIONS } from '../data/journey.js';
import { useSectionTransition } from '../hooks/useSectionTransition.js';

// Desktop: fixed left rail showing the whole route. The train marker rides
// scroll progress; dots are anchor links with hover/focus tooltips.
export function MetroRail({ progress, active }) {
  const n = STATIONS.length;
  const trainTop = useTransform(progress, (v) => `${(v / (n - 1)) * 100}%`);
  const { goToSection } = useSectionTransition();

  return (
    <nav className="rail" aria-label="Route navigation">
      <div className="rail-line">
        <motion.div className="rail-train" style={{ top: trainTop }} aria-hidden="true">
          <span className="rail-train-car" />
        </motion.div>
        {STATIONS.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => {
              e.preventDefault();
              goToSection(s.id);
            }}
            className={`rail-stop ${i === active ? 'is-active' : ''} ${i < active ? 'is-passed' : ''}`}
            style={{ top: `${(i / (n - 1)) * 100}%`, '--accent': s.accent }}
            aria-label={`${s.station} — ${s.nav}`}
            aria-current={i === active ? 'true' : undefined}
          >
            <span className="rail-dot" />
            <span className="rail-tip">
              <strong>{s.station}</strong>
              <em>{s.nav}</em>
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}

// Mobile: slim progress line across the top, under the topbar.
export function MobileProgress({ progress, active }) {
  const n = STATIONS.length;
  const width = useTransform(progress, (v) => `${(v / (n - 1)) * 100}%`);
  return (
    <div className="mobile-progress" aria-hidden="true">
      <motion.div
        className="mobile-progress-fill"
        style={{ width, background: STATIONS[active].accent }}
      />
    </div>
  );
}

// Sticky "current station" chip (appears once you leave the hero).
export function NowAt({ active }) {
  const s = STATIONS[active];
  if (active === 0) return null;
  return (
    <div className="now-at" role="status">
      <span className="now-at-dot" style={{ background: s.accent }} />
      <span className="now-at-label">
        Now at <strong>{s.station}</strong>
      </span>
    </div>
  );
}
