import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MetroMap } from './map/MetroMap.jsx';
import { stationById } from './data/stations.js';
import { useHashSync } from './hooks/useHashSync.js';
import { PortfolioProvider, usePortfolio } from './state/PortfolioContext.jsx';
import { Controls } from './ui/Controls.jsx';
import { HUD } from './ui/HUD.jsx';
import { Legend } from './ui/Legend.jsx';
import { StationPanel } from './ui/StationPanel.jsx';

function Shell() {
  const { state, dispatch, nextStation, prevStation, zoomOut } = usePortfolio();
  useHashSync(state, dispatch);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextStation();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevStation();
      } else if (e.key === 'Escape') {
        zoomOut();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextStation, prevStation, zoomOut]);

  const showPanel = state.viewMode === 'focused' && state.trainState === 'idle';
  const showHint = state.visitedIds.size <= 1 && state.viewMode === 'overview';
  const station = stationById(state.currentStationId);

  return (
    <div className="app">
      <MetroMap />
      <HUD />
      <Legend />
      <Controls />
      <AnimatePresence>
        {showPanel && (
          <StationPanel key={station.id} station={station} onClose={zoomOut} />
        )}
      </AnimatePresence>
      {showHint && (
        <div className="hint-toast">
          Tap a station to ride the train — or use <strong>←</strong> <strong>→</strong> keys
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <Shell />
    </PortfolioProvider>
  );
}
