import { createContext, useContext, useMemo, useReducer, useRef } from 'react';
import { TOUR_ORDER } from '../data/stations.js';

const PortfolioContext = createContext(null);

export function getStationIdFromHash() {
  const m = window.location.hash.match(/^#\/station\/([\w-]+)/);
  return m && TOUR_ORDER.includes(m[1]) ? m[1] : null;
}

function createInitialState() {
  const hashId = getStationIdFromHash();
  return {
    currentStationId: hashId ?? 'welcome',
    trainState: 'idle', // 'idle' | 'moving'
    viewMode: hashId ? 'focused' : 'overview', // 'overview' | 'focused'
    visitedIds: new Set(hashId ? [hashId] : []),
    // Bumped on every SELECT_STATION so re-selecting the current station
    // still re-triggers the camera/train/panel effects.
    selectionNonce: 0,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_STATION': {
      if (!TOUR_ORDER.includes(action.id)) return state;
      return {
        ...state,
        currentStationId: action.id,
        trainState: 'moving',
        selectionNonce: state.selectionNonce + 1,
      };
    }
    case 'TRAIN_ARRIVED': {
      const visitedIds = new Set(state.visitedIds);
      visitedIds.add(state.currentStationId);
      return { ...state, trainState: 'idle', viewMode: 'focused', visitedIds };
    }
    case 'ZOOM_OUT':
      return { ...state, viewMode: 'overview' };
    case 'USER_PANNED':
      return state.viewMode === 'focused' ? { ...state, viewMode: 'overview' } : state;
    default:
      return state;
  }
}

export function PortfolioProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  // Populated by MetroMap with { focusStation, resetView } so HUD/controls
  // outside the SVG can drive the camera.
  const cameraApiRef = useRef(null);

  const value = useMemo(() => {
    const index = TOUR_ORDER.indexOf(state.currentStationId);
    const selectStation = (id) => dispatch({ type: 'SELECT_STATION', id });
    return {
      state,
      dispatch,
      cameraApiRef,
      tourIndex: index,
      selectStation,
      nextStation: () => index < TOUR_ORDER.length - 1 && selectStation(TOUR_ORDER[index + 1]),
      prevStation: () => index > 0 && selectStation(TOUR_ORDER[index - 1]),
      zoomOut: () => {
        cameraApiRef.current?.resetView();
        dispatch({ type: 'ZOOM_OUT' });
      },
    };
  }, [state]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
