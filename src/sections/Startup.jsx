import { STARTUP } from '../data/journey.js';
import { Reveal, Station } from '../components/Station.jsx';

export function Startup({ register }) {
  return (
    <Station index={5} register={register} className="startup">
      <Reveal delay={0.05}>
        <p className="startup-title">{STARTUP.title}</p>
        <p className="section-intro">{STARTUP.intro}</p>
      </Reveal>
      <div className="startup-grid">
        {STARTUP.cards.map(([name, note], i) => (
          <Reveal key={name} delay={0.04 * i}>
            <div className="startup-card">
              <h4>{name}</h4>
              <p>{note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Station>
  );
}
