import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/components/adminPedidos.scss';

const API_URL = 'http://localhost:5000/api';

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/pedidos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPedidos(res.data);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const actualizarEstadoPedido = async (id, nuevoEstado) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/pedidos/${id}`, 
        { estado: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      fetchPedidos();
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
    }
  };

  if (loading) {
    return <div className="loading">Cargando pedidos...</div>;
  }

  return (
    <div className="admin-pedidos">
      <h2>Gestión de Pedidos</h2>
      <div className="pedidos-list">
        {pedidos.map(pedido => (
          <div key={pedido.id} className="pedido-card">
            <div className="pedido-header">
              <span className="pedido-id">Pedido #{pedido.id}</span>
              <span className={`estado ${pedido.estado.toLowerCase()}`}>
                {pedido.estado}
              </span>
            </div>
            <div className="pedido-content">
              <div className="cliente-info">
                <h4>Cliente</h4>
                <p>{pedido.nombreCliente}</p>
                <p>{pedido.email}</p>
              </div>
              <div className="productos">
                <h4>Productos</h4>
                {pedido.items.map((item, index) => (
                  <div key={index} className="producto-item">
                    <span>{item.cantidad}x {item.nombre}</span>
                    <span>${item.precio}</span>
                  </div>
                ))}
              </div>
              <div className="total">
                <h4>Total</h4>
                <p>${pedido.total}</p>
              </div>
            </div>
            <div className="pedido-actions">
              <select
                value={pedido.estado}
                onChange={(e) => actualizarEstadoPedido(pedido.id, e.target.value)}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Preparación">En Preparación</option>
                <option value="Listo">Listo</option>
                <option value="Entregado">Entregado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPedidos;
