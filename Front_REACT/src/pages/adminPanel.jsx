
import React, { useContext } from 'react';
import AdminProductos from '../components/AdminProductos';
import '../styles/components/admin.scss';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  if (!user || user.rol !== 'admin') return <Navigate to="/" />;
  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      <p>Bienvenido, administrador. Aquí podrás gestionar productos, usuarios, ventas y reportes.</p>
      <AdminProductos />
      {/* Aquí se agregarán los componentes CRUD y reportes */}
    </div>
  );
};

export default AdminPanel;
