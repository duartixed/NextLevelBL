import React, { useState } from 'react';
import '../styles/components/contactForm.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
    setFormData({
      nombre: '',
      email: '',
      mensaje: ''
    });
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Tu nombre completo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tucorreo@ejemplo.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            rows="4"
            placeholder="¿En qué podemos ayudarte?"
          />
        </div>

        <button type="submit" className="submit-btn">
          Enviar mensaje
        </button>

        {enviado && (
          <div className="success-message">
            ¡Mensaje enviado con éxito! Revisaremos tu mensaje pronto.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
