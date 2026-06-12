import { PROFILE } from '../data/profile.js';
import { Icon } from './icons.jsx';

export function TopBar() {
  return (
    <header className="topbar">
      <a className="topbar-brand" href="#union-station">
        <span className="topbar-bullet">iOS</span>
        <span className="topbar-name">Sohil Shah</span>
      </a>
      <div className="topbar-right">
        <nav className="topbar-links" aria-label="Social links">
          {PROFILE.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target={link.id === 'email' ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={link.label}
              title={link.label}
            >
              {Icon[link.id]}
            </a>
          ))}
        </nav>
        <a className="btn btn-resume" href={PROFILE.resumeUrl} download="Sohil-Shah-Resume.pdf">
          Résumé
        </a>
      </div>
    </header>
  );
}
