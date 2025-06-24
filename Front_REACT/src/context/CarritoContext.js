import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { agregarAlCarritoAnonimo, obtenerCarritoAnonimo, eliminarDelCarritoAnonimo, actualizarCantidadAnonimo, getAnonId } from '../api/anonCart';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const fetchCartCount = async (clientId) => {
    try {
      if (user) {
        // Usuario registrado
        const res = await fetch(`http://localhost:5000/api/carrito/${clientId}`);
        if (!res.ok) throw new Error('Error al obtener el carrito');
        const data = await res.json();
        let total = 0;
        data.forEach((item) => {
          total += item.cantidad;
        });
        setCartCount(total);
        setCarrito(data);
      } else {
        // Anónimo
        const data = await obtenerCarritoAnonimo();
        let total = 0;
        data.forEach((item) => {
          total += item.cantidad;
        });
        setCartCount(total);
        setCarrito(data);
      }
    } catch (err) {
      setCartCount(0);
      setCarrito([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartCount(user.idCliente);
    } else {
      fetchCartCount();
    }
  }, [user]);

  const agregarAlCarrito = async (producto) => {
    setLoading(true);
    try {
      if (user) {
        // USUARIO REGISTRADO: usa el endpoint de clientes
        const clientId = user.idCliente;
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
      } else {
        // USUARIO ANÓNIMO: usa solo el endpoint de carritos anónimos
        await agregarAlCarritoAnonimo(producto.idProducto, 1);
        // Refresca el estado igual que usuarios registrados
        await fetchCartCount();
        const data = await obtenerCarritoAnonimo();
        setCarrito(data);
        setLoading(false);
        return { message: 'Producto agregado al carrito anónimo' };
      }
    } catch (error) {
      console.error('Error en agregarAlCarrito:', error);
      setLoading(false);
      throw error;
    }
  };

  const actualizarCantidad = async (idCarrito, cantidad) => {
    try {
      if (user) {
        // Usuario registrado
        const response = await fetch(`http://localhost:5000/api/carrito/${idCarrito}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cantidad })
        });
        if (!response.ok) throw new Error('Error al actualizar cantidad');
        await fetchCartCount(user.idCliente);
        return await response.json();
      } else {
        // Anónimo
        await actualizarCantidadAnonimo(idCarrito, cantidad);
        await fetchCartCount();
        // Refresca el carrito también
        const data = await obtenerCarritoAnonimo();
        setCarrito(data);
        return { message: 'Cantidad actualizada en carrito anónimo' };
      }
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      throw error;
    }
  };

  const eliminarDelCarrito = async (idCarrito) => {
    try {
      if (user) {
        const response = await fetch(`http://localhost:5000/api/carrito/${idCarrito}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar del carrito');
        await fetchCartCount(user.idCliente);
        return await response.json();
      } else {
        await eliminarDelCarritoAnonimo(idCarrito);
        await fetchCartCount();
        // Refresca el carrito también
        const data = await obtenerCarritoAnonimo();
        setCarrito(data);
        return { message: 'Producto eliminado del carrito anónimo' };
      }
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      throw error;
    }
  };


  // Vacía el carrito y el contador, y limpia en backend/localStorage
  const vaciarCarrito = () => {
    setCarrito([]);
    setCartCount(0);
    if (!user) {
      localStorage.removeItem('anonCart');
    }
  };

  // Limpia el carrito en backend y localStorage según el tipo de usuario
  const limpiarCarritoCompleto = async () => {
    if (user) {
      // Limpiar carrito en backend para usuario registrado (vaciar todo)
      try {
        await fetch(`http://localhost:5000/api/carrito/vaciar/${user.idCliente}`, {
          method: 'DELETE',
        });
      } catch (e) { /* ignorar error */ }
      await fetchCartCount(user.idCliente); // Refresca el estado desde backend
    } else {
      // Limpiar carrito anónimo en localStorage y backend (vaciar todo)
      const anonId = getAnonId(); // OBTENER ANTES DE LIMPIAR
      try {
        if (anonId) {
          await fetch(`http://localhost:5000/api/carrito-anonimo/vaciar/${anonId}`, {
            method: 'DELETE',
          });
        }
      } catch (e) { /* ignorar error */ }
      localStorage.removeItem('anonCart');
      localStorage.removeItem('anonId'); // Elimina el identificador anónimo tras la compra
      setCarrito([]);
      setCartCount(0);
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
      fetchCartCount,
      vaciarCarrito,
      limpiarCarritoCompleto
    }}>
      {children}
    </CarritoContext.Provider>
  );
};
