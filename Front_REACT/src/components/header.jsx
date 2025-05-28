import { Link } from 'react-router-dom';
import '../styles/components/_header.scss';

// Importar imágenes correctas de la carpeta assets
import logo from '../assets/images/logo.png';
import userIcon from '../assets/images/user-icon.png';
import createAccountIcon from '../assets/images/create-account-icon.png';
import cartIcon from '../assets/images/cart-icon.png';
import adminLoginIcon from '../assets/images/adminlogin.png.png';

const Header = ({ user, cartCount }) => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Next Level Logo" />
        </Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/nosotros">NOSOTROS</Link></li>
          <li><Link to="/promociones">PROMOCIONES</Link></li>
          <li><Link to="/menu">MENÚ</Link></li>
          <li><Link to="/contacto">CONTÁCTANOS</Link></li>
        </ul>
      </nav>
      <div className="header-user">
        {user ? (
          <span className="user-greeting">Hola, {user.nombre}</span>
        ) : null}
        <div className="icons">
          <Link to="/login">
            <img src={userIcon} alt="Iniciar Sesión" title="Iniciar Sesión" style={{width: '22px', height: '22px', margin: '0 6px'}} />
          </Link>
          <Link to="/register">
            <img src={createAccountIcon} alt="Crear Cuenta" title="Crear Cuenta" style={{width: '22px', height: '22px', margin: '0 6px'}} />
          </Link>
          <Link to="/adminLogin" reloadDocument>
            <img src={adminLoginIcon} alt="Admin Login" title="Admin Login" style={{width: '22px', height: '22px', margin: '0 6px', filter: 'brightness(0) saturate(100%) invert(81%) sepia(99%) saturate(7499%) hue-rotate(1deg) brightness(104%) contrast(104%)'}} />
          </Link>
          <Link to="/carrito" className="cart-icon">
            <img src={cartIcon} alt="Carrito de Compras" style={{width: '22px', height: '22px', margin: '0 6px'}} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;