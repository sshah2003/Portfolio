import { SKILL_LINES } from '../data/journey.js';
import { Reveal, Station } from '../components/Station.jsx';

export function Skills({ register }) {
  return (
    <Station index={4} register={register} className="skills">
      <Reveal delay={0.05}>
        <p className="section-intro">
          Transfer available to Swift, Product, and Startups. Each line below is a track I ride
          regularly — not a keyword dump.
        </p>
      </Reveal>
      <div className="skill-lines">
        {SKILL_LINES.map((line, i) => (
          <Reveal key={line.name} delay={0.06 * i}>
            <div className="skill-line" style={{ '--line': line.color }}>
              <div className="skill-line-head">
                <span className="skill-line-bullet" />
                <h3>{line.name}</h3>
              </div>
              <div className="skill-line-track">
                {line.items.map((item) => (
                  <span className="skill-stop" key={item}>
                    <i aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Station>
  );
}
