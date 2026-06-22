import { SECTIONS } from './data/journey.js';
import { useActivePanel } from './hooks/useActivePanel.js';
import { TopBar } from './components/TopBar.jsx';
import { SideNav } from './components/SideNav.jsx';
import { Hero } from './sections/Hero.jsx';
import { About } from './sections/About.jsx';
import { Work } from './sections/Work.jsx';
import { Projects } from './sections/Projects.jsx';
import { Skills } from './sections/Skills.jsx';
import { Experience } from './sections/Experience.jsx';
import { Contact } from './sections/Contact.jsx';

export default function App() {
  const { active, scrollToPanel } = useActivePanel(SECTIONS);

  return (
    <>
      <TopBar />
      <SideNav active={active} onJump={scrollToPanel} />
      <main>
        <Hero />
        <About />
        <Work />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
