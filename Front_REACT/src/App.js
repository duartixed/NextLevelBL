import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Menu from "./pages/menu";
import ProductosCategoria from "./pages/productosCategoria";
import Nosotros from "./pages/nosotros";
import Promociones from "./pages/promociones";
import Contacto from "./pages/contacto.jsx";
import CarritoPage from "./pages/carrito";
import Header from "./components/header";
import Footer from "./components/footer";
import axios from "axios";
import AdminLogin from './pages/adminLogin';
import AdminPanel from './pages/adminPanel';
import AdminRoute from './components/AdminRoute';

function App() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const idCliente = user?.idCliente || 1;

  // Mantener usuario autenticado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Actualiza el contador del carrito cada vez que cambia
  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/carrito/${idCliente}`);
      let total = 0;
      res.data.forEach(item => {
        total += item.cantidad;
      });
      setCartCount(total);
    } catch (err) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCliente]);

  // Función para actualizar el contador desde hijos
  const handleAddToCart = () => {
    fetchCartCount();
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header user={user} cartCount={cartCount} />
              <Home user={user} onAddToCart={handleAddToCart} />
              <Footer />
            </>
          } />
          <Route path="/nosotros" element={
            <>
              <Header user={user} cartCount={cartCount} />
              <Nosotros />
              <Footer />
            </>
          } />
          <Route path="/promociones" element={
            <>
              <Header user={user} cartCount={cartCount} />
              <Promociones />
              <Footer />
            </>
          } />
          <Route path="/menu" element={
            <>
              <Header user={user} cartCount={cartCount} />
              <Menu />
              <Footer />
            </>
          } />
          <Route path="/menu/:categoriaId" element={
            <>
              <Header user={user} cartCount={cartCount} />
              <ProductosCategoria />
              <Footer />
            </>
          } />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/carrito" element={
            <>
              <Header user={user} cartCount={cartCount} />
              <CarritoPage />
              <Footer />
            </>
          } />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;