import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/carrito.scss';

// Ajusta la interfaz Producto para soportar datos del backend
interface Producto {
  id?: number;
  idCarrito?: number;
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

// Corrige el mapeo de productos para soportar datos del backend
const Carrito: React.FC<CarritoProps> = ({ productos, onRemoveFromCart, onUpdateQuantity }) => {
  const [cantidades, setCantidades] = useState<{ [key: number]: number }>({});
  const [total, setTotal] = useState(0);

  const getProductoKey = (producto: Producto) => producto.idCarrito ?? producto.id ?? 0;

  useEffect(() => {
    // Inicializar cantidades
    const initialCantidades = productos.reduce((acc, producto) => {
      const key = getProductoKey(producto);
      acc[key] = producto.cantidad || 1;
      return acc;
    }, {} as { [key: number]: number });
    setCantidades(initialCantidades);
  }, [productos]);

  useEffect(() => {
    // Calcular total
    const nuevoTotal = productos.reduce((sum, producto) => {
      const key = getProductoKey(producto);
      const precio = producto.precio || 0;
      const cantidad = producto.cantidad || cantidades[key] || 1;
      return sum + precio * cantidad;
    }, 0);
    setTotal(nuevoTotal);
  }, [productos, cantidades]);

  const actualizarCantidad = (productoKey: number, nuevaCantidad: number) => {
    if (nuevaCantidad > 0) {
      setCantidades(prev => ({
        ...prev,
        [productoKey]: nuevaCantidad
      }));
      onUpdateQuantity(productoKey, nuevaCantidad); // productoKey ahora es idCarrito
    }
  };

  const eliminarDelCarrito = (productoKey: number) => {
    onRemoveFromCart(productoKey); // productoKey ahora es idCarrito
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
              return (
                <div key={key} className="producto-carrito">
                  <img src={producto.imagen} alt={producto.nombre} />
                  <div className="producto-info">
                    <h3>{producto.nombre}</h3>
                    <p className="precio">${(producto.precio || 0).toFixed(2)}</p>
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
            <button className="btn btn-primary btn-pagar">
              Proceder al Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;