import { PROFILE } from '../data/profile.js';
import { Icon } from './icons.jsx';
import { TabBar } from './TabBar.jsx';

export function TopBar({ active, onJump }) {
  return (
    <header className="topbar">
      <a className="topbar-name" href="#" onClick={(e) => { e.preventDefault(); onJump(0); }}>
        Sohil Shah
      </a>

      <TabBar active={active} onJump={onJump} />

      <div className="topbar-right">
        <nav className="topbar-social" aria-label="Social links">
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
        <a className="topbar-resume" href={PROFILE.resumeUrl} download="Sohil-Shah-Resume.pdf">
          Résumé
        </a>
      </div>
    </header>
  );
}
