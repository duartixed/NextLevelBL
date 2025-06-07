import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import Menu from './pages/menu.jsx';
import ProductosCategoria from './pages/productosCategoria.jsx';
import Nosotros from './pages/nosotros.jsx';
import Promociones from './pages/promociones.jsx';
import Contacto from './pages/contacto.jsx';
import CarritoPage from './pages/carrito.jsx';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import AdminLogin from './pages/adminLogin.jsx';
import AdminPanel from './pages/adminPanel.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import { CarritoProvider } from './context/CarritoContext';
import PagoNequi from './pages/pagoNequi.jsx';
import Recibo from './pages/Recibo.jsx';

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
      const res = await fetch(`http://localhost:5000/api/carrito/${idCliente}`);
      const data = await res.json();
      let total = 0;
      data.forEach((item) => {
        total += item.cantidad;
      });
      setCartCount(total);
    } catch (err) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [idCliente]);

  return (
    <CarritoProvider>
      <Router>
        <div className="App">
          <Header user={user} cartCount={cartCount} />
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/promociones" element={<Promociones />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:categoriaId" element={<ProductosCategoria />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/carrito" element={<CarritoPage fetchCartCount={fetchCartCount} />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
            <Route path="/pago-nequi" element={<PagoNequi />} />
            <Route path="/recibo/:idCliente" element={<Recibo />} />
            <Route path="/pago-nequi-info" element={<PagoNequi />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CarritoProvider>
  );
}

export default App;