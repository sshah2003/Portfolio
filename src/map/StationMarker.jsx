import { motion } from 'framer-motion';
import './StationMarker.css';

const LABEL_OFFSETS = {
  top: (s) => ({ x: 0, y: s.isInterchange ? -52 : -28 }),
  bottom: (s) => ({ x: 0, y: s.isInterchange ? 66 : 42 }),
  left: () => ({ x: -34, y: 5 }),
  right: () => ({ x: 34, y: 5 }),
};

export function StationMarker({ station, isCurrent, isVisited, index, reducedMotion, onSelect }) {
  const { x, y, label } = station;
  const base = LABEL_OFFSETS[label.side](station);
  const offset = { x: base.x + (label.dx ?? 0), y: base.y + (label.dy ?? 0) };
  const lineGap = 14; // first label line sits at the offset; extras stack downward

  return (
    <motion.g
      className={`station ${isCurrent ? 'is-current' : ''} ${isVisited ? 'is-visited' : ''} ${
        station.isFeatured ? 'is-featured' : ''
      }`}
      role="button"
      tabIndex={0}
      aria-label={`Go to station: ${station.name}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(station.id);
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(station.id);
        }
      }}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.1 + index * 0.08, duration: 0.45, ease: 'easeOut' }}
      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
    >
      {/* Generous invisible hit target (≈44px on screen at overview zoom) */}
      <circle cx={x} cy={y} r={station.isInterchange ? 46 : 34} fill="transparent" />
      {station.isFeatured && (
        <rect x={x - 56} y={y - 88} width={230} height={144} fill="transparent" />
      )}

      {station.isFeatured && (
        <>
          <circle className="featured-pulse" cx={x} cy={y} r={40} />
          <text className="featured-badge" x={x} y={y - 66} textAnchor="middle">
            ★ FEATURED PROJECT
          </text>
        </>
      )}

      {isCurrent && <circle className="current-halo" cx={x} cy={y} r={station.isInterchange ? 36 : 24} />}

      {station.isInterchange ? (
        <rect
          className="station-dot interchange"
          x={x - 13}
          y={y - 41}
          width={26}
          height={82}
          rx={13}
        />
      ) : (
        <circle className="station-dot" cx={x} cy={y} r={11} />
      )}

      <text
        className="station-label"
        x={x + offset.x}
        y={y + offset.y - (station.signage.length - 1) * lineGap * (label.side === 'top' ? 1 : 0)}
        textAnchor={label.anchor}
      >
        {station.signage.map((line, i) => (
          <tspan key={line} x={x + offset.x} dy={i === 0 ? 0 : 22}>
            {line}
          </tspan>
        ))}
      </text>
    </motion.g>
  );
}
