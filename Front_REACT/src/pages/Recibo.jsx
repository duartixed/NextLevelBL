import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/recibo.scss';
import { CarritoContext } from '../context/CarritoContext';
import Alert from '../components/Alert.jsx';

const Recibo = () => {
  const { idCliente } = useParams();
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [alerta, setAlerta] = useState(null);
  const { vaciarCarrito, limpiarCarritoCompleto } = useContext(CarritoContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecibo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/generate-receipt/${idCliente}`);
        const data = await res.json();
        setProductos(data.productos);
        setTotal(data.total);
      } catch (error) {
        console.error('Error al obtener el recibo:', error);
      }
    };
    fetchRecibo();
  }, [idCliente]);

  return (
    <div className="recibo-container">
      <h1>Recibo de Compra</h1>
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
      <div className="recibo-total">
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
      <button
        onClick={async () => {
          vaciarCarrito(); // Limpiar estado visual inmediato
          await limpiarCarritoCompleto();
          setAlerta({ type: 'success', message: '¡Gracias por tu compra!' });
          setTimeout(() => {
            setAlerta(null);
            navigate('/');
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

export default Recibo;
