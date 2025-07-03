import React from 'react';
import '../styles/components/nosotros.scss';
import burgerImage from '../assets/images/burgers.png';
import StylizedTitle from '../components/StylizedTitle';

const Nosotros = () => {
  const valores = [
    {
      titulo: "Calidad",
      descripcion: "Seleccionamos los mejores ingredientes para crear experiencias gastronómicas excepcionales.",
      icono: "🏆"
    },
    {
      titulo: "Innovación",
      descripcion: "Constantemente exploramos nuevas combinaciones y sabores para sorprender a nuestros clientes.",
      icono: "💡"
    },
    {
      titulo: "Pasión",
      descripcion: "Cada hamburguesa es preparada con dedicación y amor por la cocina.",
      icono: "❤️"
    }
  ];

  return (
    <main className="nosotros-page">
      <StylizedTitle 
        title="Nuestra Historia" 
        subtitle="Pasión por la excelencia"
      />

      <div className="nosotros-contenido">
        <section className="historia-section">
          <div className="historia-grid">
            <div className="historia-text">
              <h3>Next Level Burger Lab</h3>
              <p>
                Desde nuestros inicios, nos hemos dedicado a revolucionar la experiencia de las hamburguesas 
                artesanales. Nacimos de un sueño y una pasión por crear sabores únicos que deleiten 
                a nuestros clientes.
              </p>
              <p>
                Cada hamburguesa es el resultado de años de experimentación, dedicación y búsqueda 
                de la perfección en cada ingrediente y combinación de sabores.
              </p>
            </div>
            <div className="historia-image">
              <img src={burgerImage} alt="Next Level Burger" />
            </div>
          </div>
        </section>

        <section className="valores-section">
          <div className="valores-grid">
            {valores.map((valor, index) => (
              <div key={index} className="valor-card">
                <div className="valor-icon">{valor.icono}</div>
                <h4>{valor.titulo}</h4>
                <p>{valor.descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="compromiso-section">
          <div className="compromiso-contenido">
            <h3>Nuestro Compromiso</h3>
            <p>
              Nos comprometemos a ofrecer la mejor experiencia gastronómica, 
              combinando sabores tradicionales con toques innovadores que hacen 
              de cada visita un momento especial.
            </p>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Satisfacción</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Años de Experiencia</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Clientes Felices</span>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-contenido">
            <h3>¿Listo para la experiencia Next Level?</h3>
            <p>Descubre el sabor que nos hace únicos</p>
            <a href="/menu" className="cta-button">Explorar Menú</a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Nosotros;