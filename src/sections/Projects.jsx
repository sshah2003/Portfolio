import { PROJECTS } from '../data/journey.js';
import { Reveal, Station } from '../components/Station.jsx';

export function Projects({ register }) {
  const { featured, upcoming } = PROJECTS;
  return (
    <Station index={3} register={register} className="projects">
      <Reveal delay={0.05}>
        <article className="fare-card">
          <div className="fare-card-top">
            <div>
              <p className="fare-card-kicker">Featured project · Fare card</p>
              <h3 className="fare-card-name">{featured.name}</h3>
            </div>
            <span className="fare-card-chip" aria-hidden="true" />
          </div>
          <p className="fare-card-desc">{featured.description}</p>
          <ul className="fare-card-points">
            {featured.points.map((p) => (
              <li key={p.slice(0, 18)}>{p}</li>
            ))}
          </ul>
          <div className="fare-card-tech">
            {featured.tech.map((t) => (
              <span className="chip" key={t}>{t}</span>
            ))}
          </div>
          <div className="fare-card-actions">
            <a className="btn btn-primary" href={featured.demo} target="_blank" rel="noreferrer">
              Visit ClassMate →
            </a>
            <a className="btn btn-ghost" href={featured.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span className="fare-card-status">{featured.status}</span>
          </div>
        </article>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="boarding-label">Now boarding</p>
      </Reveal>
      <div className="boarding-grid">
        {upcoming.map((p, i) => (
          <Reveal key={p.name} delay={0.05 * i}>
            <div className="boarding-card">
              <span className="boarding-dot" />
              <h4>{p.name}</h4>
              <p>{p.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Station>
  );
}
