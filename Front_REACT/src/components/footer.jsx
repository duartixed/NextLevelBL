import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/_footer.scss';
import logo from '../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Next Level Logo" />
          <p>La mejor experiencia en hamburguesas</p>
        </div>
        
        <div className="footer-links">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><Link to="/menu">Menú</Link></li>
            <li><Link to="/promociones">Promociones</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contáctanos</h3>
          <p>📍 Dirección: Av. Principal #123</p>
          <p>📱 Teléfono: (01) 234-5678</p>
          <p>✉️ Email: info@nextlevel.com</p>
        </div>

        <div className="footer-hours">
          <h3>Horario</h3>
          <p>Lunes a Viernes: 11:00 - 22:00</p>
          <p>Sábados y Domingos: 12:00 - 23:00</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Next Level Burger. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;