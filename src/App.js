import React from 'react';
import { site } from './content';
import SplitLock from './components/SplitLock';
import './concepts.css';

export default function App() {
  return (
    <div className="app concept-split">
      <nav className="topbar">
        <span className="topbar-logo">{site.initials}</span>
        <span className="topbar-title">{site.role}</span>
        <a className="topbar-cta" href={site.resume} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </nav>
      <SplitLock />
    </div>
  );
}
