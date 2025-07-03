import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Asegúrate que esta URL sea correcta

// 🟢 Login
export const login = async (usuario, email, contraseña) => {
  try {
    const response = await axios.get(`${API_URL}/login`, {
      usuario,
      email,
      contraseña
    });

    return response.data; // Retorna el token y datos del usuario
  } catch (error) {
    console.error('Error en el login:');

    throw error;
  }
};

// 🟢 Registro
export const register = async (nombre, email, contraseña, telefono, direccion, idRol) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      nombre,
      email,
      contraseña,
      telefono,
      direccion,
      idRol
    });

    return response.data;
  } catch (error) {
    console.error('Error en el registro:', error.response?.data || error.message);
    throw error;
  }
};
