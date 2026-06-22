import { TIMELINE } from '../data/journey.js';
import { Reveal, Station } from '../components/Station.jsx';

// Horizontal, scroll-snap "subway line" of stops you ride/drag through —
// replaces the old vertical accordion so the section reads less linearly.
export function Timeline({ register }) {
  return (
    <Station index={7} register={register} className="timeline">
      <Reveal delay={0.05}>
        <p className="section-intro tl-intro">
          The line so far — scroll sideways to ride it. <span aria-hidden="true">→</span>
        </p>
      </Reveal>

      <div className="tl-h-scroll" role="list">
        <div className="tl-h-line" aria-hidden="true" />
        {TIMELINE.map((item, i) => (
          <Reveal
            key={item.org + item.period}
            className="tl-h-reveal"
            delay={0.06 * i}
            variant="slide-left"
          >
            <article className="tl-h-item" role="listitem" style={{ '--accent': item.accent }}>
              <span className="tl-h-dot" aria-hidden="true" />
              <span className="tl-h-period">{item.period}</span>
              <h3 className="tl-h-role">{item.role}</h3>
              <p className="tl-h-org">{item.org}</p>
              <ul className="tl-h-details">
                {item.details.map((d) => (
                  <li key={d.slice(0, 18)}>{d}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Station>
  );
}
