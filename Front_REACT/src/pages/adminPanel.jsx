import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminProductos from '../components/AdminProductos';
import '../styles/components/adminPanel.scss';
import axios from 'axios';

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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (user?.idRol === 2) {
      fetchStats();
    }
  }, [user]);

  // No necesitamos redirección aquí porque AdminRoute ya la maneja
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-grid">
            <div className="stat-card">
              <h3>Ventas Totales</h3>
              <p className="stat-number">${stats.totalVentas.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Productos</h3>
              <p className="stat-number">{stats.totalProductos}</p>
            </div>
            <div className="stat-card">
              <h3>Usuarios</h3>
              <p className="stat-number">{stats.totalUsuarios}</p>
            </div>
            <div className="stat-card">
              <h3>Pedidos Pendientes</h3>
              <p className="stat-number">{stats.ventasRecientes.length}</p>
            </div>
          </div>
        );
      case 'products':
        return <AdminProductos />;
      case 'sales':
        return (
          <div className="admin-section">
            <h2>Gestión de Ventas</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {stats.ventasRecientes.map((venta) => (
                  <tr key={venta.id}>
                    <td>#{venta.id}</td>
                    <td>{venta.cliente}</td>
                    <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                    <td>${venta.total.toFixed(2)}</td>
                    <td>{venta.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return <div>Selecciona una sección del menú</div>;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/adminLogin', { replace: true });
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-profile">
          <div className="admin-avatar">
            <span>{user?.nombre?.charAt(0) || 'A'}</span>
          </div>
          <div className="admin-info">
            <h3>{user?.nombre || 'Administrador'}</h3>
            <p>{user?.email}</p>
          </div>
        </div>
        <nav className="admin-nav">
          <button
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`nav-item ${activeSection === 'products' ? 'active' : ''}`}
            onClick={() => setActiveSection('products')}
          >
            Productos
          </button>
          <button
            className={`nav-item ${activeSection === 'sales' ? 'active' : ''}`}
            onClick={() => setActiveSection('sales')}
          >
            Ventas
          </button>
          <button className="nav-item logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </nav>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
        </header>
        <div className="admin-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
