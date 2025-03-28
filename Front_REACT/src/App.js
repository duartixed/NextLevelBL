import React, { useState } from "react";
import Login from "../components/Login";
import FormCargo from "./components/FormCargo";

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

