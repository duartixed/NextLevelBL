import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/_hero.scss';
import homeImage from '../assets/Img_front/Home del proyecto.png';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>¡Bienvenido a Next Level Burger!</h1>
          <p>Disfruta de las mejores hamburguesas con un sabor único</p>
          <Link to="/reservas" className="btn-reserva">Reserva Ahora</Link>
        </div>
        <div className="hero-image">
          <img src={homeImage} alt="Next Level Burger Hero" />
        </div>
      </div>
    </section>
  );
};

export default Hero;