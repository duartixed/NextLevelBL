import React, { useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axioInstance';
import { CarritoContext } from '../context/CarritoContext';
import '../styles/components/_productos.scss';

const Productos = ({ user, onAddToCart }) => {
  const { agregarAlCarrito, loading } = useContext(CarritoContext);
  const [productos, setProductos] = useState({
    hamburguesas: [],
    papas: [],
    bebidas: [],
    alitas: [],
    hotdogs: [],
    entradas: [],
    especiales: []
  });
  const [addedProduct, setAddedProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const categorias = ['hamburguesas', 'papas', 'bebidas', 'alitas', 'hotdogs', 'entradas', 'especiales'];
        const productosTemp = {};
        
        for (const categoria of categorias) {
          const response = await axiosInstance.get(`/api/productos/categoria/${categoria}`);
          productosTemp[categoria] = response.data;
        }
        
        setProductos(productosTemp);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setError('Error al cargar los productos');
      }
    };

    cargarProductos();
  }, []);

  // Estado para cantidades por producto
  const [cantidades, setCantidades] = useState({});

  const handleCantidadChange = (idProducto, value, stock) => {
    let val = parseInt(value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (stock && val > stock) val = stock;
    setCantidades((prev) => ({ ...prev, [idProducto]: val }));
  };

  const handleAddToCart = async (producto) => {
    if (!producto.idProducto) {
      setError('Error: Producto no válido');
      return;
    }
    setError(null);
    try {
      const cantidad = cantidades[producto.idProducto] || 1;
      const result = await agregarAlCarrito({ ...producto, cantidad });
      setAddedProduct(producto.nombre);
      if (onAddToCart) onAddToCart();
      setTimeout(() => {
        setAddedProduct(null);
      }, 3000);
    } catch (error) {
      setError(error.message || 'Error al agregar el producto al carrito');
      setAddedProduct(null);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="productos-list" style={{gap: '1rem'}}>
      {Object.entries(productos).map(([categoria, items]) => (
        <div key={categoria} className="categoria-section">
          <h2>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2>
          <div className="productos-grid">
            {items.map((producto) => (
              <div key={producto.idProducto} className="producto-card" style={{padding: '0.7rem', borderRadius: '10px', fontSize: '0.95rem', minWidth: '180px', maxWidth: '220px'}}>
                <img src={producto.imagen || `/images/${categoria}.png`} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p className="precio">${producto.precio.toFixed(2)}</p>
                <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                  <input
                    type="number"
                    min={1}
                    max={producto.stock || 99}
                    value={cantidades[producto.idProducto] || 1}
                    onChange={e => handleCantidadChange(producto.idProducto, e.target.value, producto.stock)}
                    style={{width:'50px', fontSize:'1rem'}}
                  />
                  <button 
                    onClick={() => handleAddToCart(producto)}
                    disabled={loading || addedProduct === producto.nombre}
                    className={`add-to-cart-btn ${loading ? 'loading' : ''} ${addedProduct === producto.nombre ? 'added' : ''}`}
                  >
                    {loading ? 'Agregando...' : 
                     addedProduct === producto.nombre ? '✓ Agregado' : 
                     'Agregar al Carrito'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Productos;