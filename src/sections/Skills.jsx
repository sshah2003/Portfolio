import { SKILLS } from '../data/journey.js';
import { Panel, Item } from '../components/Panel.jsx';

export function Skills() {
  return (
    <Panel id="skills" index={4} eyebrow="Skills" variant="fade-up" className="skills">
      <Item>
        <h2 className="title">The tools I reach for.</h2>
        <p className="lead">A working set, not a keyword dump — every group is one I build with regularly.</p>
      </Item>

      <div className="skills-grid">
        {SKILLS.map((group) => (
          <Item className="skill-group" key={group.name}>
            <h3>{group.name}</h3>
            <div className="chip-row">
              {group.items.map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </Item>
        ))}
      </div>
    </Panel>
  );
}
