import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';
import '../styles/components/adminPedidos.scss';

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pedidosPorPagina] = useState(10);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchPedidos();
  }, [currentPage]);

  const fetchPedidos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getPedidos(currentPage, pedidosPorPagina);
      setPedidos(response.pedidos || []);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
      setError('No se pudieron cargar los pedidos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const actualizarEstadoPedido = async (id, nuevoEstado) => {
    try {
      setUpdateLoading(true);
      await adminService.updateOrderStatus(id, nuevoEstado);
      fetchPedidos(); // Recargar la lista después de actualizar
      setError(null);
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
      setError('No se pudo actualizar el estado del pedido. Por favor, intenta de nuevo.');
    } finally {
      setUpdateLoading(false);
    }
  };

  const verDetallesPedido = async (ventaId) => {
    try {
      const detalles = await adminService.getVentaDetails(ventaId);
      // Aquí podrías mostrar los detalles en un modal o expandir la card
      console.log(detalles);
    } catch (error) {
      console.error('Error al obtener detalles:', error);
      setError('No se pudieron cargar los detalles del pedido.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Cargando pedidos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </div>
        <button onClick={fetchPedidos} className="retry-button">
          <i className="fas fa-sync"></i> Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="admin-pedidos">
      <div className="pedidos-header">
        <h2>Gestión de Pedidos</h2>
        <div className="pedidos-actions">
          <button 
            onClick={fetchPedidos} 
            className="refresh-button"
            disabled={loading}
          >
            <i className="fas fa-sync"></i> Actualizar
          </button>
        </div>
      </div>

      {pedidos.length === 0 ? (
        <div className="no-pedidos">
          <i className="fas fa-inbox"></i>
          <p>No hay pedidos disponibles</p>
        </div>
      ) : (
        <div className="pedidos-list">
          {pedidos.map(pedido => (
            <div key={pedido.idVenta} className="pedido-card">
              <div className="pedido-header">
                <span className="pedido-id">Pedido #{pedido.idVenta}</span>
                <span className={`estado ${pedido.estado ? pedido.estado.toLowerCase() : 'sin-estado'}`}>
                  {pedido.estado || 'Sin estado'}
                </span>
                <span className="tipo-cliente">{pedido.tipo === 'anonimo' ? 'Anónimo' : 'Registrado'}</span>
              </div>
              <div className="pedido-content">
                <div className="cliente-info">
                  <h4>Cliente</h4>
                  <p>{pedido.cliente || 'Anónimo'}</p>
                  {pedido.idCliente && <p>ID Cliente: {pedido.idCliente}</p>}
                </div>
                <div className="productos">
                  <h4>Productos</h4>
                  {pedido.productos.map((item, index) => (
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
                <div className="fecha">
                  <h4>Fecha</h4>
                  <p>{pedido.fecha}</p>
                </div>
              </div>
              <div className="pedido-actions">
                <select
                  value={pedido.estado || 'Pendiente'}
                  onChange={(e) => actualizarEstadoPedido(pedido.idVenta, e.target.value)}
                  disabled={updateLoading}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Completado">Completado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
                <button
                  onClick={() => verDetallesPedido(pedido.idVenta)}
                  className="ver-detalles"
                  disabled={updateLoading}
                >
                  <i className="fas fa-eye"></i> Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {pedidos.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
          >
            <i className="fas fa-chevron-left"></i> Anterior
          </button>
          <span className="page-info">Página {currentPage}</span>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={pedidos.length < pedidosPorPagina || loading}
          >
            Siguiente <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPedidos;
