import { HERO } from '../data/journey.js';
import { PROFILE } from '../data/profile.js';
import { Panel, Item } from '../components/Panel.jsx';
import { useGoTo } from '../context/TabsContext.js';

export function Hero({ direction }) {
  const goTo = useGoTo();

  return (
    <Panel id="intro" index={0} direction={direction} className="hero">
      <Item className="hero-available" as="p">
        <i aria-hidden="true" /> Washington, DC · Available for new opportunities
      </Item>

      <Item className="hero-name-wrap">
        <h1 className="hero-name">Sohil Shah</h1>
      </Item>

      <Item className="hero-role" as="p">
        iOS Engineer at <b>{PROFILE.employer}</b>
      </Item>

      <Item className="hero-tagline" as="p">
        {HERO.tagline}
      </Item>

      <Item className="actions">
        <button className="btn btn-primary" onClick={() => goTo(2)}>
          View my work
        </button>
        <button className="btn" onClick={() => goTo(6)}>
          Get in touch
        </button>
      </Item>

      <Item className="hero-detail" as="p">
        <span>iOS</span>
        <span aria-hidden="true">·</span>
        <span>Swift · SwiftUI · UIKit</span>
        <span aria-hidden="true">·</span>
        <span>Shipping since 2024</span>
      </Item>
    </Panel>
  );
}
