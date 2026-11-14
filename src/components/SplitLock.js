import React, { useEffect, useRef, useState } from 'react';
import { entries, experienceEntries, projectEntries, site } from '../content';
import EntryView from './EntryView';

const intro = entries.find((e) => e.kind === 'intro');
const education = entries.find((e) => e.kind === 'education');
const stack = entries.find((e) => e.kind === 'stack');
const contact = entries.find((e) => e.kind === 'contact');

function SplitChapter({ kicker, items }) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const nodes = refs.current.filter(Boolean);
    if (!nodes.length) return undefined;
    const io = new IntersectionObserver(
      (records) => {
        records.forEach((r) => {
          if (!r.isIntersecting) return;
          const i = Number(r.target.getAttribute('data-i'));
          if (!Number.isNaN(i)) setActive(i);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [items.length]);

  const current = items[active] || items[0];

  return (
    <section className="sl-chapter">
      <div className="sl-left">
        <p className="sl-kicker">{kicker}</p>
        <div className="sl-title-stack" aria-hidden="true">
          {items.map((item, i) => (
            <h2 key={item.id} className={`sl-title ${i === active ? 'is-on' : ''}`}>
              {item.title}
            </h2>
          ))}
        </div>
        <p className="sl-sub">{current.role || current.line}</p>
        <p className="sl-period">{current.period || current.section}</p>
        <ol className="sl-dots">
          {items.map((item, i) => (
            <li key={item.id} className={i === active ? 'is-on' : ''}>
              {item.kicker} {item.title}
            </li>
          ))}
        </ol>
      </div>
      <div className="sl-right">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="sl-panel"
            id={`section-${item.id}`}
            data-ticker-index={entries.findIndex((entry) => entry.id === item.id)}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
          >
            <EntryView entry={item} hideHeader />
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionTicker({ active, onSelect }) {
  return (
    <nav className="sl-ticker" aria-label="Portfolio sections">
      {entries.map((entry, index) => {
        const offset = index - active;
        const distance = Math.abs(offset);
        return (
          <button
            key={entry.id}
            type="button"
            className={`sl-ticker-item ${index === active ? 'is-active' : ''}`}
            aria-label={`Go to ${entry.title}`}
            aria-current={index === active ? 'location' : undefined}
            onClick={() => onSelect(entry, index)}
            style={{
              '--wheel-y': `${offset * 34}px`,
              '--wheel-x': `${-Math.min(distance, 5) * 3}px`,
              '--wheel-scale': Math.max(0.78, 1 - distance * 0.055),
              opacity: Math.max(0.32, 1 - distance * 0.13),
            }}
          >
            <span className="sl-ticker-label">{entry.title}</span>
            <span className="sl-ticker-mark" aria-hidden="true" />
          </button>
        );
      })}
    </nav>
  );
}

export default function SplitLock() {
  const rootRef = useRef(null);
  const [tickerActive, setTickerActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const targets = Array.from(root.querySelectorAll('[data-ticker-index]'));
    const observer = new IntersectionObserver(
      (records) => {
        records.forEach((record) => {
          if (!record.isIntersecting) return;
          const next = Number(record.target.getAttribute('data-ticker-index'));
          if (!Number.isNaN(next)) setTickerActive(next);
        });
      },
      { rootMargin: '-46% 0px -46% 0px', threshold: 0 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const selectSection = (entry, index) => {
    const target = document.getElementById(`section-${entry.id}`);
    if (!target) return;
    setTickerActive(index);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <div className="sl" ref={rootRef}>
      <SectionTicker active={tickerActive} onSelect={selectSection} />
      <header className="sl-hero" id="section-intro" data-ticker-index="0">
        <p className="ix-eyebrow">Sohil Shah</p>
        <h1>{intro.title}</h1>
        <p className="sl-hero-body">{intro.body}</p>
        <div className="ev-actions">
          <a className="ev-link solid" href={site.resume} target="_blank" rel="noopener noreferrer">
            View resume
          </a>
          <a className="ev-link" href={site.links.email}>
            Email
          </a>
        </div>
      </header>
      <SplitChapter kicker="Experience" items={experienceEntries} />
      <SplitChapter kicker="Education" items={[education]} />
      <SplitChapter kicker="Projects" items={projectEntries} />
      <section className="sl-end">
        <div
          className="sl-end-entry"
          id={`section-${stack.id}`}
          data-ticker-index={entries.findIndex((entry) => entry.id === stack.id)}
        >
          <EntryView entry={stack} />
        </div>
        <div
          className="sl-end-entry"
          id={`section-${contact.id}`}
          data-ticker-index={entries.findIndex((entry) => entry.id === contact.id)}
        >
          <EntryView entry={contact} />
        </div>
      </section>
    </div>
  );
}
