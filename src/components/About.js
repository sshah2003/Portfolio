import React, { Component } from 'react';
import './About.css';

export default class About extends Component {
  render() {
    let resumeData = this.props.resumeData;
    return (
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content">
            {/* About Me */}
            <div className="about-intro">
              <h2 className="heading-lg mb-3">About Me</h2>
              <p className="text-body mb-4">
                {resumeData.aboutme}
              </p>
            </div>

            {/* Highlights Grid */}
            {resumeData.highlights && resumeData.highlights.length > 0 && (
              <div className="highlights-grid">
                {resumeData.highlights.map((highlight, index) => (
                  <div key={index} className="notion-card highlight-card fade-in">
                    <div className="icon-container">
                      {highlight.icon}
                    </div>
                    <h3 className="heading-sm">{highlight.title}</h3>
                    <p className="text-small">{highlight.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills Section */}
            <div className="skills-section mt-5">
              <h2 className="heading-md mb-3">Skills & Technologies</h2>
              <p className="text-body mb-4">{resumeData.skillsDescription}</p>

              <div className="skills-grid">
                {resumeData.skills && resumeData.skills.map((skill, index) => (
                  <div key={index} className="notion-card skill-card">
                    <h4 className="skill-title">{skill.skillname}</h4>
                    {skill.description && (
                      <p className="text-small">{skill.description}</p>
                    )}
                    {skill.category && (
                      <span className="badge badge-primary">{skill.category}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
