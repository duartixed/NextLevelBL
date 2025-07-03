import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminProductos from '../components/AdminProductos';
import AdminPedidos from '../components/AdminPedidos';
import AdminClientes from '../components/AdminClientes';
import AdminCarritosAnonimos from '../components/AdminCarritosAnonimos';
import adminService from '../services/adminService';
import anonCartService from '../services/anonCartService';
import '../styles/components/adminPanel.scss';

const AdminPanel = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anonCarts, setAnonCarts] = useState({});
  const [anonLoading, setAnonLoading] = useState(true);
  const [anonError, setAnonError] = useState(null);

  useEffect(() => {
    if (!user || user.idRol !== 2) {
      navigate('/admin-login');
    }
  }, [user, navigate]);

  useEffect(() => {
    let isMounted = true;
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, monthlySales] = await Promise.all([
          adminService.getStats(),
          adminService.getMonthlySales()
        ]);
        if (isMounted) {
          setStats({
            ...statsData,
            monthlySales: monthlySales
          });
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error cargando datos del dashboard:', err);
          setError('Error cargando los datos del dashboard. Por favor, intenta de nuevo.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (activeSection === 'dashboard') {
      loadDashboardData();
    }
    return () => { isMounted = false; };
  }, [activeSection]);

  useEffect(() => {
    let isMounted = true;
    const loadAnonCarts = async () => {
      try {
        setAnonLoading(true);
        const data = await anonCartService.getAll();
        if (isMounted) {
          setAnonCarts(data);
          setAnonError(null);
        }
      } catch (err) {
        if (isMounted) setAnonError('Error cargando carritos anónimos');
      } finally {
        if (isMounted) setAnonLoading(false);
      }
    };
    if (activeSection === 'carritos-anonimos') {
      loadAnonCarts();
    }
    return () => { isMounted = false; };
  }, [activeSection]);

  const handleLogout = () => {
    logout();
    window.location.href = '/adminlogin';
  };

  const renderDashboard = () => {
    if (loading) {
      return <div className="loading">Cargando datos...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    if (!stats) {
      return <div className="no-data">No hay datos disponibles</div>;
    }

    return (
      <>
        <div className="dashboard-header">
          <div className="welcome-text">
            <h1>Bienvenido, {user?.nombre || 'Admin'}</h1>
            <p>Aquí tienes un resumen de tu negocio</p>
          </div>
        </div>
        <div className="stats-container">
          {/* Carritos de clientes registrados */}
          <div className="stat-card">
            <div className="stat-header">
              <div className="label">Carritos de Clientes</div>
              <div className="icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
            </div>
            <div className="value">{stats.totalPedidos || 0}</div>
            <div className="trend">Pedidos activos de clientes registrados</div>
          </div>
          {/* Carritos anónimos */}
          <div className="stat-card" style={{ border: '2px solid #ffcc00' }}>
            <div className="stat-header">
              <div className="label">Carritos Anónimos</div>
              <div className="icon">
                <i className="fas fa-user-secret"></i>
              </div>
            </div>
            <div className="value">{anonLoading ? '...' : Object.keys(anonCarts).length}</div>
            <div className="trend">Carritos activos de visitantes</div>
          </div>
          {/* Resto de stats originales */}
          <div className="stat-card">
            <div className="stat-header">
              <div className="label">Ventas Totales</div>
              <div className="icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
            </div>
            <div className="value">${stats.totalVentas || 0}</div>
            <div className="trend up">
              <i className="fas fa-arrow-up"></i>
              {stats.crecimientoVentas || 0}% desde el mes pasado
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="label">Productos</div>
              <div className="icon">
                <i className="fas fa-box"></i>
              </div>
            </div>
            <div className="value">{stats.totalProductos || 0}</div>
            <div className="trend">
              {stats.productosActivos || 0} productos activos
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="label">Clientes</div>
              <div className="icon">
                <i className="fas fa-users"></i>
              </div>
            </div>
            <div className="value">{stats.totalClientes || 0}</div>
            <div className="trend">
              Clientes normales registrados
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="label">Administradores</div>
              <div className="icon">
                <i className="fas fa-user-shield"></i>
              </div>
            </div>
            <div className="value">{stats.totalAdmins || 0}</div>
            <div className="trend">
              Usuarios con rol administrador
            </div>
          </div>
        </div>

        {stats.monthlySales && (
          <div className="sales-chart">
            <h3>Ventas Mensuales</h3>
            {/* Aquí puedes agregar un gráfico de ventas si lo deseas */}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="admin-panel">
      <aside className="sidebar">
        <div className="user-profile">
          <div className="avatar">
            {user?.nombre?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="user-info">
            <div className="name">{user?.nombre || 'Admin'}</div>
            <div className="email">{user?.email || 'admin@nextlevel.com'}</div>
          </div>
        </div>

        <div className="nav-links">
          <button 
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <i className="fas fa-home"></i>
            Dashboard
          </button>
          <button 
            className={`nav-item ${activeSection === 'productos' ? 'active' : ''}`}
            onClick={() => setActiveSection('productos')}
          >
            <i className="fas fa-box"></i>
            Productos
          </button>
          <button 
            className={`nav-item ${activeSection === 'pedidos' ? 'active' : ''}`}
            onClick={() => setActiveSection('pedidos')}
          >
            <i className="fas fa-shopping-cart"></i>
            Pedidos
          </button>
          <button 
            className={`nav-item ${activeSection === 'clientes' ? 'active' : ''}`}
            onClick={() => setActiveSection('clientes')}
          >
            <i className="fas fa-users"></i>
            Clientes
          </button>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          Cerrar Sesión
        </button>
      </aside>

      <div className="main-content">
        {activeSection === 'dashboard' && renderDashboard()}
        {activeSection === 'productos' && <AdminProductos />}
        {activeSection === 'pedidos' && <AdminPedidos />}
        {activeSection === 'clientes' && <AdminClientes />}
        {activeSection === 'carritos-anonimos' && <AdminCarritosAnonimos />}
      </div>
    </div>
  );
};

export default AdminPanel;
