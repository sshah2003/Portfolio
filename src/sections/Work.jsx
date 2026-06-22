import { WORK } from '../data/journey.js';
import { Panel, Item } from '../components/Panel.jsx';

export function Work() {
  return (
    <Panel id="work" index={2} eyebrow="Work" variant="fade-up" className="work">
      <Item>
        <div className="work-org">
          <h2>{WORK.org}</h2>
          <span>{WORK.role}</span>
        </div>
        <p className="lead">{WORK.intro}</p>
      </Item>

      <ul className="work-list">
        {WORK.highlights.map((h) => (
          <Item as="li" className="work-item" key={h.name}>
            <h4>{h.name}</h4>
            <p>{h.detail}</p>
          </Item>
        ))}
      </ul>
    </Panel>
  );
}
