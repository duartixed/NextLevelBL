import React, { useEffect, useState, useContext } from 'react';
import Carrito from '../components/carrito.tsx';
import Footer from '../components/footer.jsx';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import { obtenerCarritoAnonimo } from '../api/anonCart';
import '../styles/components/carrito.scss';

const API_URL = 'http://localhost:5000/api';

const CarritoPage = () => {
  const [productos, setProductos] = useState([]);
  const { user } = useContext(AuthContext);
  const { carrito, fetchCartCount, eliminarDelCarrito, actualizarCantidad } = useContext(CarritoContext);
  const [isUnmounted, setIsUnmounted] = useState(false);

  // Obtener productos del carrito desde el backend
  const fetchCarrito = async () => {
    try {
      if (user) {
        const clientId = user.idCliente;
        const res = await fetch(`${API_URL}/carrito/${clientId}`);
        if (!res.ok) throw new Error('Error al obtener el carrito');
        const data = await res.json();
        if (!isUnmounted) {
          setProductos(data);
        }
      } else {
        const data = await obtenerCarritoAnonimo();
        if (!isUnmounted) {
          setProductos(data);
        }
      }
    } catch (err) {
      console.error('Error al obtener el carrito:', err);
      if (!isUnmounted) {
        setProductos([]);
      }
    }
  };

  useEffect(() => {
    setIsUnmounted(false);
    fetchCarrito();
    return () => setIsUnmounted(true);
  }, [user]);

  // Sincroniza productos locales con el contexto global del carrito
  useEffect(() => {
    if (!user) {
      setProductos(carrito);
    }
  }, [carrito, user]);

  // Eliminar producto del carrito
  const handleRemoveFromCart = async (idCarrito) => {
    if (isUnmounted) return;
    try {
      await eliminarDelCarrito(idCarrito);
      await fetchCarrito();
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  };

  // Actualizar cantidad de producto en el carrito
  const handleUpdateQuantity = async (idCarrito, cantidad) => {
    if (isUnmounted) return;
    try {
      await actualizarCantidad(idCarrito, cantidad);
      await fetchCarrito();
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
    }
  };

  return (
    <>      <div className="carrito-page">
        <div className="carrito-container">
          <h2>Mi Carrito</h2>
          <Carrito 
            productos={productos} 
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CarritoPage;
