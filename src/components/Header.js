import React from 'react';

export default function Nav({ resumeData }) {
  return (
    <nav className="pf-nav">
      <span className="pf-nav-logo">SS</span>
      <ul className="pf-nav-links">
        <li><a href="#experience">Experience</a></li>
        <li><a href="#classmate">Classmate</a></li>
        <li><a href="#projects">Projects</a></li>
        <li>
          <a
            href="https://drive.google.com/file/d/1LQgXU79sZBFhgkZemdm7qFxEJFLuHHbT/view"
            target="_blank"
            rel="noopener noreferrer"
            className="pf-nav-cta"
          >
            View Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}
