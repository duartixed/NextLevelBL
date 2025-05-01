/*import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/imagenes/logo.png';
import carritoIcon from '../assets/imagenes/icono-carrito.png';
import './Carrito.css'; // Estilos específicos del carrito

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

const CarritoPage: React.FC = () => {
  const [carrito, setCarrito] = useState<Producto[]>(() => {
    // Cargar carrito desde localStorage al inicializar
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Actualizar localStorage cuando cambia el carrito
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Calcular total
  const calcularTotal = () => {
    return carrito.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad);
    }, 0);
  };

  // Aumentar cantidad de un producto
  const aumentarCantidad = (id: number) => {
    setCarrito(carrito.map(producto => 
      producto.id === id 
        ? { ...producto, cantidad: producto.cantidad + 1 } 
        : producto
    ));
  };

  // Disminuir cantidad de un producto
  const disminuirCantidad = (id: number) => {
    setCarrito(carrito.map(producto => 
      producto.id === id && producto.cantidad > 1
        ? { ...producto, cantidad: producto.cantidad - 1 } 
        : producto
    ));
  };

  // Eliminar producto del carrito
  const eliminarProducto = (id: number) => {
    setCarrito(carrito.filter(producto => producto.id !== id));
  };

  // Vaciar todo el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <div className="carrito-page">
      {/* Header }
      <header>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/menu">Menú</Link></li>
            <li><Link to="/reservas">Reservas</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/login">Iniciar Sesión</Link></li>
            <li><Link to="/signup">Crear Cuenta</Link></li>
          </ul>
        </nav>
        <div className="carrito">
          <Link to="/carrito">
            <img src={carritoIcon} alt="Carrito" />
            <span className="contador-carrito">
              {carrito.reduce((total, prod) => total + prod.cantidad, 0)}
            </span>
          </Link>
        </div>
      </header>

      {/* Contenido del Carrito }
      <main className="carrito-contenido">
        <h1>Tu Carrito de Compras</h1>
        
        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <p>Tu carrito está vacío</p>
            <Link to="/menu" className="btn-volver-menu">Ver Menú</Link>
          </div>
        ) : (
          <>
            <div className="lista-carrito">
              {carrito.map((producto) => (
                <div key={producto.id} className="item-carrito">
                  <div className="item-info">
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre} 
                      className="item-imagen"
                    />
                    <div>
                      <h3>{producto.nombre}</h3>
                      <p>${producto.precio.toFixed(2)} c/u</p>
                    </div>
                  </div>
                  <div className="item-cantidad">
                    <button 
                      onClick={() => disminuirCantidad(producto.id)}
                      disabled={producto.cantidad <= 1}
                    >
                      -
                    </button>
                    <span>{producto.cantidad}</span>
                    <button onClick={() => aumentarCantidad(producto.id)}>+</button>
                  </div>
                  <div className="item-subtotal">
                    ${(producto.precio * producto.cantidad).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => eliminarProducto(producto.id)}
                    className="btn-eliminar"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="total">
              <p>
                Total: <span className="total-precio">${calcularTotal().toFixed(2)}</span>
              </p>
              <div className="acciones-carrito">
                <button 
                  onClick={vaciarCarrito}
                  className="btn-vaciar"
                >
                  Vaciar Carrito
                </button>
                <Link to="/checkout" className="btn-pagar">
                  Proceder al Pago
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer }
      <footer>
        <p>&copy; 2024 Restaurante Gourmet. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default CarritoPage;*/