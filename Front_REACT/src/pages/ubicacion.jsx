import React from 'react';
import '../styles/components/ubicacion.scss';

const Ubicacion = () => {
  return (
    <div className="ubicacion-page">
      <h1>Encuéntranos</h1>
      <div className="ubicacion-content">
        <div className="mapa-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=YOUR_MAPS_EMBED_URL"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
        <div className="info-container">
          <div className="direccion">
            <h2>Dirección</h2>
            <p>Calle Principal #123</p>
            <p>Ciudad, País</p>
          </div>
          
          <div className="horario">
            <h2>Horario</h2>
            <p>Lunes a Jueves: 11:00 - 22:00</p>
            <p>Viernes y Sábado: 11:00 - 23:00</p>
            <p>Domingo: 12:00 - 21:00</p>
          </div>
          
          <div className="contacto">
            <h2>Contacto</h2>
            <p>Teléfono: (123) 456-7890</p>
            <p>Email: info@nextlevelbl.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ubicacion;
