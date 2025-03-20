import React from 'react';
import axiosInstance from '../api/axioInstance';


const cargarButton = async (e) => {
    e.preventDefault();
    const nombre_usuario = document.querySelector("#nombre_usuario").value;
    const correo = document.querySelector("#correo").value;
    const contrasena = document.querySelector("#contrasena").value;

    const signup = {
      nombre_usuario,
      correo,
      contrasena,
    }
    console.log(signup)
    try {
      const response =  await axiosInstance.post("http://localhost:5000/api/auth/login", signup);
      console.log("el nuevo registro fue un exito..." , signup)
      
    } catch (error) {
      if (error.response) {
        console.error("Error del servidor:", error.response.data);
      } else {
        console.error("Error de la solicitud:", error.message);
      }

    }
}

const FormCargo = () => {
  return (
    <>
    <div className='container'>

      <div className="containerForm">

        {/* <h2>Formulario cargo</h2>
        <form>
            <fieldset>
              <label htmlFor="nombre_cargo">Nombre del cargo</label>
              <input type="text" id='nombre_cargo' required />  
            </fieldset>          
            <fieldset>
              <label htmlFor="salario">Salario</label>
              <input type="text" id='salario' required />
            </fieldset>
            <button type='submit' onClick={cargarButton}>Cargar</button>
        </form> */}
      <section className="signup">
        <h2>Crear Cuenta</h2>
        <form id="signup-form">
          <fieldset>
            <label htmlFor="nombre_usuario">Usuario:</label>
            <input type="text" id="nombre_usuario" name="nombre_usuario"  />
          </fieldset>
          <fieldset>
            <label htmlFor="correo">Correo Electrónico:</label>
            <input type="correo" id="correo" name="correo"  />
          </fieldset>
          <fieldset>
            <label htmlFor="contrasenia">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasenia"  />
          </fieldset>
            <button type="submit" onClick={cargarButton}>Crear Cuenta</button>
        </form>
    </section>    
        
      </div>
    </div>
    </>
  )
}

export default FormCargo