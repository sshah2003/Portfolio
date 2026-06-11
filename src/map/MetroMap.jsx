import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { LINES, RIVER_PATH, TRACK_WAYPOINTS, VIEWBOX } from '../data/lines.js';
import { STATIONS, TOUR_ORDER, stationById } from '../data/stations.js';
import { usePortfolio } from '../state/PortfolioContext.jsx';
import { buildRoutePath } from './geometry.js';
import { LinePath } from './LinePath.jsx';
import { StationMarker } from './StationMarker.jsx';
import { Train } from './Train.jsx';
import { useCamera } from './useCamera.js';
import { useTrack } from './useTrack.js';
import { useTrainAnimation } from './useTrainAnimation.js';

const TRACK_D = buildRoutePath(TRACK_WAYPOINTS, 24);

export function MetroMap() {
  const { state, dispatch, selectStation, cameraApiRef } = usePortfolio();
  const reducedMotion = useReducedMotion();
  const svgRef = useRef(null);

  const camera = useCamera({
    svgRef,
    reducedMotion,
    onUserGesture: () => dispatch({ type: 'USER_PANNED' }),
  });

  const { trackRef, track } = useTrack(STATIONS, TOUR_ORDER);

  const { x, y, angle } = useTrainAnimation({
    track,
    currentStationId: state.currentStationId,
    selectionNonce: state.selectionNonce,
    onArrive: () => dispatch({ type: 'TRAIN_ARRIVED' }),
    reducedMotion,
  });

  // Expose the camera to HUD/controls living outside the SVG.
  useEffect(() => {
    cameraApiRef.current = {
      focusStation: camera.focusStation,
      resetView: camera.resetView,
    };
    return () => {
      cameraApiRef.current = null;
    };
  }, [camera.focusStation, camera.resetView, cameraApiRef]);

  // Camera follows every selection; the very first render only snaps into
  // place when the page deep-links straight to a station.
  const firstRunRef = useRef(true);
  useEffect(() => {
    const station = stationById(state.currentStationId);
    if (firstRunRef.current) {
      firstRunRef.current = false;
      if (state.viewMode === 'focused') camera.focusStation(station, true);
      return;
    }
    camera.focusStation(station);
  }, [state.currentStationId, state.selectionNonce]); // eslint-disable-line react-hooks/exhaustive-deps

  // framer-motion ignores raw style.transform on SVG elements, so the
  // camera transform is written to the attribute directly per frame.
  const cameraGRef = useRef(null);
  useEffect(() => {
    const g = cameraGRef.current;
    if (!g) return undefined;
    const apply = () =>
      g.setAttribute(
        'transform',
        `translate(${camera.tx.get()} ${camera.ty.get()}) scale(${camera.scale.get()})`
      );
    const subs = [
      camera.tx.on('change', apply),
      camera.ty.on('change', apply),
      camera.scale.on('change', apply),
    ];
    apply();
    return () => subs.forEach((unsub) => unsub());
  }, [camera.tx, camera.ty, camera.scale]);

  return (
    <div className="map-stage">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
        preserveAspectRatio="xMidYMid meet"
        aria-label="Interactive metro map of Sohil Shah's work"
        {...camera.handlers}
      >
        <g ref={cameraGRef}>
          {/* Potomac-ish river, decorative */}
          <path d={RIVER_PATH} fill="none" stroke="var(--river)" strokeWidth={90} strokeLinecap="round" />

          {/* Hidden master track the train rides */}
          <path ref={trackRef} d={TRACK_D} fill="none" stroke="none" />

          {LINES.map((line, i) => (
            <LinePath key={line.id} line={line} index={i} reducedMotion={reducedMotion} />
          ))}

          {STATIONS.map((station, i) => (
            <StationMarker
              key={station.id}
              station={station}
              index={i}
              isCurrent={station.id === state.currentStationId}
              isVisited={state.visitedIds.has(station.id)}
              reducedMotion={reducedMotion}
              onSelect={selectStation}
            />
          ))}

          {track && (
            <Train x={x} y={y} angle={angle} isMoving={state.trainState === 'moving'} reducedMotion={reducedMotion} />
          )}
        </g>
      </svg>
    </div>
  );
}
