import React from 'react';
import '../styles/components/_nosotros.scss';

const Nosotros = () => {
  return (
    <div className="nosotros">
      <div className="nosotros__container">
        <h1 className="nosotros__title">NEXT LEVEL</h1>
        <div className="nosotros__section">
          <h2>¡Bienvenidos a Next Level!</h2>
          <p>Somos más que un restaurante de comida rápida, somos una experiencia gastronómica que eleva tus expectativas. Nos especializamos en crear hamburguesas, papas fritas y alitas que desafían lo convencional, usando ingredientes de primera calidad y recetas únicas.</p>
        </div>
        <div className="nosotros__section">
          <h2>Nuestra Misión</h2>
          <p>Crear experiencias culinarias extraordinarias que deleiten los sentidos y superen las expectativas, ofreciendo comida rápida de alta calidad en un ambiente único y acogedor.</p>
        </div>
        <div className="nosotros__section">
          <h2>Nuestra Visión</h2>
          <p>Ser reconocidos como el referente en innovación y calidad en el sector de comida rápida, expandiendo nuestra presencia mientras mantenemos la excelencia en cada platillo que servimos.</p>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;