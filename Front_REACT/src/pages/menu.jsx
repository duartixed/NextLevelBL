import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/menu.scss';
import burgers from '../assets/images/burgers.png';
import drinks from '../assets/Img_front/drinks.png';
import wings from '../assets/Img_front/wings.png';
import fries from '../assets/Img_front/best fries.png';
import hotdogs from '../assets/Img_front/hotdogs.png';
import entradas from '../assets/Img_front/entradas.png';
import StylizedTitle from '../components/StylizedTitle';

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
    <div className="menu-page">
      <StylizedTitle 
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
        ))}
      </div>
    </div>
  );
};

export default Menu;
