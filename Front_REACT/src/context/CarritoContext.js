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
      const cantidad = producto.cantidad || 1;
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
            cantidad
          })
        });
        if (!response.ok) {
          // Intenta leer el mensaje de error del backend
          let errorMsg = 'Error al agregar al carrito';
          try {
            const errData = await response.json();
            if (errData && errData.error && errData.error.includes('Stock insuficiente')) {
              setLoading(false);
              window.alert('No hay suficiente stock para agregar más de este producto.');
              return null;
            } else if (errData && errData.error) {
              errorMsg = errData.error;
            }
          } catch {}
          setLoading(false);
          throw new Error(errorMsg);
        }
        await fetchCartCount(clientId);
        setLoading(false);
        return { message: 'Producto agregado al carrito correctamente.' };
      } else {
        // USUARIO ANÓNIMO: usa solo el endpoint de carritos anónimos
        try {
          await agregarAlCarritoAnonimo(producto.idProducto, cantidad);
        } catch (error) {
          setLoading(false);
          if (error && error.message && error.message.includes('Stock insuficiente')) {
            window.alert('No hay suficiente stock para agregar más de este producto.');
            return null;
          }
          throw error;
        }
        // Refresca el estado solo si se agregó correctamente
        const data = await obtenerCarritoAnonimo();
        setCarrito(data);
        let total = 0;
        data.forEach((item) => {
          total += item.cantidad;
        });
        setCartCount(total);
        setLoading(false);
        return { message: 'Producto agregado al carrito anónimo' };
      }
    } catch (error) {
      setLoading(false);
      console.error('Error en agregarAlCarrito:', error);
      throw error;
    }
  };

  const actualizarCantidad = async (idCarrito, cantidad) => {
    setLoading(true);
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
        if (!response.ok) {
          let errorMsg = 'Error al actualizar cantidad';
          try {
            const errData = await response.json();
            if (errData && errData.error && errData.error.includes('Stock insuficiente')) {
              alert('No hay suficiente stock para actualizar la cantidad de este producto.');
              setLoading(false);
              // Refresca el carrito y el contador para mantener la UI consistente
              await fetchCartCount(user.idCliente);
              return;
            } else if (errData && errData.error) {
              errorMsg = errData.error;
            }
          } catch {}
          setLoading(false);
          throw new Error(errorMsg);
        }
        await fetchCartCount(user.idCliente);
        setLoading(false);
        return await response.json();
      } else {
        // Anónimo
        try {
          await actualizarCantidadAnonimo(idCarrito, cantidad);
        } catch (error) {
          if (error && error.message && error.message.includes('Stock insuficiente')) {
            alert('No hay suficiente stock para actualizar la cantidad de este producto.');
            setLoading(false);
            // Refresca el carrito y el contador para mantener la UI consistente
            await fetchCartCount();
            const data = await obtenerCarritoAnonimo();
            setCarrito(data);
            return;
          }
          setLoading(false);
          throw error;
        }
        await fetchCartCount();
        // Refresca el carrito también
        const data = await obtenerCarritoAnonimo();
        setCarrito(data);
        setLoading(false);
        return { message: 'Cantidad actualizada en carrito anónimo' };
      }
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      setLoading(false);
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
