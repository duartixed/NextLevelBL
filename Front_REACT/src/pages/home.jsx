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
      </section>
    </div>
  );
};

export default Home;