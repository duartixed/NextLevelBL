import React from 'react';
import AdminProductos from '../components/AdminProductos';
import '../styles/components/admin.scss';

const AdminPanel = () => {
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
