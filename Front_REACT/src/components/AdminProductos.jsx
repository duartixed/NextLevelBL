import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const fetchProductos = async () => {
    const res = await axios.get(`${API_URL}/productos`);
    setProductos(res.data);
  };

  useEffect(() => { fetchProductos(); }, []);

  const handleChange = e => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const handleAdd = async e => {
    e.preventDefault();
    await axios.post(`${API_URL}/productos`, {
      nombre: nuevo.nombre,
      descripcion: nuevo.descripcion,
      precio: parseFloat(nuevo.precio),
      stock: parseInt(nuevo.stock),
      imagen: nuevo.imagen
    });
    setMensaje('Producto agregado');
    setNuevo({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
    fetchProductos();
  };

  const handleEdit = producto => {
    setEditando(producto);
    setNuevo(producto);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    await axios.put(`${API_URL}/productos/${editando.idProducto}`, {
      nombre: nuevo.nombre,
      descripcion: nuevo.descripcion,
      precio: parseFloat(nuevo.precio),
      stock: parseInt(nuevo.stock),
      imagen: nuevo.imagen
    });
    setMensaje('Producto actualizado');
    setEditando(null);
    setNuevo({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
    fetchProductos();
  };

  const handleDelete = async id => {
    await axios.delete(`${API_URL}/productos/${id}`);
    setMensaje('Producto eliminado');
    fetchProductos();
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Gestión de Productos</h2>
      {mensaje && <div style={{ color: 'green' }}>{mensaje}</div>}
      <form onSubmit={editando ? handleUpdate : handleAdd} style={{ marginBottom: '1rem' }}>
        <input name="nombre" placeholder="Nombre" value={nuevo.nombre} onChange={handleChange} required />
        <input name="descripcion" placeholder="Descripción" value={nuevo.descripcion} onChange={handleChange} required />
        <input name="precio" type="number" step="0.01" placeholder="Precio" value={nuevo.precio} onChange={handleChange} required />
        <input name="stock" type="number" placeholder="Stock" value={nuevo.stock} onChange={handleChange} required />
        <input name="imagen" placeholder="URL Imagen" value={nuevo.imagen} onChange={handleChange} />
        <button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
        {editando && <button type="button" onClick={() => { setEditando(null); setNuevo({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' }); }}>Cancelar</button>}
      </form>
      <table border="1" cellPadding="8" style={{ width: '100%', background: '#fff' }}>
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Stock</th><th>Imagen</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.idProducto}>
              <td>{p.idProducto}</td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>${p.precio.toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>{p.imagen ? <img src={p.imagen} alt={p.nombre} width={40} /> : '-'}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.idProducto)} style={{ color: 'red' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductos;
