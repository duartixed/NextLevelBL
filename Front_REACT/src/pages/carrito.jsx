import React, { useEffect, useState } from 'react';
import Carrito from '../components/carrito.tsx';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const CarritoPage = ({ fetchCartCount }) => {
  const [productos, setProductos] = useState([]);
  const idCliente = 1; // Simulación, luego conectar con auth

  // Obtener productos del carrito desde el backend
  const fetchCarrito = async () => {
    try {
      const res = await axios.get(`${API_URL}/carrito/${idCliente}`);
      setProductos(res.data);
    } catch (err) {
      setProductos([]);
    }
  };

  useEffect(() => {
    fetchCarrito();
  }, []);

  // Eliminar producto del carrito
  const handleRemoveFromCart = async (idCarrito) => {
    await axios.delete(`${API_URL}/carrito/${idCarrito}`);
    fetchCarrito();
    fetchCartCount(); // Actualizar el contador del carrito
  };

  // Actualizar cantidad de producto en el carrito
  const handleUpdateQuantity = async (idCarrito, cantidad) => {
    await axios.put(`${API_URL}/carrito/${idCarrito}`, { cantidad });
    fetchCarrito();
  };

  return (
    <div className="carrito-page">
      <Carrito 
        productos={productos} 
        onRemoveFromCart={handleRemoveFromCart} 
        onUpdateQuantity={handleUpdateQuantity} 
      />
    </div>
  );
};

export default CarritoPage;
