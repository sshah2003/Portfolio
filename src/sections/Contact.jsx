import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { CONTACT } from '../data/journey.js';
import { PROFILE } from '../data/profile.js';
import { Icon } from '../components/icons.jsx';
import { Reveal, Station } from '../components/Station.jsx';
import { Magnetic } from '../components/MagneticButton.jsx';

// "Shoot your shot" — tap the ball, it arcs through the hoop with a confetti
// swish. Pure delight; falls back to a static hoop under reduced motion.
function Hoop() {
  const reduced = useReducedMotion();
  const [shot, setShot] = useState(0);
  const shoot = () => !reduced && setShot((n) => n + 1);
  return (
    <div className="hoop-zone">
      <div className="hoop" aria-hidden="true">
        <span className="hoop-backboard" />
        <span className="hoop-rim" />
        <span className="hoop-net" />
        {shot > 0 && (
          <span className="confetti" key={shot}>
            {Array.from({ length: 10 }).map((_, i) => (
              <i key={i} style={{ '--i': i }} />
            ))}
          </span>
        )}
      </div>
      <button
        className={`hoop-ball ${shot > 0 ? 'is-shot' : ''}`}
        key={shot}
        onClick={shoot}
        aria-label="Shoot your shot"
      />
      <p className="hoop-caption">Shoot your shot ↑ <span aria-hidden="true">(then send a real one below)</span></p>
    </div>
  );
}

export function Contact({ register, onPlayBall }) {
  const linkedin = PROFILE.links.find((l) => l.id === 'linkedin');
  const github = PROFILE.links.find((l) => l.id === 'github');
  const x = PROFILE.links.find((l) => l.id === 'x');

  return (
    <Station index={8} register={register} className="contact">
      <div className="contact-grid">
        <div>
          <Reveal delay={0.05}>
            <p className="contact-copy">{CONTACT.copy}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="contact-actions">
              <Magnetic>
                <a className="btn btn-primary btn-lg" href={`mailto:${PROFILE.email}`}>
                  {Icon.email} Email me
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn-ghost btn-lg" href={linkedin.url} target="_blank" rel="noreferrer">
                  {Icon.linkedin} LinkedIn
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn-ghost btn-lg" href={github.url} target="_blank" rel="noreferrer">
                  {Icon.github} GitHub
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn-ghost btn-lg" href={PROFILE.resumeUrl} download="Sohil-Shah-Resume.pdf">
                  Résumé
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2} variant="scale-in">
          <Hoop />
        </Reveal>
      </div>

      <Reveal delay={0.25}>
        <footer className="footer">
          <p className="footer-final">
            <span aria-hidden="true">✈</span> Final stop — thanks for riding.
          </p>
          <p className="footer-meta">
            {PROFILE.email} · Washington, DC ·{' '}
            <a href={x.url} target="_blank" rel="noreferrer">
              @TheSohilShah
            </a>{' '}
            ·{' '}
            <button className="footer-egg" onClick={onPlayBall}>
              🏀 tip-off
            </button>
          </p>
        </footer>
      </Reveal>
    </Station>
  );
}
