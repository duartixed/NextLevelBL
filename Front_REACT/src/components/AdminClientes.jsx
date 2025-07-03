import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';
import '../styles/components/adminClientes.scss';

const AdminClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    fetchClientes();
  }, [page]);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await adminService.getClientes(page, limit);
      setClientes(response.clientes || []);
      setTotalPages(Math.ceil(response.total / limit));
      setError(null);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      setError('Error al cargar los clientes. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchClientes();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <div className="loading">Cargando clientes...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={handleRetry} className="retry-button">
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="admin-clientes">
      <h2>Gestión de Clientes</h2>
      
      <div className="clientes-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Total Pedidos</th>
              <th>Última Compra</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.idCliente}>
                <td>{cliente.idCliente}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono || 'N/A'}</td>
                <td>{cliente.direccion || 'N/A'}</td>
                <td>{cliente.totalCompras || 0}</td>
                <td>N/A</td>
                <td>
                  <span className="estado">Activo</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => handlePageChange(page - 1)} 
              disabled={page === 1}
            >
              Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button 
              onClick={() => handlePageChange(page + 1)} 
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClientes;
