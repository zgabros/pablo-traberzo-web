import React from 'react';
import { FaInstagram, FaYoutube, FaSpotify, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
            <FaSpotify />
          </a>
          <a href="mailto:contacto@pablotraberzo.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
        <div className="footer-copy">
          <p>&copy; {new Date().getFullYear()} Pablo Traberzo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
