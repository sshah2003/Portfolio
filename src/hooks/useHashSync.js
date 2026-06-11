import { useEffect, useRef } from 'react';
import { getStationIdFromHash } from '../state/PortfolioContext.jsx';

// Two-way sync between the URL hash (#/station/<id>) and app state.
// replaceState keeps browsing history clean while riding around.
export function useHashSync(state, dispatch) {
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const hash =
      state.viewMode === 'focused' ? `#/station/${state.currentStationId}` : '#/';
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
  }, [state.currentStationId, state.viewMode]);

  useEffect(() => {
    const onHashChange = () => {
      const id = getStationIdFromHash();
      if (id && id !== stateRef.current.currentStationId) {
        dispatch({ type: 'SELECT_STATION', id });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [dispatch]);
}
