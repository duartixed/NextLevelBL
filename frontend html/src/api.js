import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Asegúrate de que sea la URL correcta

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Esto permite manejar cookies si es necesario
  headers: {
    "Content-Type": "application/json",
  },
});
