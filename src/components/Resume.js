import React from 'react';

function WashingtonPostPhone() {
  return (
    <div className="pf-iphone-wrap">
      <div className="pf-iphone">
        <div className="pf-iphone-notch" />
        <div className="pf-iphone-screen">
          <div className="pf-wp-header">
            <div className="pf-wp-wordmark">
              The Washington Post
              <span>Democracy Dies in Darkness</span>
            </div>
          </div>
          <div className="pf-wp-content">
            <div className="pf-wp-article">
              <div className="pf-wp-section-tag">Politics</div>
              <div className="pf-wp-headline">
                Breaking: New legislation passes with bipartisan support
              </div>
              <div className="pf-wp-byline">By Staff Reporter · 2h ago</div>
            </div>
            <div className="pf-wp-article">
              <div className="pf-wp-section-tag">Technology</div>
              <div className="pf-wp-headline">
                Ad targeting systems reshape digital newsrooms nationwide
              </div>
              <div className="pf-wp-byline">By Tech Desk · 4h ago</div>
            </div>
            <div className="pf-wp-article">
              <div className="pf-wp-section-tag">Business</div>
              <div className="pf-wp-headline">
                Markets close higher as earnings season beats expectations
              </div>
              <div className="pf-wp-byline">By Business Desk · 6h ago</div>
            </div>
            <div className="pf-wp-ad-bar">
              <div className="pf-wp-ad-dot" />
              <div className="pf-wp-ad-label">Ad DevTools</div>
              <div className="pf-wp-ad-text">Targeting active · 5 depts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GeorgeMasonPhone() {
  return (
    <div className="pf-iphone-wrap">
      <div className="pf-iphone">
        <div className="pf-iphone-notch" />
        <div className="pf-iphone-screen">
          <div className="pf-gmu-header">
            <div className="pf-gmu-wordmark">
              George Mason University
              <span>CS 395 · iOS Development</span>
            </div>
          </div>
          <div className="pf-gmu-content">
            <div className="pf-gmu-course-card">
              <div className="pf-gmu-course-title">Week 8: SwiftUI Navigation</div>
              <div className="pf-gmu-course-sub">Building multi-screen apps with NavigationStack</div>
              <div className="pf-swift-pill">
                <div className="pf-swift-label">Swift</div>
              </div>
            </div>
            <div className="pf-gmu-stat-row">
              <div className="pf-gmu-stat">
                <div className="pf-gmu-stat-num">20+</div>
                <div className="pf-gmu-stat-label">Students</div>
              </div>
              <div className="pf-gmu-stat">
                <div className="pf-gmu-stat-num">95%</div>
                <div className="pf-gmu-stat-label">Satisfaction</div>
              </div>
              <div className="pf-gmu-stat">
                <div className="pf-gmu-stat-num">A</div>
                <div className="pf-gmu-stat-label">Avg Grade</div>
              </div>
            </div>
            <div className="pf-gmu-course-card">
              <div className="pf-gmu-course-title">Upcoming: API Integration Lab</div>
              <div className="pf-gmu-course-sub">URLSession, async/await, JSON decoding</div>
            </div>
            <div className="pf-gmu-course-card">
              <div className="pf-gmu-course-title">UIKit · SwiftUI · APIs</div>
              <div className="pf-gmu-course-sub">Full iOS stack curriculum</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <p className="pf-section-label">Where I've worked</p>
      <h2 className="pf-section-title">Experience</h2>

      {/* Washington Post */}
      <div className="pf-exp-item featured">
        <div className="pf-exp-content">
          <div className="pf-exp-tag">Internship · 2024</div>
          <h3 className="pf-exp-company">The Washington Post</h3>
          <p className="pf-exp-role">Software Engineer Intern — Ad Engineering</p>
          <p className="pf-exp-period">Jun 2024 – Aug 2024</p>
          <ul className="pf-exp-bullets">
            <li>Built a targeting DevTools page improving ad monitoring efficiency by 20% across 5 departments using React and Node.js</li>
            <li>Designed a system to decipher ad and article themes, cutting team miscommunication by 30%</li>
            <li>Developed analytical tools for ad display patterns, improving brand safety and ad suitability by 15%</li>
          </ul>
        </div>
        <WashingtonPostPhone />
      </div>

      {/* George Mason */}
      <div className="pf-exp-item">
        <div className="pf-exp-content">
          <div className="pf-exp-tag green">Teaching · 2024–Present</div>
          <h3 className="pf-exp-company">George Mason University</h3>
          <p className="pf-exp-role">Student Lecturer — CS 395: Intro to iOS Development</p>
          <p className="pf-exp-period">May 2024 – Present</p>
          <ul className="pf-exp-bullets">
            <li className="green-bullet">Taught 20+ students Swift, SwiftUI, UIKit, and API integrations — 95% average satisfaction rate</li>
            <li className="green-bullet">Developed curriculum, assignments, and projects driving major improvements in course comprehension</li>
            <li className="green-bullet">Introduced students to full iOS development lifecycle from design to App Store concepts</li>
          </ul>
        </div>
        <GeorgeMasonPhone />
      </div>
    </section>
  );
}
