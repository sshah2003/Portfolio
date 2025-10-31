import React, { Component } from 'react';
import './ContactUs.css';

export default class ContactUs extends Component {
  render() {
    let resumeData = this.props.resumeData;
    return (
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-content">
            {/* Header */}
            <div className="section-header text-center mb-5">
              <h2 className="heading-lg mb-2">Let's Connect</h2>
              <p className="text-body">
                I'm always open to new opportunities and interesting projects.
                Feel free to reach out!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="contact-grid">
              {/* Email Card */}
              <a
                href={`mailto:${resumeData.email}`}
                className="notion-card contact-card interactive-card"
              >
                <div className="contact-card-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <h3 className="heading-sm mb-1">Email</h3>
                <p className="text-body contact-value">{resumeData.email}</p>
                <span className="contact-cta text-small">Send me an email →</span>
              </a>

              {/* Phone Card */}
              <a
                href={`tel:${resumeData.phoneNumber}`}
                className="notion-card contact-card interactive-card"
              >
                <div className="contact-card-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h3 className="heading-sm mb-1">Phone</h3>
                <p className="text-body contact-value">{resumeData.phoneNumber}</p>
                <span className="contact-cta text-small">Give me a call →</span>
              </a>

              {/* Location Card */}
              <div className="notion-card contact-card">
                <div className="contact-card-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 className="heading-sm mb-1">Location</h3>
                <p className="text-body contact-value">{resumeData.address}</p>
                <span className="contact-cta text-small">Based in the DMV area</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-section mt-5">
              <h3 className="heading-md text-center mb-4">Find Me Online</h3>
              <div className="social-links-grid">
                {resumeData.socialLinks && resumeData.socialLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="notion-card social-card interactive-card"
                  >
                    <i className={item.className} style={{fontSize: '32px', marginBottom: '12px'}}></i>
                    <span className="text-body" style={{fontWeight: 500}}>{item.name}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginTop: '8px'}}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="contact-cta-section mt-5">
              <div className="notion-card" style={{padding: '48px 32px', textAlign: 'center'}}>
                <h3 className="heading-md mb-3">Ready to work together?</h3>
                <p className="text-body mb-4">
                  Whether you have a project in mind or just want to chat about tech,
                  I'd love to hear from you.
                </p>
                <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
                  <a
                    href={`mailto:${resumeData.email}`}
                    className="notion-button notion-button-primary"
                  >
                    Get in Touch
                  </a>
                  <a
                    href={resumeData.resumeUrl}
                    className="notion-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
