import { ABOUT } from '../data/journey.js';
import { Reveal, Station } from '../components/Station.jsx';

export function About({ register }) {
  return (
    <Station index={1} register={register} className="about">
      <div className="about-grid">
        <Reveal className="about-copy" delay={0.05}>
          {ABOUT.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </Reveal>
        <Reveal className="about-side" delay={0.15}>
          <div className="about-card">
            <p className="about-card-label">Travels with</p>
            <ul>
              {ABOUT.chips.map((c) => (
                <li key={c}>
                  <span className="about-chip-dot" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Station>
  );
}
