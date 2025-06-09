import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminProductos from '../components/AdminProductos';
import '../styles/components/adminPanel.scss';
import adminService from '../services/adminService';

const AdminPanel = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState({
    totalVentas: 0,
    totalProductos: 0,
    totalUsuarios: 0,
    ventasRecientes: []
  });
  const [monthlySales, setMonthlySales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [statsData, salesData] = await Promise.all([
          adminService.getStats(),
          adminService.getMonthlySales()
        ]);
        setStats(statsData);
        setMonthlySales(salesData);
        setError(null);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Error al cargar los datos del dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (user?.idRol === 2) {
      fetchDashboardData();
    }
  }, [user]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      // Refrescar los datos después de actualizar
      const newStats = await adminService.getStats();
      setStats(newStats);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const renderSalesChart = () => {
    return (
      <div className="sales-chart-container">
        <h3>Ventas Mensuales</h3>
        <div className="chart-grid">
          {monthlySales.map((sale) => (
            <div 
              key={sale.mes} 
              className="chart-bar"
              style={{ 
                height: `${(sale.total / Math.max(...monthlySales.map(s => s.total))) * 100}%`
              }}
            >
              <span className="chart-value">${sale.total.toFixed(2)}</span>
              <span className="chart-label">{sale.mes}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <>
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="icon">💰</div>
          <h3>Ventas Totales</h3>
          <p className="stat-number">${stats.totalVentas.toFixed(2)}</p>
          <p className="stat-label">Ingresos generados</p>
        </div>
        <div className="stat-card">
          <div className="icon">🍔</div>
          <h3>Productos</h3>
          <p className="stat-number">{stats.totalProductos}</p>
          <p className="stat-label">Productos en menú</p>
        </div>
        <div className="stat-card">
          <div className="icon">👥</div>
          <h3>Usuarios</h3>
          <p className="stat-number">{stats.totalUsuarios}</p>
          <p className="stat-label">Usuarios registrados</p>
        </div>
        <div className="stat-card">
          <div className="icon">📦</div>
          <h3>Pedidos Pendientes</h3>
          <p className="stat-number">{stats.ventasRecientes.filter(v => v.estado === 'Pendiente').length}</p>
          <p className="stat-label">Por entregar</p>
        </div>
      </div>

      {renderSalesChart()}

      <div className="recent-orders">
        <h3>Pedidos Recientes</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {stats.ventasRecientes.map((venta) => (
                <tr key={venta.id}>
                  <td>#{venta.id}</td>
                  <td>{venta.cliente}</td>
                  <td>{new Date(venta.fecha).toLocaleString()}</td>
                  <td>${venta.total.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${venta.estado.toLowerCase()}`}>
                      {venta.estado}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {venta.estado === 'Pendiente' && (
                        <>
                          <button
                            onClick={() => handleUpdateOrderStatus(venta.id, 'Completado')}
                            className="action-button complete"
                          >
                            ✓ Completar
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(venta.id, 'Cancelado')}
                            className="action-button cancel"
                          >
                            ✕ Cancelar
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    if (loading) {
      return <div className="loading">Cargando...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'products':
        return <AdminProductos />;
      case 'orders':
        return (
          <div className="admin-section">
            <h2>Gestión de Pedidos</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.ventasRecientes.map((venta) => (
                    <tr key={venta.id}>
                      <td>#{venta.id}</td>
                      <td>{venta.cliente}</td>
                      <td>{new Date(venta.fecha).toLocaleString()}</td>
                      <td>${venta.total.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${venta.estado.toLowerCase()}`}>
                          {venta.estado}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {venta.estado === 'Pendiente' && (
                            <>
                              <button
                                onClick={() => handleUpdateOrderStatus(venta.id, 'Completado')}
                                className="action-button complete"
                              >
                                ✓ Completar
                              </button>
                              <button
                                onClick={() => handleUpdateOrderStatus(venta.id, 'Cancelado')}
                                className="action-button cancel"
                              >
                                ✕ Cancelar
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return <div>Selecciona una sección del menú</div>;
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-profile">
          <div className="admin-avatar">
            <span>{user?.nombre?.charAt(0).toUpperCase() || 'A'}</span>
          </div>
          <div className="admin-info">
            <h3>{user?.nombre || 'Admin'}</h3>
            <p>Administrador</p>
          </div>
        </div>
        <nav className="admin-nav">
          <button
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-item ${activeSection === 'products' ? 'active' : ''}`}
            onClick={() => setActiveSection('products')}
          >
            🍔 Productos
          </button>
          <button
            className={`nav-item ${activeSection === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveSection('orders')}
          >
            📦 Pedidos
          </button>
          <button
            className="nav-item"
            onClick={logout}
          >
            🚪 Cerrar Sesión
          </button>
        </nav>
      </aside>
      <main className="admin-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPanel;
