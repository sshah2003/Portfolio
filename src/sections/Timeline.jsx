import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TIMELINE } from '../data/journey.js';
import { Reveal, Station } from '../components/Station.jsx';

function TimelineItem({ item, open, onToggle, reduced, isLast }) {
  const id = `tl-${item.org.replace(/\W+/g, '-')}-${item.period.slice(0, 8).replace(/\W+/g, '')}`;
  return (
    <li className={`tl-item ${isLast ? 'is-last' : ''}`} style={{ '--accent': item.accent }}>
      <span className="tl-dot" aria-hidden="true" />
      <button className="tl-toggle" onClick={onToggle} aria-expanded={open} aria-controls={id}>
        <span className="tl-role">{item.role}</span>
        <span className="tl-org">{item.org}</span>
        <span className="tl-period">{item.period}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="tl-body"
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.3, 0, 0.2, 1] }}
          >
            <ul>
              {item.details.map((d) => (
                <li key={d.slice(0, 18)}>{d}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Timeline({ register }) {
  const [openIdx, setOpenIdx] = useState(0);
  const reduced = useReducedMotion();
  return (
    <Station index={7} register={register} className="timeline">
      <Reveal delay={0.05}>
        <ol className="tl">
          {TIMELINE.map((item, i) => (
            <TimelineItem
              key={item.org + item.period}
              item={item}
              reduced={reduced}
              isLast={i === TIMELINE.length - 1}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </ol>
      </Reveal>
    </Station>
  );
}
