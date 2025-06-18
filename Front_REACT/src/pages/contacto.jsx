import React, { useEffect } from 'react';
import '../styles/components/contacto.scss';
import StylizedTitle from '../components/StylizedTitle';
import ContactForm from '../components/ContactForm';
import videoHorarios from '../assets/images/videohorarios.mp4';

const Contacto = () => {
  const ubicacion = 'Cl. 9 #10 - 89, Neiva, Huila';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      // Aquí se simula el envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Formulario enviado:', formData);
      return true;
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      return false;
    }
  };
  return (
    <div className="contacto-page">
      <div className="hero-section">
        <StylizedTitle
          title="¿Cómo podemos ayudarte?"
          subtitle="Estamos aquí para escucharte"
        />
        <div className="decorative-pattern"></div>
      </div>

      <div className="contacto-content">
        <div className="contacto-grid">
          <section className="form-section animate-on-scroll">
            <div className="form-container glassmorphism">
              <h2 className="section-title">Envíanos un mensaje</h2>
              <p className="section-description">
                Tu opinión es importante para nosotros. Cuéntanos cómo podemos ayudarte.
              </p>
              <ContactForm onSubmit={handleSubmit} />
            </div>
          </section>
          
          <section className="info-section">
            <div className="info-card location-card animate-on-scroll glassmorphism">
              <div className="info-header">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Encuéntranos en</h3>
              </div>
              <p>{ubicacion}</p>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.819964893964!2d-75.2863453!3d2.9299564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b751ace893301%3Af3b7988c274d0971!2sNext%20Level%20Burger%20Lab!5e0!3m2!1ses-419!2sco!4v1716660000000!5m2!1ses-419!2sco"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            
            <div className="horarios-card animate-on-scroll glassmorphism">
              <div className="info-header">
                <i className="fas fa-clock"></i>
                <h3>Nuestros Horarios</h3>
              </div>
              <video 
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
        </div>
      </div>
    </div>
  );
};

export default Contacto;
