import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FormCargo from "./pages/FormCargo.jsx";
import FormSignup from "./pages/signup.jsx";

function App() {
  const [user, setUser] = useState(null); // Estado del usuario logueado

  return (
    <Router>
      <div className="App">
        {!user ? (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FormCargo />
                  <Link to="/signup">
                    <button>¿No tienes cuenta? Regístrate</button>
                  </Link>
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <FormSignup setUser={setUser} />
                  <Link to="/">
                    <button>¿Ya tienes cuenta? Iniciar sesión</button>
                  </Link>
                </>
              }
            />
          </Routes>
        ) : (
          <>
            <h2>Bienvenido, {user.nombre}</h2>
            {/* Aquí podrías cargar el componente principal de tu app */}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
