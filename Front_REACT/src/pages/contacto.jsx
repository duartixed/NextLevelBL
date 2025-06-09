import React from 'react';
import '../styles/components/contacto.scss';
import StylizedTitle from '../components/StylizedTitle';
import videoHorarios from '../assets/images/videohorarios.mp4';

const Contacto = () => {
  const contactInfo = {
    direccion: 'Cl. 9 #10 - 89, Neiva, Huila',
    telefono: '318 3336591',
    email: 'nextlevelneiva@gmail.com',
    whatsapp: '318 3336591',
    instagram: 'https://www.instagram.com/nextlevelburgerlab/?hl=es',
    facebook: 'https://www.facebook.com/nextlevelburgerlab/?locale=es_LA',
  };

  return (
    <div className="contacto-page">
      <StylizedTitle
        title="Contáctanos"
        subtitle="Estamos cerca de ti"
      />

      <div className="contacto-content">
        <section className="horarios-section">
          <div className="video-container">            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="horarios-video"
            >
              <source src={videoHorarios} type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
          </div>
        </section>

        <section className="mapa-section">
          <div className="mapa-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.819964893964!2d-75.2863453!3d2.9299564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b751ace893301%3Af3b7988c274d0971!2sNext%20Level%20Burger%20Lab!5e0!3m2!1ses-419!2sco!4v1716660000000!5m2!1ses-419!2sco"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        <section className="info-section">
          <div className="info-cards">
            <div className="info-card">
              <div className="card-icon">📍</div>
              <h3>Ubicación</h3>
              <p>{contactInfo.direccion}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  contactInfo.direccion
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button"
              >
                Cómo llegar
              </a>
            </div>

            <div className="info-card">
              <div className="card-icon">📱</div>
              <h3>Teléfono</h3>
              <p>{contactInfo.telefono}</p>
              <a
                href={`tel:${contactInfo.telefono}`}
                className="action-button"
              >
                Llamar ahora
              </a>
            </div>

            <div className="info-card">
              <div className="card-icon">✉️</div>
              <h3>Correo</h3>
              <p>{contactInfo.email}</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="action-button"
              >
                Enviar correo
              </a>
            </div>
          </div>
        </section>

        <section className="social-section">
          <h3>Síguenos en redes sociales</h3>
          <div className="social-links">
            <a
              href={contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button instagram"
            >
              <i className="fab fa-instagram"></i>
              Instagram
            </a>
            <a
              href={contactInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button facebook"
            >
              <i className="fab fa-facebook"></i>
              Facebook
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=573183336591&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button whatsapp"
            >
              <i className="fab fa-whatsapp"></i>
              WhatsApp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contacto;
