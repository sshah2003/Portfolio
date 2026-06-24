import React from 'react';

const projects = [
  {
    icon: '🗺️',
    name: 'FireLine',
    description: 'North American fire mapping system combining 1.88M data logs with real-time photos and ML to display fire locations, sizes, and spread predictions.',
    url: 'https://github.com/krizh-p/Fireline',
    tags: ['Python', 'ML', 'React'],
  },
  {
    icon: '📱',
    name: 'Tasks App',
    description: 'iOS app for creating and managing to-do lists with a calendar view that stays in sync — built with SwiftUI and Core Data.',
    url: 'https://github.com/sshah2003/Tasks-App',
    tags: ['Swift', 'SwiftUI', 'Core Data'],
  },
  {
    icon: '🟩',
    name: 'Wordle Clone',
    description: 'Faithful recreation of the viral word game Wordle, built natively for iOS using Swift via the CodePath certificate program.',
    url: 'https://github.com/sshah2003/Wordle',
    tags: ['Swift', 'UIKit'],
  },
  {
    icon: '👾',
    name: 'AI Pac-Man',
    description: 'Autonomous Pac-Man agent using search algorithms to solve mazes of varying sizes and configurations — from BFS to A*.',
    url: 'https://github.com/sshah2003/HW1',
    tags: ['Python', 'AI', 'Search'],
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="pf-section">
      <p className="pf-section-label">Things I've built</p>
      <h2 className="pf-section-title">Projects</h2>

      <div className="pf-projects-grid">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pf-project-card"
          >
            <div className="pf-project-icon">{project.icon}</div>
            <h3 className="pf-project-name">{project.name}</h3>
            <p className="pf-project-desc">{project.description}</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#52525b',
                    background: '#18181b',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="pf-project-link">
              View on GitHub <ArrowIcon />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
