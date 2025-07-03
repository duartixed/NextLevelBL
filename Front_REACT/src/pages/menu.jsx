import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/menu.scss';
import burgers from '../assets/images/nextlevelburguer.png';
import drinks from '../assets/images/coca-cola.png';
import wings from '../assets/images/personalx12alas.png';
import fries from '../assets/images/classicfries.png';
import hotdogs from '../assets/images/nextlevelhotdog.png';
import entradas from '../assets/images/dedosqueso.png';
import videoPreparacion from '../assets/images/preparacion.mp4';
import StylizedTitle from '../components/StylizedTitle';

// Publicidad images


const Menu = () => {
  const categorias = [
    { id: 'hamburguesas', nombre: 'Hamburguesas', imagen: burgers },
    { id: 'papas', nombre: 'Papas Fritas', imagen: fries },
    { id: 'bebidas', nombre: 'Bebidas', imagen: drinks },
    { id: 'alitas', nombre: 'Alitas', imagen: wings },
    { id: 'hotdogs', nombre: 'Hot Dogs', imagen: hotdogs },
    { id: 'entradas', nombre: 'Entradas', imagen: entradas }
  ];

  return (
    <div className="menu-page">      <StylizedTitle 
        title="Nuestro Menú" 
        subtitle="Descubre nuestros sabores"
      />

      <div className="categorias-menu">
        {categorias.map((categoria) => (
          <Link 
            to={`/menu/${categoria.id}`} 
            key={categoria.id} 
            className="categoria-card"
          >
            <div className="categoria-image">
              <img 
                src={categoria.imagen} 
                alt={categoria.nombre}
                loading="lazy"
              />
            </div>
            <h3>{categoria.nombre}</h3>
          </Link>
        ))}      </div>

      <section className="video-preparacion-section">
        <div className="video-container">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="preparacion-video"
          >
            <source src={videoPreparacion} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        </div>
      </section>
    </div>
  );
};

export default Menu;
