import React, { useContext } from 'react';
import axios from 'axios';
import { CarritoContext } from '../context/CarritoContext';
import '../styles/components/_productos.scss';
import burgers from '../assets/images/burgers.png';
import drinks from '../assets/Img_front/drinks.png';
import wings from '../assets/Img_front/wings.png';
import fries from '../assets/Img_front/best fries.png';
import hotdogs from '../assets/Img_front/hotdogs.png';
import entradas from '../assets/Img_front/entradas.png';
import especiales from '../assets/Img_front/especiales.png';

const Productos = ({ user, onAddToCart }) => {
  const { agregarAlCarrito } = useContext(CarritoContext);

  const productosData = {
    hamburguesas: [
      { id: 1, nombre: "Hamburguesa Clásica", precio: 10.00, imagen: burgers, descripcion: "Carne, lechuga, tomate, queso y salsa especial" },
      { id: 2, nombre: "Hamburguesa Doble", precio: 15.00, imagen: burgers, descripcion: "Doble carne, doble queso, bacon y salsa BBQ" },
      { id: 3, nombre: "Hamburguesa Especial", precio: 12.00, imagen: burgers, descripcion: "Carne premium, champiñones, queso suizo" }
    ],
    papas: [
      { id: 4, nombre: "Papas Clásicas", precio: 5.00, imagen: fries, descripcion: "Papas fritas crujientes con sal" },
      { id: 5, nombre: "Papas con Queso", precio: 7.00, imagen: fries, descripcion: "Papas con queso cheddar derretido" },
      { id: 6, nombre: "Papas Supreme", precio: 8.00, imagen: fries, descripcion: "Papas con queso, bacon y jalapeños" }
    ],
    bebidas: [
      { id: 7, nombre: "Coca-Cola", precio: 3.00, imagen: drinks, descripcion: "Bebida refrescante 500ml" },
      { id: 8, nombre: "Limonada", precio: 4.00, imagen: drinks, descripcion: "Limonada natural con hierbabuena" },
      { id: 9, nombre: "Cerveza", precio: 5.00, imagen: drinks, descripcion: "Cerveza artesanal" }
    ],
    alitas: [
      { id: 10, nombre: "Alitas BBQ", precio: 12.00, imagen: wings, descripcion: "8 piezas en salsa BBQ" },
      { id: 11, nombre: "Alitas Picantes", precio: 12.00, imagen: wings, descripcion: "8 piezas en salsa buffalo" },
      { id: 12, nombre: "Alitas Teriyaki", precio: 12.00, imagen: wings, descripcion: "8 piezas en salsa teriyaki" }
    ],
    hotdogs: [
      { id: 13, nombre: "Hot Dog Clásico", precio: 7.00, imagen: hotdogs, descripcion: "Salchicha, mostaza y ketchup" },
      { id: 14, nombre: "Hot Dog Especial", precio: 9.00, imagen: hotdogs, descripcion: "Salchicha, bacon, queso y cebolla" }
    ],
    entradas: [
      { id: 15, nombre: "Nachos", precio: 8.00, imagen: entradas, descripcion: "Con guacamole y pico de gallo" },
      { id: 16, nombre: "Aros de Cebolla", precio: 6.00, imagen: entradas, descripcion: "Crujientes aros de cebolla" }
    ],
    especiales: [
      { id: 17, nombre: "Combo Familiar", precio: 35.00, imagen: especiales, descripcion: "4 hamburguesas, 2 papas grandes, 4 bebidas" },
      { id: 18, nombre: "Combo Amigos", precio: 25.00, imagen: especiales, descripcion: "2 hamburguesas, alitas, papas y bebidas" }
    ]
  };

  return (
    <div className="productos">
      {Object.values(productosData).flat().map((producto) => (
        <div key={producto.id} className="producto-card">
          <div className="producto-imagen">
            <img src={producto.imagen} alt={producto.nombre} />
          </div>
          <div className="producto-info">
            <h3>{producto.nombre}</h3>
            <p className="descripcion">{producto.descripcion}</p>
            <p className="precio">${producto.precio.toFixed(2)}</p>
            <button
              className="btn-agregar-carrito"
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Productos;