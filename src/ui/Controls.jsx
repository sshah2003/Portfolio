import { TOUR_ORDER, stationById } from '../data/stations.js';
import { usePortfolio } from '../state/PortfolioContext.jsx';
import './Controls.css';

export function Controls() {
  const { state, tourIndex, nextStation, prevStation, zoomOut } = usePortfolio();
  const prev = tourIndex > 0 ? stationById(TOUR_ORDER[tourIndex - 1]) : null;
  const next = tourIndex < TOUR_ORDER.length - 1 ? stationById(TOUR_ORDER[tourIndex + 1]) : null;

  return (
    <div className="controls">
      <button
        className="ctrl ctrl-arrow"
        onClick={prevStation}
        disabled={!prev}
        title={prev ? `Previous: ${prev.name}` : 'Start of the line'}
        aria-label={prev ? `Previous station: ${prev.name}` : 'Start of the line'}
      >
        ◀
      </button>

      <button
        className="ctrl ctrl-map signage"
        onClick={zoomOut}
        disabled={state.viewMode === 'overview'}
        title="Zoom out to the full map (Esc)"
      >
        Full map
      </button>

      <button
        className="ctrl ctrl-arrow"
        onClick={nextStation}
        disabled={!next}
        title={next ? `Next: ${next.name}` : 'End of the line'}
        aria-label={next ? `Next station: ${next.name}` : 'End of the line'}
      >
        ▶
      </button>
    </div>
  );
}
