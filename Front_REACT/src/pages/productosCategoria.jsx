import React, { useContext, useEffect, useState } from 'react';
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





const ProductosCategoria = () => {


  const { categoriaId } = useParams();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    const cat = categorias.find(c => c.id === categoriaId);
    setCategoria(cat);
    if (!cat) {
      setProductos([]);
      return;
    }
    async function fetchProductos() {
      try {
        const res = await fetch(`http://localhost:5000/api/productos/categoria/${categoriaId}`);
        const data = await res.json();
        // Si la respuesta no es un array, setear como array vacío
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          setProductos([]);
        }
      } catch (error) {
        setProductos([]);
      }
    }
    fetchProductos();
  }, [categoriaId]);



  // Agrega el producto real directamente al carrito
  function handleAgregarAlCarrito(producto) {
    agregarAlCarrito(producto);
  }

  if (!categoria) {
    return <p>Categoría no encontrada</p>;
  }

  return (
    <div className="productos-container">
      <h1>{categoria.nombre}</h1>
      <div className="productos-grid">
        {productos.length === 0 ? (
          <p>No hay productos disponibles en esta categoría.</p>
        ) : (
          productos.map(producto => (
            <div key={producto.idProducto} className="producto-card">
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
          ))
        )}
      </div>
    </div>
  );
};

export default ProductosCategoria;
