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

  // Sincroniza el contador cada vez que el carrito cambia (por si se vacía)
  useEffect(() => {
    fetchCartCount();
  }, [carrito]);

  // Agregar producto al carrito
  const agregarAlCarrito = async (producto) => {
    try {
      const idProducto = producto.idProducto || producto.id;
      await fetch(`http://localhost:5000/api/carrito`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idCliente, idProducto, cantidad: 1 }),
      });
      // Después de agregar, obtener el carrito real del backend
      const res = await fetch(`http://localhost:5000/api/carrito/${idCliente}`);
      const data = await res.json();
      setCarrito(data);
      setCartCount(data.reduce((acc, item) => acc + item.cantidad, 0));
      alert(`${producto.nombre} agregado al carrito!`);
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
