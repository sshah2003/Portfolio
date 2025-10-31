import React, { Component } from 'react';
import './Resume.css';

export default class Resume extends Component {
  render() {
    let resumeData = this.props.resumeData;
    return (
      <section id="resume" className="resume-section">
        <div className="container">
          {/* Section Header */}
          <div className="section-header text-center mb-5">
            <h2 className="heading-lg mb-2">Experience & Education</h2>
            <p className="text-body">My professional journey and academic background</p>
            <div className="mt-3">
              <a
                href={resumeData.resumeUrl}
                className="notion-button notion-button-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Resume
              </a>
            </div>
          </div>

          {/* Work Experience */}
          <div className="experience-section mb-5">
            <h3 className="heading-md mb-4">Work Experience</h3>
            <div className="timeline">
              {resumeData.work && resumeData.work.map((item, index) => (
                <div key={index} className="timeline-item notion-card">
                  {item.current && (
                    <div className="current-badge">
                      <span className="status-dot"></span>
                      Current
                    </div>
                  )}
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4 className="heading-sm mb-1">{item.CompanyName}</h4>
                      <div className="timeline-meta">
                        <span className="role-title">{item.specialization}</span>
                        <span className="timeline-date">
                          {item.MonthOfLeaving} {item.YearOfLeaving}
                        </span>
                      </div>
                    </div>
                    <p className="text-body timeline-description">
                      {item.Achievements}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="education-section">
            <h3 className="heading-md mb-4">Education</h3>
            <div className="education-grid">
              {resumeData.education && resumeData.education.map((item, index) => (
                <div key={index} className="notion-card education-card interactive-card">
                  <div className="education-icon">🎓</div>
                  <h4 className="heading-sm mb-2">{item.UniversityName}</h4>
                  <div className="education-degree">
                    <span className="badge badge-primary">{item.specialization}</span>
                  </div>
                  <div className="education-date text-small mt-2">
                    {item.MonthOfPassing} {item.YearOfPassing}
                  </div>
                  {item.Achievements && (
                    <p className="text-small mt-2">{item.Achievements}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
