import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/recibo.scss';
import { getAnonId } from '../api/anonCart';
import { CarritoContext } from '../context/CarritoContext';

const ReciboAnonimo = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { vaciarCarrito, limpiarCarritoCompleto } = useContext(CarritoContext);

  useEffect(() => {
    const fetchRecibo = async () => {
      setLoading(true);
      try {
        const anonId = getAnonId();
        const res = await fetch(`http://localhost:5000/api/recibo-anonimo/${anonId}`);
        const data = await res.json();
        setProductos(data.productos || []);
        setTotal(data.total || 0);
      } catch (error) {
        setProductos([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchRecibo();
  }, []);

  return (
    <div className="recibo-container">
      <h1>Recibo de Compra (Anónimo)</h1>
      {loading ? (
        <p>Cargando recibo...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos en el recibo.</p>
      ) : (
        <>
          <table className="recibo-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => {
                const precio = Number(producto.precio) || 0;
                const cantidad = Number(producto.cantidad) || 0;
                return (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>${precio.toFixed(2)}</td>
                    <td>{cantidad}</td>
                    <td>${(precio * cantidad).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2>Total: ${total}</h2>
        </>
      )}
      <button
        onClick={async () => {
          await limpiarCarritoCompleto();
          alert('¡Bienvenido!');
          navigate('/');
        }}
        style={{ marginTop: '2rem' }}
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default ReciboAnonimo;
