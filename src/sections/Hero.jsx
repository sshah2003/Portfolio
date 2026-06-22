import { motion, useReducedMotion } from 'framer-motion';
import { HERO, STATIONS } from '../data/journey.js';
import { PROFILE } from '../data/profile.js';
import { Parallax } from '../components/Parallax.jsx';
import { Magnetic } from '../components/MagneticButton.jsx';
import { useSectionTransition } from '../hooks/useSectionTransition.js';

export function Hero({ register, onViewRoute }) {
  const reduced = useReducedMotion();
  const { goToSection } = useSectionTransition();
  const fade = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 0.6, 0.2, 1] },
  });

  return (
    <section id="union-station" ref={register(0)} className="hero" aria-label="Union Station — Intro">
      {/* Layered parallax backdrop: NYC skyline + a faint half-court */}
      <div className="hero-bg" aria-hidden="true">
        <Parallax speed={0.18} className="hero-bg-layer hero-bg-far">
          <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax meet">
            <g className="hero-skyline">
              <rect x="60" y="220" width="70" height="200" />
              <rect x="150" y="150" width="54" height="270" />
              <rect x="206" y="120" width="14" height="60" />
              <rect x="250" y="260" width="80" height="160" />
              <rect x="360" y="190" width="64" height="230" />
              <rect x="980" y="240" width="74" height="180" />
              <rect x="1064" y="160" width="50" height="260" />
              <rect x="1114" y="120" width="12" height="50" />
              <rect x="1160" y="270" width="86" height="150" />
              <rect x="1270" y="200" width="60" height="220" />
            </g>
          </svg>
        </Parallax>
        <Parallax speed={0.4} className="hero-bg-layer hero-bg-court">
          <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
            <circle cx="300" cy="300" r="150" className="hero-court-ring" />
            <line x1="300" y1="150" x2="300" y2="450" className="hero-court-ring" />
            <path className="hero-court-ring" d="M 200 180 A 150 150 0 0 1 400 180" fill="none" />
          </svg>
        </Parallax>
      </div>

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
          <Magnetic>
            <a
              className="btn btn-primary"
              href="#metro-center"
              onClick={(e) => {
                e.preventDefault();
                goToSection('metro-center');
              }}
            >
              Start the ride
              <span aria-hidden="true"> ↓</span>
            </a>
          </Magnetic>
          <Magnetic>
            <button className="btn btn-ghost" onClick={onViewRoute}>
              Open the map
            </button>
          </Magnetic>
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
          <p className="hero-track-caption">Doors opening — scroll, or press M for the map</p>
        </motion.div>
      </div>
    </section>
  );
}
