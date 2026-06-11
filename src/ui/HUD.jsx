import { PROFILE } from '../data/profile.js';
import { TOUR_ORDER } from '../data/stations.js';
import { usePortfolio } from '../state/PortfolioContext.jsx';
import './HUD.css';

const ICONS = {
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8.2h4.6V23H.2V8.2zM8.2 8.2h4.4v2h.06c.61-1.16 2.1-2.38 4.33-2.38 4.63 0 5.48 3.05 5.48 7.02V23h-4.6v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V23H8.2V8.2z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.11-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26L22.83 21.75h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.17 2.25h6.83l4.72 6.24 5.52-6.24zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm10 8.5L3.5 6v12h17V6L12 12.5zM4.9 6l7.1 5.4L19.1 6H4.9z" />
    </svg>
  ),
};

export function HUD() {
  const { state } = usePortfolio();

  return (
    <header className="hud">
      <div className="hud-left">
        <div className="hud-roundel" aria-hidden="true">
          M
        </div>
        <div className="hud-title">
          <span className="hud-name signage">{PROFILE.name}</span>
          <span className="hud-sub">
            {PROFILE.title} · {PROFILE.employer} · {PROFILE.location}
          </span>
        </div>
      </div>

      <div className="hud-right">
        <span className="hud-progress signage" title="Stations visited">
          {state.visitedIds.size}/{TOUR_ORDER.length} STATIONS
        </span>
        <nav className="hud-links" aria-label="Social links">
          {PROFILE.links.map((link) => (
            <a
              key={link.id}
              className="hud-icon"
              href={link.url}
              target={link.id === 'email' ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={link.label}
              title={link.label}
            >
              {ICONS[link.id]}
            </a>
          ))}
        </nav>
        <a className="hud-resume" href={PROFILE.resumeUrl} download="Sohil-Shah-Resume.pdf">
          <span className="hud-resume-chip" aria-hidden="true" />
          Résumé
        </a>
      </div>
    </header>
  );
}
