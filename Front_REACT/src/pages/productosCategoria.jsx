import React from 'react';
import { useParams, Link } from 'react-router-dom';
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

const ProductosCategoria = () => {
  const { categoriaId } = useParams();
  const categoria = categorias.find(c => c.id === categoriaId);
  const productos = productosDemo[categoriaId] || [];

  if (!categoria) {
    return (
      <div className="productos-container">
        <h2>Categoría no encontrada</h2>
        <Link to="/menu">Volver al menú</Link>
      </div>
    );
  }

  return (
    <div className="productos-container">
      <h2>{categoria.nombre}</h2>
      <div className="productos-grid">
        {productos.length === 0 ? (
          <p>No hay productos en esta categoría.</p>
        ) : (
          productos.map(producto => (
            <div key={producto.id} className="producto-card">
              <div className="producto-imagen">
                {producto.imagen ? <img src={producto.imagen} alt={producto.nombre} /> : <div className="img-placeholder" />}
              </div>
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p className="descripcion">{producto.descripcion}</p>
                <p className="precio">${producto.precio.toLocaleString()}</p>
                <button className="btn">Agregar al carrito</button>
              </div>
            </div>
          ))
        )}
      </div>
      <Link to="/menu" className="btn" style={{marginTop: '2rem'}}>Volver al menú</Link>
    </div>
  );
};

export default ProductosCategoria;
