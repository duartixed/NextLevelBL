import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import { AuthProvider } from './context/AuthContext';
import PagoNequi from './pages/pagoNequi.jsx';
import Recibo from './pages/Recibo.jsx';
import ReciboAnonimo from './pages/ReciboAnonimo.jsx';

const AppContent = () => {
  const location = useLocation();
  // Solo ocultar header y footer en el panel de admin, no en el login
  const hideHeaderFooter = location.pathname === '/admin';
  // Evitar doble footer en formularios
  const isAuthForm = ['/login', '/register', '/carrito', '/adminLogin'].includes(location.pathname);

  return (
    <div className="App">
      {!hideHeaderFooter && <Header />}
      <main className={hideHeaderFooter ? 'admin-content' : ''}>
        <Routes>
          {/* Rutas de administrador */}
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          {/* Rutas regulares */}
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/promociones" element={<Promociones />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:categoriaId" element={<ProductosCategoria />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/pago-nequi" element={<PagoNequi />} />
          <Route path="/recibo/:idCliente" element={<Recibo />} />
          <Route path="/recibo-anonimo" element={<ReciboAnonimo />} />
          <Route path="/pago-nequi-info" element={<PagoNequi />} />
        </Routes>
      </main>
      {!hideHeaderFooter && !isAuthForm && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CarritoProvider>
          <AppContent />
        </CarritoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;