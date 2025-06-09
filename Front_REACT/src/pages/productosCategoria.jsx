import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
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

const ProductosCategoria = () => {  const { categoriaId } = useParams();
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    const cat = categorias.find(c => c.id === categoriaId);
    setCategoria(cat);
    if (!cat) {
      setProductos([]);
      return;
    }
    
    fetch(`http://localhost:5000/api/productos/categoria/${categoriaId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          setProductos([]);
        }
      })
      .catch(() => {
        setProductos([]);
      });
  }, [categoriaId]);  const handleAddToCart = async (producto) => {
    try {
      await agregarAlCarrito(producto);
      alert('✅ Producto agregado al carrito');
    } catch (error) {
      alert('❌ Error al agregar al carrito');
    };
  };

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
                <img 
                  src={producto.imagen || require('../assets/images/burgers.png')} 
                  alt={producto.nombre} 
                />
              </div>
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p className="producto-precio">${producto.precio?.toLocaleString()}</p>              <button 
                id="btnAgregarCarrito"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const target = e.currentTarget;
                  target.style.opacity = '0.8';
                  setTimeout(() => {
                    target.style.opacity = '1';
                    handleAddToCart(producto);
                  }, 100);
                }}
                className="btn-agregar-carrito"
                style={{ 
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 999,
                  userSelect: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
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
