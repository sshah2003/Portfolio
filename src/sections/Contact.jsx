import { CONTACT } from '../data/journey.js';
import { PROFILE } from '../data/profile.js';
import { Icon } from '../components/icons.jsx';
import { Panel, Item } from '../components/Panel.jsx';

export function Contact({ direction }) {
  const linkedin = PROFILE.links.find((l) => l.id === 'linkedin');
  const github = PROFILE.links.find((l) => l.id === 'github');
  const x = PROFILE.links.find((l) => l.id === 'x');

  return (
    <Panel id="contact" index={6} eyebrow="Contact" direction={direction} className="contact">
      <Item className="contact-heading" as="h2">
        Let's build something together.
      </Item>

      <Item as="p" className="lead">
        {CONTACT.copy}
      </Item>

      <Item className="actions">
        <a className="btn btn-primary" href={`mailto:${PROFILE.email}`}>
          {Icon.email} Email me
        </a>
        <a className="btn" href={linkedin.url} target="_blank" rel="noreferrer">
          {Icon.linkedin} LinkedIn
        </a>
        <a className="btn" href={github.url} target="_blank" rel="noreferrer">
          {Icon.github} GitHub
        </a>
        <a className="btn" href={PROFILE.resumeUrl} download="Sohil-Shah-Resume.pdf">
          Résumé
        </a>
      </Item>

      <Item className="contact-footer">
        <span>{PROFILE.email}</span>
        <span>
          Washington, DC ·{' '}
          <a href={x.url} target="_blank" rel="noreferrer">
            @TheSohilShah
          </a>
        </span>
      </Item>
    </Panel>
  );
}
