import React, { useState } from 'react';
import { Login as loginService } from '../services/authService'; // Usamos alias para evitar conflicto

const Login = ({ onLoginSuccess }) => {
  const [usuario, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginService(usuario, email, contraseña); // Llamamos el servicio correctamente
      if (data?.token) {
        localStorage.setItem('token', data.token); // Guarda el token en localStorage
        onLoginSuccess(data); // Pasa los datos al componente padre
      } else {
        setError('Credenciales inválidas');
      }
    } catch (error) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
