import { AnimatePresence } from 'framer-motion';
import { useTabs } from './hooks/useTabs.js';
import { SECTIONS } from './data/journey.js';
import { TabsContext } from './context/TabsContext.js';
import { TopBar } from './components/TopBar.jsx';
import { Hero } from './sections/Hero.jsx';
import { About } from './sections/About.jsx';
import { Work } from './sections/Work.jsx';
import { Projects } from './sections/Projects.jsx';
import { Skills } from './sections/Skills.jsx';
import { Experience } from './sections/Experience.jsx';
import { Contact } from './sections/Contact.jsx';

const PANELS = [Hero, About, Work, Projects, Skills, Experience, Contact];

export default function App() {
  const { active, direction, goTo } = useTabs(SECTIONS.length);
  const ActivePanel = PANELS[active];

  return (
    <TabsContext.Provider value={goTo}>
      <TopBar active={active} onJump={goTo} />
      <main className="main" id="main-content">
        <AnimatePresence mode="wait" initial={false}>
          <ActivePanel key={active} direction={direction} />
        </AnimatePresence>
      </main>
    </TabsContext.Provider>
  );
}
