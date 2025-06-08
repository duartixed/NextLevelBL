import React, { useEffect, useContext } from 'react';
import Carrito from '../components/carrito.tsx';
import Footer from '../components/footer.jsx';
import axios from 'axios';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/components/carrito.scss';

const API_URL = 'http://localhost:5000/api';

const CarritoPage = () => {
  const { carrito, fetchCartCount } = useContext(CarritoContext);
  const { user } = useContext(AuthContext);
  const idCliente = user ? user.idCliente : 1;

  // Eliminar producto del carrito
  const handleRemoveFromCart = async (idCarrito) => {
    try {
      await axios.delete(`${API_URL}/carrito/${idCarrito}`);
      await fetchCartCount();
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  };

  // Actualizar cantidad de producto en el carrito
  const handleUpdateQuantity = async (idCarrito, cantidad) => {
    try {
      await axios.put(`${API_URL}/carrito/${idCarrito}`, { cantidad });
      await fetchCartCount();
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
    }
  };

  return (
    <div className="carrito-container">
      <Carrito 
        productos={carrito}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <Footer />
    </div>
  );
};

export default CarritoPage;
