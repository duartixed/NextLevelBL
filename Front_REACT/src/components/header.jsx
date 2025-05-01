import { Link } from 'react-router-dom';
import logo from '../assets/imagenes/logo.png';
import carritoIcon from '../assets/imagenes/icono-carrito.png';


const Header = ({ cartCount }) => {
  return (
    <header>
      <nav>
        <div className="header">
          <img src={logo} alt="Logo del Restaurante" />
        </div>
        <ul className="nav">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/menu">Menú</Link></li>
          <li><Link to="/reservas">Reservas</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li><Link to="/login">Iniciar Sesión</Link></li>
          <li><Link to="/signup">Crear Cuenta</Link></li>
        </ul>
        <div className="carrito">
          <Link to="/carrito">
            <img src={carritoIcon} alt="Carrito de Compras" />
            <span className="contador-carrito">{cartCount}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;