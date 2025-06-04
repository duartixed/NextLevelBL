import React from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axioInstance';
import "../styles/components/auth.scss";

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const correo = document.querySelector("#correo").value;
    const contraseña = document.querySelector("#contraseña").value;

    const loginData = { correo, contraseña };

    try {
      const response = await axiosInstance.post("http://localhost:5000/api/auth/login", loginData);

      console.log("Inicio de sesión exitoso:", response.data);

      // Guardar el usuario en el estado global y en localStorage
      setUser(response.data.usuario);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));

      // Redirigir al usuario a la página principal
      navigate("/");
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
    <>
      <Header />
      <div className="auth-container">
        <button
          className="boton-flecha-home"
          style={{ position: 'absolute', top: 30, left: 30, zIndex: 10 }}
          onClick={() => navigate('/')}
          title="Volver al inicio"
        >
          &#8592;
        </button>
        <div className="auth-box">
          <h2>Inicia sesión</h2>
          <form onSubmit={handleLogin}>
            <input type="email" id="correo" placeholder="Correo Electrónico" />
            <input type="password" id="contraseña" placeholder="Contraseña" />
            <button type="submit">Iniciar Sesión</button>
            <Link to="/" className="btn-volver-home">Volver a Home</Link>
          </form>
          <button onClick={() => navigate("/register")}>
            ¿No tienes cuenta? Crear una
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;