import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../styles/components/auth.scss';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    // Si ya está autenticado como admin, redirigir al panel
    if (user?.idRol === 2) {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        correo: email,
        contraseña: password
      });

      const userData = res.data.usuario;
      const token = res.data.token;

      if (userData?.idRol === 2) {
        localStorage.setItem('token', token);
        login(userData);
        navigate('/admin', { replace: true });
      } else {
        setError('No tienes permisos de administrador');
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 
        'Error al iniciar sesión. Por favor, verifica tus credenciales.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Si ya está autenticado como admin, no mostrar el formulario
  if (user?.idRol === 2) {
    return null;
  }

  return (    <div className="auth-page">
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Acceso Administrador</h2>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
