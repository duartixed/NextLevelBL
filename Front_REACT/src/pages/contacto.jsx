import React from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import '../styles/components/contacto.scss';
import '../styles/components/ubicacion.scss';

const Contacto = () => {
  return (
    <>
      <Header />
      <div style={{ height: '100px' }} />
      <div className="contacto-ubicacion-page">
        <h1 style={{ textAlign: 'center', color: '#FFD600' }}>Ubicación</h1>
        <div className="contacto-ubicacion-content">
          {/* Mapa y Ubicación */}
          <div className="mapa-container mapa-amarillo">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.819964893964!2d-75.2863453!3d2.9299564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b751ace893301%3Af3b7988c274d0971!2sNext%20Level%20Burger%20Lab!5e0!3m2!1ses-419!2sco!4v1716660000000!5m2!1ses-419!2sco"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación NextLevelBL"
            ></iframe>
          </div>
          {/* Información de contacto */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contacto;
