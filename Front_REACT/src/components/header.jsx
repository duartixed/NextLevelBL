import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/_header.scss';
import logo from '../assets/images/logo.png';
import userIcon from '../assets/images/user-icon.png';
import createAccountIcon from '../assets/images/create-account-icon.png';
import cartIcon from '../assets/images/cart-icon.png';
import adminLoginIcon from '../assets/images/adminlogin.png.png';
import { AuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CarritoContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Next Level Logo" />
        </Link>
      </div>
      <ul className="nav-links" style={{gap: '1.2rem', fontSize: '0.95rem'}}>
        <li><Link to="/nosotros">NOSOTROS</Link></li>
        <li><Link to="/promociones">PROMOCIONES</Link></li>
        <li><Link to="/menu">MENÚ</Link></li>
        <li><Link to="/contacto">CONTÁCTANOS</Link></li>
      </ul>
      <div className="icons" style={{gap: '0.5rem'}}>
        {!user ? (
          <>
            <button onClick={() => navigate('/login')} className="btn-icon">
              <img src={userIcon} alt="Iniciar Sesión" />
            </button>
            <button onClick={() => navigate('/register')} className="btn-icon">
              <img src={createAccountIcon} alt="Crear Cuenta" />
            </button>
          </>
        ) : (
          <div className="user-info">
            <span className="user-name">¡Hola, {user.nombre}!</span>
            <button onClick={handleLogout} className="logout-button">
              Cerrar sesión
            </button>
          </div>
        )}
        <button onClick={() => navigate('/adminLogin')} className="btn-icon">
          <img src={adminLoginIcon} alt="Admin Login" />
        </button>
        <button onClick={() => navigate('/carrito')} className="btn-icon">
          <img src={cartIcon} alt="Carrito de compras" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;