import { PROJECTS } from '../data/journey.js';
import { PROFILE } from '../data/profile.js';
import { Panel, Item } from '../components/Panel.jsx';

export function Projects() {
  const { featured, more } = PROJECTS;
  const github = PROFILE.links.find((l) => l.id === 'github').url;

  return (
    <Panel id="projects" index={3} eyebrow="Projects" variant="scale-in" className="projects">
      <Item className="project">
        <div className="project-top">
          <h3>{featured.name}</h3>
          <span className="project-status">{featured.status}</span>
        </div>
        <p className="project-desc">{featured.description}</p>
        <ul className="project-points">
          {featured.points.map((p) => (
            <li key={p.slice(0, 18)}>{p}</li>
          ))}
        </ul>
        <div className="project-foot">
          <div className="chip-row">
            {featured.tech.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
          <a className="btn btn-primary" href={PROFILE.classmateUrl} target="_blank" rel="noreferrer">
            Visit ClassMate
          </a>
          <a className="btn" href={github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </Item>

      <Item className="project-more">
        {more.map((m) => (
          <div className="project-more-row" key={m.name}>
            <b>{m.name}</b>
            <span>{m.note}</span>
          </div>
        ))}
      </Item>
    </Panel>
  );
}
