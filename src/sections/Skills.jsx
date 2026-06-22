import { SKILL_LINES } from '../data/journey.js';
import { Reveal, Station } from '../components/Station.jsx';

export function Skills({ register }) {
  const total = SKILL_LINES.reduce((n, l) => n + l.items.length, 0);

  return (
    <Station index={4} register={register} className="skills">
      <Reveal delay={0.05}>
        <p className="section-intro">
          Transfer available to Swift, Product, and Startups. Every track below is one I ride
          regularly — call it the box score, not a keyword dump.
        </p>
      </Reveal>

      {/* Scoreboard strip */}
      <Reveal delay={0.1} variant="scale-in">
        <div className="scoreboard" role="img" aria-label="Skills box score">
          <div className="scoreboard-cell">
            <span className="scoreboard-num">{total}</span>
            <span className="scoreboard-label">Skills on the floor</span>
          </div>
          <div className="scoreboard-cell">
            <span className="scoreboard-num">{SKILL_LINES.length}</span>
            <span className="scoreboard-label">Lines / lineups</span>
          </div>
          <div className="scoreboard-cell">
            <span className="scoreboard-num">∞</span>
            <span className="scoreboard-label">Minutes played</span>
          </div>
          <div className="scoreboard-clock" aria-hidden="true">
            <span className="scoreboard-dot" /> 4TH · 0:24
          </div>
        </div>
      </Reveal>

      <div className="skill-lines court">
        {SKILL_LINES.map((line, i) => (
          <Reveal key={line.name} delay={0.06 * i} variant={i % 2 ? 'slide-left' : 'slide-right'}>
            <div className="skill-line" style={{ '--line': line.color }}>
              <div className="skill-line-head">
                <span className="skill-line-bullet" />
                <h3>{line.name}</h3>
                <span className="skill-line-score">{line.items.length} PTS</span>
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
