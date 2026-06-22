import { createContext, useContext } from 'react';

// Context exposes goToSection(id): plays a cinematic curtain wipe (see
// RouteTransition.jsx) and then scrolls to the target section. Components
// across the app (rail dots, next-stop links, city map, hero CTA) call this
// so every in-page jump shares the same GTA-style transition.
export const SectionTransitionContext = createContext({
  goToSection: (id) => {
    const el = typeof document !== 'undefined' && document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  },
});

export function useSectionTransition() {
  return useContext(SectionTransitionContext);
}
