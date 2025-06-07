import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto del carrito
export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const idCliente = 1; // Cambiar según la lógica de autenticación

  // Actualiza el contador del carrito
  const fetchCartCount = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/carrito/${idCliente}`);
      const data = await res.json();
      let total = 0;
      data.forEach((item) => {
        total += item.cantidad;
      });
      setCartCount(total);
    } catch (err) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  // Agregar producto al carrito
  const agregarAlCarrito = async (producto) => {
    try {
      await fetch(`http://localhost:5000/api/carrito`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idCliente, idProducto: producto.id, cantidad: 1 }),
      });

      setCarrito((prevCarrito) => {
        const productoExistente = prevCarrito.find((item) => item.id === producto.id);
        if (productoExistente) {
          return prevCarrito.map((item) =>
            item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
          );
        } else {
          return [...prevCarrito, { ...producto, cantidad: 1 }];
        }
      });

      alert(`${producto.nombre} agregado al carrito!`);
      fetchCartCount(); // Actualizar el contador del carrito en tiempo real
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  return (
    <CarritoContext.Provider value={{ carrito, cartCount, agregarAlCarrito, fetchCartCount }}>
      {children}
    </CarritoContext.Provider>
  );
};
