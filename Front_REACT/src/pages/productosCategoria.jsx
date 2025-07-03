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
      const result = await agregarAlCarrito(producto);
      if (result) {
        window.alert('✅ Producto agregado al carrito');
      }
      // Si no hay result, la alerta de stock ya fue mostrada por el contexto
    } catch (error) {
      window.alert('❌ Error al agregar al carrito');
    }
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
              <div className="producto-image">              <img 
                  src={producto.imagen || (() => {
                    switch(categoriaId) {
                      case 'hamburguesas':
                        return require('../assets/images/' + (
                          producto.nombre.toLowerCase().includes('next') ? 'nextlevelburguer.png' :
                          producto.nombre.toLowerCase().includes('sweet') ? 'sweet borguer.png' :
                          producto.nombre.toLowerCase().includes('chorizo') ? 'chorizoburguer.png' :
                          'hangover.png'
                        ));
                      case 'papas':
                        return require('../assets/images/' + (
                          producto.nombre.toLowerCase().includes('classic') ? 'classicfries.png' :
                          producto.nombre.toLowerCase().includes('sweet') ? 'sweetfies.png' :
                          producto.nombre.toLowerCase().includes('poulet') ? 'pouletfries.png' :
                          producto.nombre.toLowerCase().includes('cheddar') ? 'papascheddar.png' :
                          'classicfries.png'
                        ));
                      case 'bebidas':
                        return require('../assets/images/' + (
                          producto.nombre.toLowerCase().includes('coca') ? 'coca-cola.png' :
                          producto.nombre.toLowerCase().includes('soda') ? 'soda italiana.jpg' :
                          producto.nombre.toLowerCase().includes('fresada') ? 'fresada de coco.jpg' :
                          'coca-cola.png'
                        ));
                      case 'alitas':
                        return require('../assets/images/' + (
                          producto.nombre.toLowerCase().includes('personal x12') ? 'personalx12alas.png' :
                          producto.nombre.toLowerCase().includes('personal x6') ? 'personalx6alas.png' :
                          producto.nombre.toLowerCase().includes('x18') ? 'paracompartirx18.png' :
                          producto.nombre.toLowerCase().includes('x24') ? 'paracompartirx24.png' :
                          'personalx12alas.png'
                        ));
                      case 'hotdogs':
                        return require('../assets/images/' + (
                          producto.nombre.toLowerCase().includes('next') ? 'nextlevelhotdog.png' :
                          producto.nombre.toLowerCase().includes('classic') ? 'classichotdog.png' :
                          producto.nombre.toLowerCase().includes('sweet') ? 'sweethotdog.png' :
                          producto.nombre.toLowerCase().includes('mexican') ? 'mexicanhotdog.png' :
                          producto.nombre.toLowerCase().includes('alana') ? 'alanahotdog.png' :
                          'nextlevelhotdog.png'
                        ));
                      case 'entradas':
                        return require('../assets/images/' + (
                          producto.nombre.toLowerCase().includes('dedos') ? 'dedosqueso.png' :
                          producto.nombre.toLowerCase().includes('aros') ? 'aroscebolla.png' :
                          producto.nombre.toLowerCase().includes('chips') ? 'chipsplatano.png' :
                          'dedosqueso.png'
                        ));
                      default:
                        return require('../assets/images/default.png');
                    }
                  })()} 
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
