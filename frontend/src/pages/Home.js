import React from "react";
import "../assets/css/style.css";

const Home = () => {
  return (
    <div>
      <header>
        <nav>
          <div className="logo">
            <img src="/assets/imagenes/logo.png" alt="Logo del Restaurante" />
          </div>
          <ul className="nav-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/menu">Menú</a></li>
            <li><a href="/reservas">Reservas</a></li>
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="/login">Iniciar Sesión</a></li>
            <li><a href="/signup">Crear Cuenta</a></li>
          </ul>
        </nav>
      </header>
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a Nuestro Restaurante</h1>
          <p>Disfruta de la mejor experiencia gastronómica.</p>
          <a href="/reservas" className="btn-reserva">Reserva Ahora</a>
        </div>
        <div className="hero-image">
          <img src="/assets/imagenes/hero-image.png" alt="Imagen Hero" />
        </div>
      </section>
    </div>
  );
};

export default Home;
