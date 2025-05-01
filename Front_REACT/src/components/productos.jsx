import React, { useState } from 'react';
import './Productos.scss';
import hamburguesa from '../../assets/imagenes/hamburguesa.png';
import pizza from '../../assets/imagenes/pizza.png';
import papas from '../../assets/imagenes/papas.png';

const Productos = () => {
  const [carrito, setCarrito] = useState([]);

  const productos = [
    { id: 1, nombre: "Hamburguesa Clásica", precio: 10.00, imagen: hamburguesa },
    { id: 2, nombre: "Pizza Margarita", precio: 12.00, imagen: pizza },
    { id: 3, nombre: "Papas Fritas", precio: 5.00, imagen: papas }
  ];

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <section className="productos">
      <h2>Nuestro Menú</h2>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto">
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>${producto.precio.toFixed(2)}</p>
            <button 
              className="btn-agregar" 
              onClick={() => agregarAlCarrito(producto)}
            >
              Añadir al Carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Productos;