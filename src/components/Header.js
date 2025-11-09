import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolled: false,
      isMobileMenuOpen: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const isScrolled = window.scrollY > 50;
    if (isScrolled !== this.state.isScrolled) {
      this.setState({ isScrolled });
    }
  };

  toggleMobileMenu = () => {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen });
  };

  closeMobileMenu = () => {
    this.setState({ isMobileMenuOpen: false });
  };

  render() {
    let resumeData = this.props.resumeData;
    const { isScrolled, isMobileMenuOpen } = this.state;

    return (
      <React.Fragment>
        {/* Modern Navigation */}
        <nav className={`modern-nav ${isScrolled ? 'scrolled' : ''}`}>
          <div className="container">
            <div className="nav-content">
              <a href="#home" className="nav-logo">
                <span className="logo-text">{resumeData.name}</span>
              </a>

              <button
                className="mobile-menu-toggle"
                onClick={this.toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <li><a href="#home" onClick={this.closeMobileMenu}>Home</a></li>
                <li><a href="#about" onClick={this.closeMobileMenu}>About</a></li>
                <li><a href="#resume" onClick={this.closeMobileMenu}>Experience</a></li>
                <li><a href="#portfolio" onClick={this.closeMobileMenu}>Projects</a></li>
                <li><a href="#contact" onClick={this.closeMobileMenu}>Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header id="home" className="hero-section">
          <div className="container">
            <div className="hero-content fade-in">
              <div className="hero-badge">
                <span className="status-dot"></span>
                Available for opportunities
              </div>

              <h1 className="heading-xl">
                Hi, I'm {resumeData.name}
              </h1>

              <h2 className="hero-subtitle">
                {resumeData.role}
              </h2>

              <p className="hero-description text-body">
                {resumeData.roleDescription}
              </p>

              <div className="hero-buttons">
                <a href="#contact" className="notion-button notion-button-primary">
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
                <a
                  href={`mailto:${resumeData.email}`}
                  className="notion-button"
                >
                  Email Me
                </a>
              </div>

              <div className="social-links">
                {resumeData.socialLinks && resumeData.socialLinks.map(item => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={item.name}
                  >
                    <i className={item.className}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="scroll-indicator">
            <a href="#about" className="scroll-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
          </div>
        </header>
      </React.Fragment>
    );
  }
}