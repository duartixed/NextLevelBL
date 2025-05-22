import React from 'react';
import '../styles/components/menu.scss';
import burgers from '../assets/images/burgers.png';
import drinks from '../assets/Img_front/drinks.png';
import wings from '../assets/Img_front/wings.png';
import fries from '../assets/Img_front/best fries.png';
import hotdogs from '../assets/Img_front/hotdogs.png';
import entradas from '../assets/Img_front/entradas.png';
import especiales from '../assets/Img_front/especiales.png';

const Menu = () => {
  const categorias = [
    { id: 'hamburguesas', nombre: 'Hamburguesas', imagen: burgers, ruta: '/menu/hamburguesas' },
    { id: 'papas', nombre: 'Papas Fritas', imagen: fries, ruta: '/menu/papas' },
    { id: 'bebidas', nombre: 'Bebidas', imagen: drinks, ruta: '/menu/bebidas' },
    { id: 'alitas', nombre: 'Alitas', imagen: wings, ruta: '/menu/alitas' },
    { id: 'hotdogs', nombre: 'Hot Dogs', imagen: hotdogs, ruta: '/menu/hotdogs' },
    { id: 'entradas', nombre: 'Entradas', imagen: entradas, ruta: '/menu/entradas' },
    { id: 'especiales', nombre: 'Especiales', imagen: especiales, ruta: '/menu/especiales' }
  ];

  return (
    <div className="menu-page">
      <h1>Nuestro Menú</h1>
      <div className="categorias-grid">
        {categorias.map((categoria) => (
          <a 
            key={categoria.id} 
            href={categoria.ruta}
            className="categoria-card"
          >
            <div className="categoria-image">
              <img src={categoria.imagen} alt={categoria.nombre} />
            </div>
            <h3>{categoria.nombre}</h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Menu;
