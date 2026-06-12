import { motion, useReducedMotion } from 'framer-motion';
import { HERO, STATIONS } from '../data/journey.js';
import { PROFILE } from '../data/profile.js';

export function Hero({ register, onViewRoute }) {
  const reduced = useReducedMotion();
  const fade = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 0.6, 0.2, 1] },
  });

  return (
    <section id="union-station" ref={register(0)} className="hero" aria-label="Union Station — Intro">
      <div className="container hero-inner">
        <motion.p className="hero-eyebrow" {...fade(0.05)}>
          <span className="hero-eyebrow-dot" /> Union Station · {PROFILE.location}
        </motion.p>

        <motion.h1 className="hero-name" {...fade(0.15)}>
          Sohil Shah
        </motion.h1>

        <motion.p className="hero-role" {...fade(0.25)}>
          <span className="hero-line-badge">iOS</span>
          {PROFILE.title} at {PROFILE.employer}
        </motion.p>

        <motion.p className="hero-tagline" {...fade(0.35)}>
          {HERO.tagline}
        </motion.p>

        <motion.div className="hero-actions" {...fade(0.45)}>
          <a className="btn btn-primary" href="#metro-center">
            Start the ride
            <span aria-hidden="true"> ↓</span>
          </a>
          <button className="btn btn-ghost" onClick={onViewRoute}>
            View my route
          </button>
        </motion.div>

        {/* Animated metro line across the hero */}
        <motion.div className="hero-track" {...fade(0.6)} aria-hidden="true">
          <div className="hero-track-line">
            {STATIONS.map((s, i) => (
              <span
                key={s.id}
                className="hero-tick"
                style={{ left: `${(i / (STATIONS.length - 1)) * 100}%`, background: s.accent }}
              />
            ))}
            {!reduced && <span className="hero-train" />}
          </div>
          <p className="hero-track-caption">Doors opening — scroll to begin the journey</p>
        </motion.div>
      </div>
    </section>
  );
}
