import { EXPERIENCE } from '../data/journey.js';
import { Panel, Item } from '../components/Panel.jsx';

export function Experience() {
  return (
    <Panel id="experience" index={5} eyebrow="Experience" variant="draw-down" className="experience">
      <Item>
        <h2 className="title">The path so far.</h2>
      </Item>

      <div className="timeline">
        {EXPERIENCE.map((e) => (
          <Item className="tl-item" key={`${e.org}-${e.period}`}>
            <div className="tl-head">
              <span className="tl-role">{e.role}</span>
              <span className="tl-period">{e.period}</span>
            </div>
            <p className="tl-org">{e.org}</p>
            <p>{e.details}</p>
          </Item>
        ))}
      </div>
    </Panel>
  );
}
