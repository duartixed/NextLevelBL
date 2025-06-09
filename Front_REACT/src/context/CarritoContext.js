import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const fetchCartCount = async (clientId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/carrito/${clientId}`);
      if (!res.ok) throw new Error('Error al obtener el carrito');
      const data = await res.json();
      let total = 0;
      data.forEach((item) => {
        total += item.cantidad;
      });
      setCartCount(total);
      setCarrito(data);
    } catch (err) {
      console.error('Error al obtener el carrito:', err);
      setCartCount(0);
      setCarrito([]);
    }
  };  useEffect(() => {
    if (user) {
      fetchCartCount(user.idCliente);
    } else {
      fetchCartCount(1); // Cliente anónimo
    }
  }, [user]);  const agregarAlCarrito = async (producto) => {
    setLoading(true);
    try {
      const clientId = user ? user.idCliente : 1;
      
      const response = await fetch('http://localhost:5000/api/carrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idCliente: clientId,
          idProducto: producto.idProducto,
          cantidad: 1
        })
      });

      if (!response.ok) {
        throw new Error('Error al agregar al carrito');
      }

      await fetchCartCount(clientId);
      setLoading(false);
      return await response.json();
    } catch (error) {
      console.error('Error en agregarAlCarrito:', error);
      setLoading(false);
      throw error;
    }
  };

  const actualizarCantidad = async (idCarrito, cantidad) => {
    try {
      const response = await fetch(`http://localhost:5000/api/carrito/${idCarrito}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cantidad })
      });
      if (!response.ok) throw new Error('Error al actualizar cantidad');
      await fetchCartCount();
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      throw error;
    }
  };

  const eliminarDelCarrito = async (idCarrito) => {
    try {
      const response = await fetch(`http://localhost:5000/api/carrito/${idCarrito}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar del carrito');
      await fetchCartCount();
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      throw error;
    }
  };

  return (
    <CarritoContext.Provider value={{
      carrito,
      cartCount,
      loading,
      agregarAlCarrito,
      actualizarCantidad,
      eliminarDelCarrito,
      fetchCartCount
    }}>
      {children}
    </CarritoContext.Provider>
  );
};
