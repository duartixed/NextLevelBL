import React, { useEffect, useState, useContext } from 'react';
import Carrito from '../components/carrito.tsx';
import Footer from '../components/footer.jsx';
import axios from 'axios';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/components/carrito.scss';

const API_URL = 'http://localhost:5000/api';

const CarritoPage = () => {
  const [productos, setProductos] = useState([]);
  const { user } = useContext(AuthContext);
  const { fetchCartCount } = useContext(CarritoContext);
  const [isUnmounted, setIsUnmounted] = useState(false);

  // Obtener productos del carrito desde el backend
  const fetchCarrito = async () => {
    try {
      const clientId = user ? user.idCliente : 1;
      const res = await axios.get(`${API_URL}/carrito/${clientId}`);
      if (!isUnmounted) {
        setProductos(res.data);
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

  // Eliminar producto del carrito
  const handleRemoveFromCart = async (idCarrito) => {
    if (isUnmounted) return;
    try {
      await axios.delete(`${API_URL}/carrito/${idCarrito}`);
      await fetchCarrito();
      await fetchCartCount(user ? user.idCliente : 1);
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  };

  // Actualizar cantidad de producto en el carrito
  const handleUpdateQuantity = async (idCarrito, cantidad) => {
    if (isUnmounted) return;
    try {
      await axios.put(`${API_URL}/carrito/${idCarrito}`, { cantidad });
      await fetchCarrito();
      await fetchCartCount(user ? user.idCliente : 1);
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
