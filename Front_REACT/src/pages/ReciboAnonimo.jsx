import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/recibo.scss';
import { getAnonId } from '../api/anonCart';
import { CarritoContext } from '../context/CarritoContext';
import Alert from '../components/Alert.jsx';

const ReciboAnonimo = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [alerta, setAlerta] = useState(null);
  const navigate = useNavigate();
  const { vaciarCarrito, limpiarCarritoCompleto } = useContext(CarritoContext);

  useEffect(() => {
    const fetchRecibo = async () => {
      setLoading(true);
      try {
        // Intentar leer de localStorage primero
        const localReceipt = localStorage.getItem('anonReceipt');
        if (localReceipt) {
          const { productos: productosLS, total: totalLS } = JSON.parse(localReceipt);
          setProductos(productosLS || []);
          setTotal(totalLS || 0);
          setLoading(false);
          return;
        }
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
          setAlerta({ type: 'success', message: '¡Gracias por tu compra!' });
          setTimeout(async () => {
            setAlerta(null);
            navigate('/');
            window.dispatchEvent(new Event('storage'));
            // Limpiar carrito después de volver al inicio
            vaciarCarrito();
            await limpiarCarritoCompleto();
            setProductos([]);
            localStorage.removeItem('anonReceipt'); // Limpiar recibo guardado
          }, 1200);
        }}
        style={{ marginTop: '2rem' }}
      >
        Volver al inicio
      </button>
      {alerta && <Alert type={alerta.type} message={alerta.message} onClose={() => setAlerta(null)} />}
    </div>
  );
};

export default ReciboAnonimo;
