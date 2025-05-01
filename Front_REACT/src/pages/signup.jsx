import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook de navegación
import axiosInstance from '../api/axioInstance';

const FormSignup = ({ setUser }) => {
  const navigate = useNavigate(); // Hook para redirigir

  const IniciarButton = async (e) => {
    e.preventDefault();

    /*const nombre_usuario = document.querySelector("#nombre_usuario").value;*/
    const correo = document.querySelector("#correo").value;
    const contraseña = document.querySelector("#contraseña").value;

    const signup = { correo, contraseña };

    try {
      const response = await axiosInstance.post("http://localhost:5000/api/auth/login", signup);

      console.log("Inicio de sesión exitoso:", response.data);

      // Aquí se guarda el usuario en el estado de App.jsx
      setUser(response.data.usuario);

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
    <div className='containersignup'>
      <div className="containerFormsignup">
        <section className="signup">
          <h2>Iniciar Sesión</h2>
          <form id="FormSignup">
            <fieldset>
              <label htmlFor="correo">Correo Electrónico:</label>
              <input type="email" id="correo" name="correo" />
            </fieldset>
            <fieldset>
              <label htmlFor="contraseña">Contraseña:</label>
              <input type="password" id="contraseña" name="contraseña" />
            </fieldset>
            <button type="submit" id="buttonlog" onClick={IniciarButton}>
              Iniciar Sesión
            </button>
          </form>

          {/* Botón adicional para volver a Crear Cuenta */}
          <button onClick={() => navigate("/")}>
            ¿No tienes cuenta? Crear una
          </button>
        </section>
      </div>
    </div>
  );
};

export default FormSignup;
