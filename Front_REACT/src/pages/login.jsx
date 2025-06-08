import React, { useContext, useState } from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axioInstance';
import "../styles/components/auth.scss";

import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const loginData = { correo, contraseña };

    try {
      const response = await axiosInstance.post("/api/auth/login", loginData);
      login(response.data.usuario);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError("Correo o contraseña incorrectos");
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="auth-page">
        <div className="auth-container">
          <form onSubmit={handleLogin}>
            <h2>Iniciar Sesión</h2>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input 
                type="email" 
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input 
                type="password" 
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
            <div className="auth-links">
              <a href="/register">¿No tienes cuenta? Crear una</a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;