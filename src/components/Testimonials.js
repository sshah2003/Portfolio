import React from 'react';

function ClassmateIcon() {
  return (
    <div className="pf-classmate-icon">
      <div className="pf-classmate-icon-pill" />
      <span className="pf-classmate-icon-letter">C</span>
    </div>
  );
}

export default function ClassmateSection() {
  return (
    <section id="classmate" className="pf-classmate">
      <div className="pf-classmate-inner">
        <div className="pf-classmate-left">
          <ClassmateIcon />
          <span className="pf-classmate-app-label">classmate.work</span>
        </div>

        <div className="pf-classmate-content">
          <div className="pf-classmate-badge">
            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
              <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z" />
            </svg>
            Featured Project
          </div>

          <h2 className="pf-classmate-title">Classmate</h2>

          <p className="pf-classmate-tagline">
            The social app built for students — connecting classmates, study groups, and campus life.
          </p>

          <p className="pf-classmate-desc">
            Classmate is an iOS app I built from the ground up that reimagines how students connect on campus. Find classmates in your courses, form study groups, share notes, and stay plugged into campus life — all in one beautifully designed app.
          </p>

          <a
            href="https://classmate.work"
            target="_blank"
            rel="noopener noreferrer"
            className="pf-classmate-link"
          >
            Visit classmate.work
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
