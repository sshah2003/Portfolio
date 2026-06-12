import { TEACHING } from '../data/journey.js';
import { Reveal, Station } from '../components/Station.jsx';

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
          <Reveal key={ex.label} delay={0.07 * i}>
            <figure className="exhibit">
              <figcaption className="exhibit-plaque">
                <span className="exhibit-label">{ex.label}</span>
                <span className="exhibit-period">{ex.period}</span>
              </figcaption>
              <h3>{ex.title}</h3>
              <p>{ex.body}</p>
            </figure>
          </Reveal>
        ))}
      </div>
    </Station>
  );
}
