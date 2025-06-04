import React, { createContext, useState } from 'react';

// Crear el contexto del carrito
export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarAlCarrito = async (producto) => {
    try {
      await fetch(`http://localhost:5000/api/carrito`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idCliente: 1, idProducto: producto.id, cantidad: 1 }),
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
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  // Actualizar cantidad de un producto
  const actualizarCantidad = (id, cantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      )
    );
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad }}>
      {children}
    </CarritoContext.Provider>
  );
};
