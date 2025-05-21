import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/home.scss";

// Importa las imágenes
import logo from "../assets/images/logo.png";
import userIcon from "../assets/images/user-icon.png";
import createAccountIcon from "../assets/images/create-account-icon.png";

const Home = () => {
  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Next Level Logo" />
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/nosotros">NOSOTROS</Link></li>
            <li><Link to="/promociones">PROMOCIONES</Link></li>
            <li><Link to="/menu">MENÚ</Link></li>
            <li><Link to="/ubicacion">UBÍCANOS</Link></li>
            <li><Link to="/contacto">CONTÁCTANOS</Link></li>
          </ul>
        </nav>
        <div className="icons">
          <Link to="/login">
            <img src={userIcon} alt="Iniciar Sesión" title="Iniciar Sesión" />
          </Link>
          <Link to="/register">
            <img src={createAccountIcon} alt="Crear Cuenta" title="Crear Cuenta" />
          </Link>
        </div>
      </header>

      {/* Línea amarilla debajo del encabezado */}
      <div className="header-border"></div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>¡Bienvenido a Next Level Burger!</h1>
          <p>Disfruta de las mejores hamburguesas con un sabor único.</p>
        </div>
      </section>

      {/* Promociones */}
      <section className="promotions">
        <h2>Promociones del Mes</h2>
        <div className="promotions-grid">
          <div className="promotion-item">
            <img src="/images/promo1.jpg" alt="Promo 1" />
            <p>2x1 en hamburguesas</p>
          </div>
          <div className="promotion-item">
            <img src="/images/promo2.jpg" alt="Promo 2" />
            <p>Descuento en combos</p>
          </div>
        </div>
      </section>

      {/* Menú */}
      <section className="menu">
        <h2>Menú Principal</h2>
        <div className="menu-grid">
          <div className="menu-item">
            <img src="/images/menu1.jpg" alt="Hamburguesa Clásica" />
            <p>Hamburguesa Clásica</p>
          </div>
          <div className="menu-item">
            <img src="/images/menu2.jpg" alt="Hamburguesa BBQ" />
            <p>Hamburguesa BBQ</p>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="location">
        <h2>Visítanos</h2>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.41941548468132!3d37.77492927975971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f8e8b8b1%3A0x4c8b8b8b8b8b8b8b!2sNext%20Level%20Burger!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Ubicación"
          ></iframe>
        </div>
      </section>

      {/* Reseñas */}
      <section className="reviews">
        <h2>Reseñas</h2>
        <div className="reviews-content">
          <p>⭐⭐⭐⭐⭐</p>
          <p>"¡Las mejores hamburguesas que he probado!"</p>
        </div>
      </section>
    </div>
  );
};

export default Home;