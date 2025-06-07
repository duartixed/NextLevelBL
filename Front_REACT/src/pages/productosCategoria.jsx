import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import '../styles/components/_productos.scss';


const categorias = [
  { id: 'hamburguesas', nombre: 'Hamburguesas' },
  { id: 'papas', nombre: 'Papas Fritas' },
  { id: 'bebidas', nombre: 'Bebidas' },
  { id: 'alitas', nombre: 'Alitas' },
  { id: 'hotdogs', nombre: 'Hot Dogs' },
  { id: 'entradas', nombre: 'Entradas' },
  { id: 'especiales', nombre: 'Especiales' }
];

const productosDemo = {
  hamburguesas: [
    { id: 1, nombre: 'Clásica', descripcion: 'Hamburguesa tradicional', precio: 18000, imagen: '' },
    { id: 2, nombre: 'Doble Queso', descripcion: 'Con doble queso', precio: 22000, imagen: '' }
  ],
  papas: [
    { id: 3, nombre: 'Papas Fritas', descripcion: 'Crocantes y doradas', precio: 9000, imagen: '' },
    { id: 4, nombre: 'Papas con Queso', descripcion: 'Papas con queso cheddar', precio: 12000, imagen: '' }
  ],
  bebidas: [
    { id: 5, nombre: 'Coca-Cola', descripcion: 'Bebida refrescante', precio: 4000, imagen: '' },
    { id: 6, nombre: 'Limonada', descripcion: 'Limonada natural', precio: 5000, imagen: '' }
  ],
  alitas: [
    { id: 7, nombre: 'Alitas BBQ', descripcion: 'Alitas en salsa BBQ', precio: 15000, imagen: '' },
    { id: 8, nombre: 'Alitas Picantes', descripcion: 'Alitas en salsa picante', precio: 15000, imagen: '' }
  ],
  hotdogs: [
    { id: 9, nombre: 'Hot Dog Clásico', descripcion: 'Salchicha, mostaza y ketchup', precio: 10000, imagen: '' },
    { id: 10, nombre: 'Hot Dog Especial', descripcion: 'Con queso y bacon', precio: 12000, imagen: '' }
  ],
  entradas: [
    { id: 11, nombre: 'Nachos', descripcion: 'Con guacamole y pico de gallo', precio: 11000, imagen: '' },
    { id: 12, nombre: 'Aros de Cebolla', descripcion: 'Crujientes aros de cebolla', precio: 9000, imagen: '' }
  ],
  especiales: [
    { id: 13, nombre: 'Combo Familiar', descripcion: '4 hamburguesas, 2 papas grandes, 4 bebidas', precio: 35000, imagen: '' },
    { id: 14, nombre: 'Combo Amigos', descripcion: '2 hamburguesas, alitas, papas y bebidas', precio: 25000, imagen: '' }
  ]
};

// Mapeo de nombre demo a idProducto real
const nombreToIdProducto = {
  'Clásica': 1,
  'Doble Queso': 2,
  'Papas Fritas': 4,
  'Papas con Queso': 5,
  'Coca-Cola': 7,
  'Limonada': 8,
  'Alitas BBQ': 10,
  'Alitas Picantes': 11,
  'Hot Dog Clásico': 13,
  'Hot Dog Especial': 14,
  'Nachos': 15,
  'Aros de Cebolla': 16,
  'Combo Familiar': 17,
  'Combo Amigos': 18
};



const ProductosCategoria = () => {

  const { categoriaId } = useParams();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const categoria = categorias.find(c => c.id === categoriaId);
  if (!categoria) {
    return <p>Categoría no encontrada</p>;
  }
  let productos = productosDemo[categoriaId] || [];

  function handleAgregarAlCarrito(productoDemo) {
    // Buscar el idProducto real por nombre demo
    const idProducto = nombreToIdProducto[productoDemo.nombre] || productoDemo.id;
    const productoReal = { ...productoDemo, idProducto };
    agregarAlCarrito(productoReal);
  }

  return (
    <div className="productos-container">
      <h1>{categoria.nombre}</h1>
      <div className="productos-grid">
        {productos.map(producto => (
          <div key={producto.id} className="producto-card">
            <div className="producto-image">
              <img src={producto.imagen || require('../assets/images/burgers.png')} alt={producto.nombre} />
            </div>
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p className="producto-precio">${producto.precio?.toLocaleString()}</p>
            <button onClick={() => handleAgregarAlCarrito(producto)} className="btn-agregar-carrito">
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosCategoria;
