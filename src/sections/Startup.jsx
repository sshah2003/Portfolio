import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { STARTUP } from '../data/journey.js';
import { Reveal, Station } from '../components/Station.jsx';

export function Startup({ register }) {
  const reduced = useReducedMotion();
  const dragArea = useRef(null);

  return (
    <Station index={5} register={register} className="startup">
      <Reveal delay={0.05}>
        <p className="startup-title">{STARTUP.title}</p>
        <p className="section-intro">{STARTUP.intro}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="drag-hint" aria-hidden="true">↔ Grab a card — shuffle the deck</p>
      </Reveal>
      <div className="startup-grid" ref={dragArea}>
        {STARTUP.cards.map(([name, note], i) => (
          <Reveal key={name} delay={0.04 * i} variant="scale-in">
            <motion.div
              className="startup-card"
              drag={reduced ? false : true}
              dragConstraints={dragArea}
              dragElastic={0.35}
              dragSnapToOrigin
              whileDrag={{ scale: 1.05, zIndex: 5, cursor: 'grabbing' }}
              whileTap={{ cursor: 'grabbing' }}
            >
              <h4>{name}</h4>
              <p>{note}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Station>
  );
}
