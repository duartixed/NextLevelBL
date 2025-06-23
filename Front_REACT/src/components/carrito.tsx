import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/carrito.scss';

// Ajusta la interfaz Producto para soportar datos del backend
interface Producto {
  id?: number;
  idCarrito?: number;
  idProducto?: number; // Para carritos anónimos
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  cantidad?: number;
}

interface CarritoProps {
  productos: Producto[];
  onRemoveFromCart: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const Carrito: React.FC<CarritoProps> = ({ productos, onRemoveFromCart, onUpdateQuantity }) => {
  const [cantidades, setCantidades] = useState<{ [key: number]: number }>({});
  const [total, setTotal] = useState(0);

  // Para usuarios registrados: idCarrito; para anónimos: idProducto
  const getProductoKey = (producto: Producto) =>
    producto.idCarrito !== undefined && producto.idCarrito !== null
      ? producto.idCarrito
      : (producto.idProducto !== undefined ? producto.idProducto : (producto.id ?? 0));

  // Calcular el total cuando cambien los productos o las cantidades
  useEffect(() => {
    const calcularTotal = () => {
      return productos.reduce((sum, producto) => {
        const cantidad = producto.cantidad || 1;
        const precio = Number(producto.precio) || 0;
        return sum + (precio * cantidad);
      }, 0);
    };

    const nuevoTotal = calcularTotal();
    setTotal(nuevoTotal);
  }, [productos]);

  useEffect(() => {
    // Inicializar cantidades desde el backend
    const initialCantidades = productos.reduce((acc, producto) => {
      const key = getProductoKey(producto);
      acc[key] = producto.cantidad || 1;
      return acc;
    }, {} as { [key: number]: number });
    setCantidades(initialCantidades);
  }, [productos]);

  const actualizarCantidad = (productoKey: number, nuevaCantidad: number) => {
    if (nuevaCantidad > 0) {
      setCantidades(prev => ({
        ...prev,
        [productoKey]: nuevaCantidad
      }));
      onUpdateQuantity(productoKey, nuevaCantidad);
    }
  };

  const eliminarDelCarrito = (productoKey: number) => {
    onRemoveFromCart(productoKey);
  };

  return (
    <div className="carrito-container">
      <h2>Tu Carrito</h2>
      {productos.length === 0 ? (
        <div className="carrito-vacio">
          <p>Tu carrito está vacío</p>
          <Link to="/menu" className="btn btn-primary">Ver Menú</Link>
        </div>
      ) : (
        <>
          <div className="productos-carrito">
            {productos.map((producto) => {
              const key = getProductoKey(producto);
              const precioNumerico = Number(producto.precio) || 0;
              return (
                <div key={key} className="producto-carrito">
                  <img src={producto.imagen || (() => {
                    // Determinar la categoría basada en el nombre del producto
                    const nombre = producto.nombre.toLowerCase();
                    if (nombre.includes('hamburguesa') || nombre.includes('burger')) {
                      return require('../assets/images/' + (
                        nombre.includes('next') ? 'nextlevelburguer.png' :
                        nombre.includes('sweet') ? 'sweet borguer.png' :
                        nombre.includes('chorizo') ? 'chorizoburguer.png' :
                        'hangover.png'
                      ));
                    } else if (nombre.includes('papa') || nombre.includes('fries')) {
                      return require('../assets/images/' + (
                        nombre.includes('classic') ? 'classicfries.png' :
                        nombre.includes('sweet') ? 'sweetfies.png' :
                        nombre.includes('poulet') ? 'pouletfries.png' :
                        nombre.includes('cheddar') ? 'papascheddar.png' :
                        'classicfries.png'
                      ));
                    } else if (nombre.includes('coca') || nombre.includes('bebida') || nombre.includes('soda')) {
                      return require('../assets/images/' + (
                        nombre.includes('coca') ? 'coca-cola.png' :
                        nombre.includes('soda') ? 'soda italiana.jpg' :
                        nombre.includes('fresada') ? 'fresada de coco.jpg' :
                        'coca-cola.png'
                      ));
                    } else if (nombre.includes('alita') || nombre.includes('wings')) {
                      return require('../assets/images/' + (
                        nombre.includes('x12') ? 'personalx12alas.png' :
                        nombre.includes('x6') ? 'personalx6alas.png' :
                        nombre.includes('x18') ? 'paracompartirx18.png' :
                        nombre.includes('x24') ? 'paracompartirx24.png' :
                        'personalx12alas.png'
                      ));
                    } else if (nombre.includes('hot dog') || nombre.includes('perro')) {
                      return require('../assets/images/' + (
                        nombre.includes('next') ? 'nextlevelhotdog.png' :
                        nombre.includes('classic') ? 'classichotdog.png' :
                        nombre.includes('sweet') ? 'sweethotdog.png' :
                        nombre.includes('mexican') ? 'mexicanhotdog.png' :
                        nombre.includes('alana') ? 'alanahotdog.png' :
                        'nextlevelhotdog.png'
                      ));
                    } else if (nombre.includes('dedo') || nombre.includes('aro') || nombre.includes('entrada')) {
                      return require('../assets/images/' + (
                        nombre.includes('dedo') ? 'dedosqueso.png' :
                        nombre.includes('aro') ? 'aroscebolla.png' :
                        nombre.includes('chip') ? 'chipsplatano.png' :
                        'dedosqueso.png'
                      ));
                    }
                    return require('../assets/images/default.png');
                  })()} alt={producto.nombre} />
                  <div className="producto-info">
                    <h3>{producto.nombre}</h3>
                    <p className="precio">${precioNumerico.toFixed(2)}</p>
                    <p className="subtotal">Subtotal: ${(precioNumerico * (producto.cantidad || 1)).toFixed(2)}</p>
                  </div>
                  <div className="cantidad-controles">
                    <button 
                      onClick={() => actualizarCantidad(key, (cantidades[key] || 1) - 1)}
                      className="btn-cantidad"
                    >
                      -
                    </button>
                    <span>{cantidades[key] || producto.cantidad || 1}</span>
                    <button 
                      onClick={() => actualizarCantidad(key, (cantidades[key] || 1) + 1)}
                      className="btn-cantidad"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => eliminarDelCarrito(key)}
                    className="btn-eliminar"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
          <div className="carrito-footer">
            <div className="total">
              <span>Total:</span>
              <span className="precio-total">${total.toFixed(2)}</span>
            </div>
            <Link to="/pago-nequi-info" className="btn btn-primary btn-pagar">
              Proceder al Pago
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;