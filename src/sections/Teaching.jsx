import { TEACHING } from '../data/journey.js';
import { Reveal, Station } from '../components/Station.jsx';
import { useTilt } from '../components/MagneticButton.jsx';

function Exhibit({ ex }) {
  const tilt = useTilt(8);
  return (
    <figure className="exhibit" {...tilt}>
      <figcaption className="exhibit-plaque">
        <span className="exhibit-label">{ex.label}</span>
        <span className="exhibit-period">{ex.period}</span>
      </figcaption>
      <h3>{ex.title}</h3>
      <p>{ex.body}</p>
    </figure>
  );
}

export function Teaching({ register }) {
  return (
    <Station index={6} register={register} className="teaching">
      <Reveal delay={0.05}>
        <p className="section-intro">
          A small permanent collection on leading, teaching, and finishing things.
        </p>
      </Reveal>
      <div className="exhibit-grid">
        {TEACHING.exhibits.map((ex, i) => (
          <Reveal key={ex.label} delay={0.07 * i} variant="mask">
            <Exhibit ex={ex} />
          </Reveal>
        ))}
      </div>
    </Station>
  );
}
