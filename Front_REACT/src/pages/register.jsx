import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import axiosInstance from '../api/axioInstance';
import "../styles/components/auth.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    usuario: '',
    email: '',
    contraseña: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/api/auth/register', formData);
      if (response.data) {
        alert('✅ Registro exitoso!');
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.error || '❌ Error al registrar el usuario');
      console.error('Error en registro:', error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="auth-page">
        <div className="auth-container">
          <form onSubmit={handleSubmit}>
            <h2>Crear Cuenta</h2>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Usuario</label>
              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
            <div className="auth-links">
              <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;