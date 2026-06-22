import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { WORK } from '../data/journey.js';
import { Reveal, Station } from '../components/Station.jsx';
import { SplitFlap } from '../components/SplitFlap.jsx';

function WorkCard({ card, open, onToggle, reduced }) {
  return (
    <div className={`work-card ${open ? 'is-open' : ''}`}>
      <button
        className="work-card-toggle"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`work-${card.id}`}
      >
        <span className="work-card-name">{card.name}</span>
        <span className="work-card-tag">{card.tag}</span>
        <span className="work-card-plus" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`work-${card.id}`}
            className="work-card-body"
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.3, 0, 0.2, 1] }}
          >
            <p>{card.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Work({ register }) {
  const [openId, setOpenId] = useState('storekit');
  const reduced = useReducedMotion();

  return (
    <Station index={2} register={register} className="work">
      <Reveal delay={0.05}>
        <p className="section-intro">{WORK.intro}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="arrivals" role="img" aria-label="Departures board of shipped work">
          <div className="arrivals-head">
            <span>Departures — McPherson Sq</span>
            <span className="arrivals-live">● LIVE</span>
          </div>
          {WORK.board.map(([name, status]) => (
            <div className="arrivals-row" key={name}>
              <SplitFlap className="arrivals-name" text={name} />
              <span className="arrivals-dots" aria-hidden="true" />
              <span className="arrivals-status">{status}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="work-grid">
        {WORK.cards.map((card, i) => (
          <Reveal key={card.id} delay={0.06 * i}>
            <WorkCard
              card={card}
              reduced={reduced}
              open={openId === card.id}
              onToggle={() => setOpenId(openId === card.id ? null : card.id)}
            />
          </Reveal>
        ))}
      </div>
    </Station>
  );
}
