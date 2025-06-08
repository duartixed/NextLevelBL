import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/_footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Next Level Burger Lab</h3>
          <p className="footer-description">
            Elevando la experiencia de las hamburguesas artesanales a otro nivel.
          </p>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <ul className="contact-list">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <a href="https://maps.google.com/?q=Cl. 9 #10 - 89, Neiva, Huila" 
                 target="_blank" 
                 rel="noopener noreferrer">
                Cl. 9 #10 - 89, Neiva, Huila
              </a>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <a href="tel:3183336591">318 3336591</a>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <a href="mailto:nextlevelneiva@gmail.com">nextlevelneiva@gmail.com</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul className="quick-links">
            <li><Link to="/menu">Menú</Link></li>
            <li><Link to="/promociones">Promociones</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="https://www.instagram.com/nextlevelburgerlab/?hl=es" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="social-link instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/nextlevelburgerlab/?locale=es_LA" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="social-link facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=573183336591&text&type=phone_number&app_absent=0" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="social-link whatsapp">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Next Level Burger Lab. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;