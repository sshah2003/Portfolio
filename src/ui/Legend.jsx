import { LINES } from '../data/lines.js';
import './Legend.css';

export function Legend() {
  return (
    <div className="legend" aria-hidden="true">
      {LINES.map((line) => (
        <div key={line.id} className="legend-row">
          <span className="legend-chip" style={{ background: line.hex }} />
          <span className="legend-name signage">{line.name}</span>
          <span className="legend-theme">{line.theme}</span>
        </div>
      ))}
    </div>
  );
}
