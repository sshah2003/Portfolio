import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LINES } from '../data/lines.js';
import './StationPanel.css';

const lineColor = (id) => LINES.find((l) => l.id === id)?.hex;

export function StationPanel({ station, onClose }) {
  const reducedMotion = useReducedMotion();
  const panelRef = useRef(null);
  const { content } = station;

  useEffect(() => {
    panelRef.current?.focus({ preventScroll: true });
  }, [station.id]);

  const mobile = window.matchMedia('(max-width: 760px)').matches;
  const hidden = reducedMotion
    ? { opacity: 0 }
    : mobile
      ? { opacity: 0, y: 60 }
      : { opacity: 0, x: 48 };

  return (
    <motion.aside
      ref={panelRef}
      className="panel"
      role="dialog"
      aria-label={`${station.name} details`}
      tabIndex={-1}
      initial={hidden}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={hidden}
      transition={{ duration: 0.38, ease: [0.3, 0, 0.2, 1] }}
    >
      <div className="panel-sign">
        <div className="panel-lines" aria-hidden="true">
          {station.lines.map((id) => (
            <span key={id} className="panel-line-bar" style={{ background: lineColor(id) }} />
          ))}
        </div>
        <div className="panel-sign-text">
          <span className="panel-kicker signage">{content.kicker}</span>
          <h2 className="panel-title">{content.title}</h2>
        </div>
        <button className="panel-close" onClick={onClose} aria-label="Close panel (Esc)">
          ✕
        </button>
      </div>

      <div className="panel-body">
        {content.subtitle && <p className="panel-subtitle">{content.subtitle}</p>}
        {content.period && <p className="panel-period signage">{content.period}</p>}

        {content.body?.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="panel-paragraph">
            {paragraph}
          </p>
        ))}

        {content.bullets && (
          <ul className="panel-bullets">
            {content.bullets.map((bullet) => (
              <li key={bullet.slice(0, 24)}>{bullet}</li>
            ))}
          </ul>
        )}

        {content.groups?.map((group) => (
          <div key={group.label} className="panel-group">
            <h3 className="panel-group-label signage">{group.label}</h3>
            <div className="panel-tags">
              {group.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}

        {content.tags && (
          <div className="panel-tags">
            {content.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        )}

        {content.links && (
          <div className="panel-links">
            {content.links.map((link) => (
              <a
                key={link.label}
                className={`panel-link ${link.primary ? 'is-primary' : ''}`}
                href={link.url}
                target={link.url.startsWith('mailto:') || link.download ? undefined : '_blank'}
                rel="noreferrer"
                download={link.download ? 'Sohil-Shah-Resume.pdf' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.aside>
  );
}
