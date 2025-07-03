import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/nequi.scss';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import { getAnonId, obtenerCarritoAnonimo } from '../api/anonCart';
import axiosInstance from '../api/axioInstance';

const PagoNequi = () => {
  const { carrito, fetchCartCount, limpiarCarritoCompleto } = useContext(CarritoContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleConfirmarPago = async () => {
    setLoading(true);
    setError(null);
    try {
      let productos = [];
      let total = 0;
      if (user) {
        // Usuario registrado
        productos = carrito.map(p => ({
          idProducto: p.idProducto,
          cantidad: p.cantidad,
          precio: p.precio
        }));
        total = productos.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
        const res = await axiosInstance.post('/api/checkout', {
          idCliente: user.idCliente,
          productos,
          total,
          metodoPago: 'nequi'
        });
        await limpiarCarritoCompleto(); // Limpiar carrito en backend y frontend
        navigate(`/recibo/${user.idCliente}`);
      } else {
        // Usuario anónimo
        const anonId = getAnonId();
        const anonCarrito = await obtenerCarritoAnonimo();
        productos = anonCarrito.map(p => ({
          idProducto: p.idProducto,
          cantidad: p.cantidad,
          precio: p.precio,
          nombre: p.nombre // para mostrar en recibo
        }));
        total = productos.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
        // Guardar recibo en localStorage antes de limpiar
        localStorage.setItem('anonReceipt', JSON.stringify({ productos, total }));
        await axiosInstance.post('/api/checkout', {
          productos,
          total,
          metodoPago: 'nequi',
          infoAnonimo: { anonId }
        });
        await limpiarCarritoCompleto(); // Limpiar carrito anónimo en backend y frontend
        navigate('/recibo-anonimo');
      }
    } catch (err) {
      setError('Error al procesar el pago. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nequi-container">
      <h1 className="nequi-header">Pago solo por Nequi</h1>
      <p className="nequi-info">
        Por el momento, solo aceptamos pagos a través de <b>Nequi</b>.<br /><br />
        Al finalizar tu pedido, te contactaremos para enviarte los datos de pago y confirmar tu compra.
      </p>
      <img
        src="https://seeklogo.com/images/N/nequi-logo-6B6A6A6B2B-seeklogo.com.png"
        alt="Nequi Logo"
        className="nequi-logo"
      />
      <button className="nequi-button" onClick={handleConfirmarPago} disabled={loading}>
        {loading ? 'Procesando...' : 'Confirmar Pago'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PagoNequi;
