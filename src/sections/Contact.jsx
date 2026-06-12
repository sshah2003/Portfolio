import { CONTACT } from '../data/journey.js';
import { PROFILE } from '../data/profile.js';
import { Icon } from '../components/icons.jsx';
import { Reveal, Station } from '../components/Station.jsx';

export function Contact({ register }) {
  const linkedin = PROFILE.links.find((l) => l.id === 'linkedin');
  const github = PROFILE.links.find((l) => l.id === 'github');
  const x = PROFILE.links.find((l) => l.id === 'x');

  return (
    <Station index={8} register={register} className="contact">
      <Reveal delay={0.05}>
        <p className="contact-copy">{CONTACT.copy}</p>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="contact-actions">
          <a className="btn btn-primary btn-lg" href={`mailto:${PROFILE.email}`}>
            {Icon.email} Email me
          </a>
          <a className="btn btn-ghost btn-lg" href={linkedin.url} target="_blank" rel="noreferrer">
            {Icon.linkedin} LinkedIn
          </a>
          <a className="btn btn-ghost btn-lg" href={github.url} target="_blank" rel="noreferrer">
            {Icon.github} GitHub
          </a>
          <a className="btn btn-ghost btn-lg" href={PROFILE.resumeUrl} download="Sohil-Shah-Resume.pdf">
            Résumé
          </a>
        </div>
      </Reveal>
      <Reveal delay={0.25}>
        <footer className="footer">
          <p className="footer-final">
            <span aria-hidden="true">✈</span> Final stop — thanks for riding.
          </p>
          <p className="footer-meta">
            {PROFILE.email} · Washington, DC ·{' '}
            <a href={x.url} target="_blank" rel="noreferrer">
              @TheSohilShah
            </a>
          </p>
        </footer>
      </Reveal>
    </Station>
  );
}
