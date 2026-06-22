import { HERO } from '../data/journey.js';
import { PROFILE } from '../data/profile.js';
import { Panel, Item } from '../components/Panel.jsx';

export function Hero() {
  return (
    <Panel id="intro" index={0} variant="fade-up" className="hero">
      <Item className="hero-available" as="p">
        <i aria-hidden="true" /> Available for new work
      </Item>
      <Item className="hero-name" as="h1">
        Sohil Shah
      </Item>
      <Item className="hero-role" as="p">
        <b>iOS Engineer</b> at {PROFILE.employer}
      </Item>
      <Item className="hero-tagline" as="p">
        {HERO.tagline}
      </Item>
      <Item className="actions">
        <a className="btn btn-primary" href="#work">
          View my work
        </a>
        <a className="btn" href="#contact">
          Get in touch
        </a>
      </Item>
    </Panel>
  );
}
