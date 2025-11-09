import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  render() {
    let resumeData = this.props.resumeData;
    const currentYear = new Date().getFullYear();

    return (
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            {/* Footer Top */}
            <div className="footer-top">
              <div className="footer-branding">
                <h3 className="heading-md mb-2">{resumeData.name}</h3>
                <p className="text-body">
                  {resumeData.role}
                </p>
              </div>

              <div className="footer-links">
                <div className="footer-column">
                  <h4 className="footer-heading">Navigation</h4>
                  <ul className="footer-menu">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#resume">Experience</a></li>
                    <li><a href="#portfolio">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                  </ul>
                </div>

                <div className="footer-column">
                  <h4 className="footer-heading">Connect</h4>
                  <ul className="footer-menu">
                    <li>
                      <a href={`mailto:${resumeData.email}`}>Email</a>
                    </li>
                    <li>
                      <a href="https://github.com/sshah2003" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/in/sohil-shah-1b1023122" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
              <div className="footer-social">
                {resumeData.socialLinks && resumeData.socialLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={item.name}
                  >
                    <i className={item.className}></i>
                  </a>
                ))}
              </div>

              <p className="footer-copyright text-small">
                © {currentYear} {resumeData.name}. All rights reserved.
              </p>

              <button
                onClick={this.scrollToTop}
                className="back-to-top"
                aria-label="Back to top"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
