import { SECTIONS } from '../data/journey.js';

// Minimal fixed dot nav — one dot per panel, active dot expands, label on hover.
export function SideNav({ active, onJump }) {
  return (
    <nav className="sidenav" aria-label="Section navigation">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          className={`sidenav-dot ${i === active ? 'is-active' : ''}`}
          onClick={() => onJump(i)}
          aria-label={`Go to ${s.label}`}
          aria-current={i === active ? 'true' : undefined}
        >
          <span className="sidenav-label">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}
