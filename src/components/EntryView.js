import React from 'react';
import { site } from '../content';

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default function EntryView({ entry, hideHeader }) {
  if (!entry) return null;

  return (
    <article className="ev">
      {hideHeader ? null : (
        <>
          <p className="ev-kicker">
            <span>{entry.kicker}</span>
            {entry.section}
          </p>
          <h2 className="ev-title">{entry.title}</h2>
          {entry.role ? <p className="ev-role">{entry.role}</p> : null}
          {entry.period ? <p className="ev-period">{entry.period}</p> : null}
          {entry.line && !entry.role ? <p className="ev-line">{entry.line}</p> : null}
        </>
      )}
      {entry.body ? <p className="ev-body">{entry.body}</p> : null}

      {entry.preview && entry.href ? (
        <a
          className="ev-project-preview"
          href={entry.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${entry.title} website`}
        >
          <span className="ev-preview-chrome">
            <span className="ev-preview-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="ev-preview-url">classmate.work</span>
            <span className="ev-preview-arrow" aria-hidden="true">↗</span>
          </span>
          <span className="ev-preview-body">
            <span className="ev-preview-wordmark">ClassMate</span>
            <span className="ev-preview-copy">The campus marketplace, built for students.</span>
          </span>
        </a>
      ) : null}

      {entry.facts ? (
        <dl className="ev-facts">
          {entry.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {entry.metrics ? (
        <div className="ev-metrics">
          {entry.metrics.map((m) => (
            <div key={m.label} className="ev-metric">
              <div className="ev-metric-value">{m.value}</div>
              <div className="ev-metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      ) : null}

      {entry.bullets ? (
        <ul className="ev-bullets">
          {entry.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}

      {entry.tags ? (
        <div className="ev-tags">
          {entry.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      ) : null}

      {entry.skillGroups ? (
        <dl className="ev-skill-groups">
          {entry.skillGroups.map((group) => (
            <div key={group.label}>
              <dt>{group.label}</dt>
              <dd>{group.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {entry.href ? (
        <a className="ev-link" href={entry.href} target="_blank" rel="noopener noreferrer">
          {entry.hrefLabel || 'Open'} <Arrow />
        </a>
      ) : null}

      {entry.kind === 'intro' ? (
        <div className="ev-actions">
          <a className="ev-link solid" href={site.resume} target="_blank" rel="noopener noreferrer">
            View resume <Arrow />
          </a>
          <a className="ev-link" href={site.links.email}>
            Email <Arrow />
          </a>
        </div>
      ) : null}

      {entry.kind === 'contact' ? (
        <div className="ev-actions">
          <a className="ev-link solid" href={site.links.email}>
            {site.email} <Arrow />
          </a>
          <a className="ev-link" href={site.resume} target="_blank" rel="noopener noreferrer">
            Resume <Arrow />
          </a>
          <a className="ev-link" href={site.links.github} target="_blank" rel="noopener noreferrer">
            GitHub <Arrow />
          </a>
          <a className="ev-link" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <Arrow />
          </a>
        </div>
      ) : null}
    </article>
  );
}
