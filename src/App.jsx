import { useEffect, useState } from 'react';
import { STATIONS } from './data/journey.js';
import { useJourney } from './hooks/useJourney.js';
import { TopBar } from './components/TopBar.jsx';
import { MetroRail, MobileProgress, NowAt } from './components/MetroRail.jsx';
import { CityMap } from './components/CityMap.jsx';
import { TransitionProvider } from './components/RouteTransition.jsx';
import { CustomCursor } from './components/MagneticButton.jsx';
import { BasketballEasterEgg, useBasketballKey } from './components/BasketballEasterEgg.jsx';
import { Hero } from './sections/Hero.jsx';
import { About } from './sections/About.jsx';
import { Work } from './sections/Work.jsx';
import { Projects } from './sections/Projects.jsx';
import { Skills } from './sections/Skills.jsx';
import { Startup } from './sections/Startup.jsx';
import { Teaching } from './sections/Teaching.jsx';
import { Timeline } from './sections/Timeline.jsx';
import { Contact } from './sections/Contact.jsx';

export default function App() {
  const { progress, active, registerSection } = useJourney(STATIONS.length);
  const [mapOpen, setMapOpen] = useState(false);
  const [ballOpen, setBallOpen] = useState(false);

  useBasketballKey(setBallOpen);

  // "M" toggles the city map (ignored while typing).
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey) return;
      if (e.key === 'm' || e.key === 'M') setMapOpen((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <TransitionProvider>
      <CustomCursor />
      <TopBar onOpenMap={() => setMapOpen(true)} />
      <MobileProgress progress={progress} active={active} />
      <MetroRail progress={progress} active={active} />
      <NowAt active={active} />
      <main>
        <Hero register={registerSection} onViewRoute={() => setMapOpen(true)} />
        <About register={registerSection} />
        <Work register={registerSection} />
        <Projects register={registerSection} />
        <Skills register={registerSection} />
        <Startup register={registerSection} />
        <Teaching register={registerSection} />
        <Timeline register={registerSection} />
        <Contact register={registerSection} onPlayBall={() => setBallOpen(true)} />
      </main>
      <CityMap open={mapOpen} onClose={() => setMapOpen(false)} />
      <BasketballEasterEgg open={ballOpen} onClose={() => setBallOpen(false)} />
    </TransitionProvider>
  );
}
