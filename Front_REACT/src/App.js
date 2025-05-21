import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home"; // Página principal
import Register from "./pages/register"; // Página de registro
import Login from "./pages/login"; // Página de inicio de sesión // Página de inicio de sesión

// Vista para usuarios no autenticados
function LoggedOutView({ setUser }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
    </Routes>
  );
}

// Vista para usuarios autenticados
const LoggedInView = ({ user }) => (
  <>
    <h2>Bienvenido, {user.nombre}</h2>
    <p>Esta es la página principal de tu aplicación.</p>
    {/* Aquí podrías cargar el componente principal de tu app */}
  </>
);

function App() {
  const [user, setUser] = useState(null); // Estado para manejar el usuario autenticado

  return (
    <Router>
      <div className="App">
        {!user ? (
          <LoggedOutView setUser={setUser} />
        ) : (
          <LoggedInView user={user} />
        )}
      </div>
    </Router>
  );
}

export default App;