import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ isResult, onReset }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--stuck' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-inner section">

        {/* Brand */}
        <a href="#top" className="nav-brand" onClick={isResult ? onReset : undefined} id="nav-brand">
          <div className="nav-logo">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
              <rect width="30" height="30" rx="8" fill="url(#lg)"/>
              <text x="15" y="21" textAnchor="middle" fill="white"
                fontSize="13" fontWeight="800" fontFamily="Space Grotesk,sans-serif">IQ</text>
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="30" y2="30">
                  <stop stopColor="#6366f1"/>
                  <stop offset="1" stopColor="#8b5cf6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="nav-wordmark">
            Resume<span className="nav-iq">IQ</span>
          </span>
          <span className="nav-pill">v2</span>
        </a>

        {/* Links */}
        <div className="nav-links" role="list">
          <a href="#upload"    className="nav-link" id="nl-upload"   role="listitem">Upload</a>
          {isResult && <a href="#dashboard" className="nav-link nav-link--active" id="nl-results" role="listitem">Results</a>}
          <a href="#footer"    className="nav-link" id="nl-about"    role="listitem">About</a>
        </div>

        {/* Right */}
        <div className="nav-right">
          <div className="nav-status" aria-label="System status: AI Ready">
            <span className="nav-dot" aria-hidden="true"/>
            <span className="nav-status-text">AI Ready</span>
          </div>
          <a href="#upload" className="btn btn-primary nav-cta" id="nav-cta">
            Analyze Resume
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
