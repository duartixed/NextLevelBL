import { Link } from 'react-router-dom';
import '../styles/components/_header.scss';

// Importar imágenes correctas de la carpeta assets
import logo from '../assets/images/logo.png';
import userIcon from '../assets/images/user-icon.png';
import createAccountIcon from '../assets/images/create-account-icon.png';
import cartIcon from '../assets/images/cart-icon.png';

const Header = ({ cartCount }) => {
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
          <li><Link to="/ubicacion">UBÍCANOS</Link></li>
          <li><Link to="/contacto">CONTÁCTANOS</Link></li>
        </ul>
      </nav>
      <div className="icons">
        <Link to="/login">
          <img src={userIcon} alt="Iniciar Sesión" title="Iniciar Sesión" />
        </Link>
        <Link to="/register">
          <img src={createAccountIcon} alt="Crear Cuenta" title="Crear Cuenta" />
        </Link>
        <Link to="/carrito" className="cart-icon">
          <img src={cartIcon} alt="Carrito de Compras" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;