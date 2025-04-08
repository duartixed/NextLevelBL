import React, { useState } from "react";
import Login from "../src/pages/Login.jsx";
import FormCargo from "./components/FormCargo.jsx";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {!user ? (
        <Login onLoginSuccess={setUser} />
      ) : (
        <>
          <h2>Bienvenido, {user.nombre}</h2>
          <FormCargo />
        </>
      )}
    </div>
  );
}

export default App;

