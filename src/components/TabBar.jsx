import { motion } from 'framer-motion';
import { SECTIONS } from '../data/journey.js';

export function TabBar({ active, onJump }) {
  return (
    <nav className="tabbar" role="tablist" aria-label="Portfolio sections">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          role="tab"
          aria-selected={i === active}
          aria-controls={`panel-${s.id}`}
          className={`tab ${i === active ? 'is-active' : ''}`}
          onClick={() => onJump(i)}
        >
          <span className="tab-num">{String(i + 1).padStart(2, '0')}</span>
          <span className="tab-label">{s.label}</span>
          {i === active && (
            <motion.span
              className="tab-indicator"
              layoutId="tab-indicator"
              transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            />
          )}
        </button>
      ))}
    </nav>
  );
}
