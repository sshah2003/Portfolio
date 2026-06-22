import { ABOUT } from '../data/journey.js';
import { Panel, Item } from '../components/Panel.jsx';

export function About({ direction }) {
  return (
    <Panel id="about" index={1} eyebrow="About" direction={direction} className="about">
      <div className="about-copy">
        {ABOUT.paragraphs.map((p) => (
          <Item as="p" key={p.slice(0, 24)}>
            {p}
          </Item>
        ))}
      </div>
      <Item className="about-interests">
        <p className="about-interests-label">What I gravitate toward</p>
        <div className="chip-row">
          {ABOUT.interests.map((c) => (
            <span className="chip" key={c}>
              {c}
            </span>
          ))}
        </div>
      </Item>
    </Panel>
  );
}
