import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Importamos React Router
import "./assets/css/style.css"; // Importamos los estilos generales

import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Seleccionamos el elemento con id "root"
const rootElement = document.getElementById("root");

// Creamos el renderizado de React
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// Para medir el rendimiento de la app (opcional)
reportWebVitals();


