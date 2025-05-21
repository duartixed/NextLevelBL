import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axioInstance';
import "../styles/components/auth.scss";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const correo = document.querySelector("#correo").value;
    const contraseña = document.querySelector("#contraseña").value;

    const loginData = { correo, contraseña };

    try {
      const response = await axiosInstance.post("http://localhost:5000/api/auth/login", loginData);

      console.log("Inicio de sesión exitoso:", response.data);

      // Guardar el usuario en el estado global
      setUser(response.data.usuario);

      // Redirigir al usuario a la página principal
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.error("Error del servidor:", error.response.data);
        alert("Correo o contraseña incorrectos");
      } else {
        console.error("Error de la solicitud:", error.message);
        alert("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Inicia sesión</h2>
        <form onSubmit={handleLogin}>
          <input type="email" id="correo" placeholder="Correo Electrónico" />
          <input type="password" id="contraseña" placeholder="Contraseña" />
          <button type="submit">Iniciar Sesión</button>
        </form>
        <button onClick={() => navigate("/register")}>
          ¿No tienes cuenta? Crear una
        </button>
      </div>
    </div>
  );
};

export default Login;