import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer-glow" />
      <div className="footer-inner section">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="7" fill="url(#foot-grad)"/>
                <text x="14" y="20" textAnchor="middle" fill="white"
                  fontSize="13" fontWeight="800" fontFamily="Space Grotesk, sans-serif">IQ</text>
                <defs>
                  <linearGradient id="foot-grad" x1="0" y1="0" x2="28" y2="28">
                    <stop stopColor="#6366f1"/>
                    <stop offset="1" stopColor="#8b5cf6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="footer-logo-text">ResumeIQ</span>
          </div>
          <p className="footer-tagline">
            AI-powered resume analysis that helps developers land their dream roles.
          </p>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom row */}
        <div className="footer-bottom">
          <div className="footer-credits">
            <span>© {currentYear} ResumeIQ. Built for</span>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              id="digital-heroes-link"
            >
              Digital Heroes
            </a>
          </div>

          <div className="footer-dev">
            <div className="footer-dev-info">
              <div className="footer-dev-avatar">S</div>
              <div>
                <p className="footer-dev-name">Subiksha suresh</p>
                <a href="mailto:your@email.com" className="footer-dev-email" id="dev-email-link">
                  subikshasuresh1909@email.com
                </a>
              </div>
            </div>
          </div>

          <div className="footer-badges">
            <div className="footer-badge">
              <span>⚡</span> React + Vite
            </div>
            <div className="footer-badge">
              <span>🤖</span> AI-Powered
            </div>
            <div className="footer-badge">
              <span>🔒</span> Privacy First
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
