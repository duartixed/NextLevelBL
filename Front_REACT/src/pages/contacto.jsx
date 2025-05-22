import React from 'react';
import '../styles/components/contacto.scss';

const Contacto = () => {
  return (
    <div className="contacto-page">
      <h1>Contáctanos</h1>
      <form className="contacto-form">
        <input type="text" placeholder="Nombre" required />
        <input type="email" placeholder="Correo electrónico" required />
        <textarea placeholder="Mensaje" required></textarea>
        <button type="submit">Enviar</button>
      </form>
      <div className="contacto-info">
        <p>📍 Dirección: Av. Principal #123</p>
        <p>📱 Teléfono: (01) 234-5678</p>
        <p>✉️ Email: info@nextlevel.com</p>
      </div>
    </div>
  );
};

export default Contacto;
