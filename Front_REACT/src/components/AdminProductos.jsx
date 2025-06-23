import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';
import '../styles/components/adminProductos.scss';

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const stats = await adminService.getProductosStats();
      setProductos(stats.productos || []);
      setError(null);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setError('Error al cargar los productos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchProductos(); 
  }, []);

  const handleChange = e => {
    const value = e.target.name === 'precio' ? 
      parseFloat(e.target.value) || '' : 
      e.target.value;
    setNuevo({ ...nuevo, [e.target.name]: value });
  };

  const handleAdd = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await adminService.createProduct({
        nombre: nuevo.nombre,
        descripcion: nuevo.descripcion,
        precio: parseFloat(nuevo.precio),
        stock: parseInt(nuevo.stock),
        imagen: nuevo.imagen
      });
      setMensaje('Producto agregado exitosamente');
      setNuevo({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
      await fetchProductos();
    } catch (error) {
      console.error('Error al agregar producto:', error);
      setMensaje('Error al agregar el producto: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = producto => {
    setEditando(producto);
    setNuevo({
      ...producto,
      precio: typeof producto.precio === 'number' ? producto.precio : parseFloat(producto.precio)
    });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await adminService.updateProduct(editando.idProducto, {
        nombre: nuevo.nombre,
        descripcion: nuevo.descripcion,
        precio: parseFloat(nuevo.precio),
        stock: parseInt(nuevo.stock),
        imagen: nuevo.imagen
      });
      setMensaje('Producto actualizado exitosamente');
      setEditando(null);
      setNuevo({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
      await fetchProductos();
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      setMensaje('Error al actualizar el producto: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }
    try {
      setLoading(true);
      await adminService.deleteProduct(id);
      setMensaje('Producto eliminado exitosamente');
      await fetchProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      setMensaje('Error al eliminar el producto: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={fetchProductos} className="retry-button">
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="admin-productos">
      <h2>Gestión de Productos</h2>
      {mensaje && (
        <div className={`mensaje ${mensaje.includes('Error') ? 'error' : 'success'}`}>
          {mensaje}
          <button onClick={() => setMensaje('')} className="close-button">×</button>
        </div>
      )}
      <form onSubmit={editando ? handleUpdate : handleAdd} className="producto-form">
        {/* ...campos de formulario... */}
        <input type="text" name="nombre" placeholder="Nombre del producto" value={nuevo.nombre} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={nuevo.descripcion} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" value={nuevo.precio} onChange={handleChange} required step="0.01" min="0" />
        <input type="number" name="stock" placeholder="Stock" value={nuevo.stock} onChange={handleChange} required min="0" />
        <input type="text" name="imagen" placeholder="URL de la imagen" value={nuevo.imagen} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{editando ? 'Actualizar Producto' : 'Agregar Producto'}</button>
        {editando && (
          <button type="button" onClick={() => { setEditando(null); setNuevo({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' }); }}>Cancelar Edición</button>
        )}
      </form>
      <div className="productos-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Vendidos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto.idProducto}>
                <td>{producto.idProducto}</td>
                <td>
                  <img src={producto.imagen} alt={producto.nombre} style={{width: '50px', height: '50px', objectFit: 'cover'}} />
                </td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>{producto.stock}</td>
                <td>{producto.unidadesVendidas}</td>
                <td>
                  <button onClick={() => handleEdit(producto)} className="edit-button">Editar</button>
                  <button onClick={() => handleDelete(producto.idProducto)} className="delete-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductos;
