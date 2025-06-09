import React, { useEffect, useState, useContext } from 'react';
import Carrito from '../components/carrito.tsx';
import Footer from '../components/footer.jsx';
import axios from 'axios';
import { CarritoContext } from '../context/CarritoContext';
import '../styles/components/carrito.scss';

const API_URL = 'http://localhost:5000/api';

const CarritoPage = () => {
  const [productos, setProductos] = useState([]);
  const idCliente = 1; // Simulación, luego conectar con auth
  const { fetchCartCount } = useContext(CarritoContext);

  // Obtener productos del carrito desde el backend
  const fetchCarrito = async () => {
    try {
      const res = await axios.get(`${API_URL}/carrito/${idCliente}`);
      setProductos(res.data);
    } catch (err) {
      console.error('Error al obtener el carrito:', err);
      setProductos([]);
    }
  };

  useEffect(() => {
    fetchCarrito();
  }, []);

  // Eliminar producto del carrito
  const handleRemoveFromCart = async (idCarrito) => {
    try {
      await axios.delete(`${API_URL}/carrito/${idCarrito}`);
      await fetchCarrito();
      await fetchCartCount();
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  };

  // Actualizar cantidad de producto en el carrito
  const handleUpdateQuantity = async (idCarrito, cantidad) => {
    try {
      await axios.put(`${API_URL}/carrito/${idCarrito}`, { cantidad });
      await fetchCarrito();
      await fetchCartCount();
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
