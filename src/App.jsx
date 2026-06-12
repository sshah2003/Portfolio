import { useState } from 'react';
import { STATIONS } from './data/journey.js';
import { useJourney } from './hooks/useJourney.js';
import { TopBar } from './components/TopBar.jsx';
import { MetroRail, MobileProgress, NowAt } from './components/MetroRail.jsx';
import { RouteOverlay } from './components/RouteOverlay.jsx';
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
  const [routeOpen, setRouteOpen] = useState(false);

  return (
    <>
      <TopBar />
      <MobileProgress progress={progress} active={active} />
      <MetroRail progress={progress} active={active} />
      <NowAt active={active} />
      <main>
        <Hero register={registerSection} onViewRoute={() => setRouteOpen(true)} />
        <About register={registerSection} />
        <Work register={registerSection} />
        <Projects register={registerSection} />
        <Skills register={registerSection} />
        <Startup register={registerSection} />
        <Teaching register={registerSection} />
        <Timeline register={registerSection} />
        <Contact register={registerSection} />
      </main>
      <RouteOverlay open={routeOpen} onClose={() => setRouteOpen(false)} />
    </>
  );
}
