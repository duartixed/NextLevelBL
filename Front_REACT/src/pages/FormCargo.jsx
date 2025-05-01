import React from 'react';
import axiosInstance from '../api/axioInstance';
import { useNavigate } from 'react-router-dom'; // ✅ Importamos para redirigir

const FormCargo = () => {
  const navigate = useNavigate(); // ✅ Hook de navegación

  const cargarButton = async (e) => {
    e.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const usuario = document.querySelector("#usuario").value;
    const email = document.querySelector("#email").value;
    const contraseña = document.querySelector("#contraseña").value;

    const clientes = {
      nombre,
      usuario,
      email,
      contraseña,
    }

    console.log(clientes);

    try {
      const response = await axiosInstance.post("http://localhost:5000/api/auth/register", clientes);
      console.log("El nuevo registro fue un éxito...", clientes);
    } catch (error) {
      if (error.response) {
        console.error("Error del servidor:", error.response.data);
      } else {
        console.error("Error de la solicitud:", error.message);
      }
    }
  }

  // ✅ Redirección al componente signup
  const irASignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <>
      <div className='container'>
        <div className="containerForm">
          <section className="signup">
            <h2>Crear Cuenta</h2>
            <form id="signup-form">
              <fieldset>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" />
              </fieldset>
              <fieldset>
                <label htmlFor="usuario">Usuario:</label>
                <input type="text" id="usuario" name="usuario" />
              </fieldset>
              <fieldset>
                <label htmlFor="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" />
              </fieldset>
              <fieldset>
                <label htmlFor="contraseña">Contraseña:</label>
                <input type="password" id="contraseña" name="contraseña" />
              </fieldset>
              <button type="submit" id="buttonID" onClick={cargarButton}>
                Crear Cuenta
              </button>
            </form>
          </section>

          {/* ✅ Botón corregido para redirigir */}
          <button type="button" id="buttonID" onClick={irASignup}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </>
  )
}

export default FormCargo;
