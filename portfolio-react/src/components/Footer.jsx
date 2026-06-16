import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            P<span className="highlight">K</span>L
          </div>
          <div className="footer-social">
            <a href="https://github.com/PERANANDHA" target="_blank" rel="noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/peranandha-k-l-0143b9292" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=peranandha17@gmail.com" 
            target="_blank" 
            rel="noreferrer"
            className="footer-email"
          >
            <i className="fas fa-envelope"></i> peranandha17@gmail.com
          </a>
          <p className="footer-copy">&copy; {new Date().getFullYear()} PERANANDHA K L. All rights reserved.</p>
          <p className="footer-location">
            <i className="fas fa-map-marker-alt"></i> Salem, Tamil Nadu, India - 636307
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
