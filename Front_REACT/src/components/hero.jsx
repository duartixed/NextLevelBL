import { Link } from 'react-router-dom';
import heroImage from '../assets/imagenes/hero-image.png';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Bienvenido a Nuestro Restaurante</h1>
        <p>Disfruta de la mejor experiencia gastronómica.</p>
        <Link to="/reservas" className="btn-reserva">Reserva Ahora</Link>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Imagen Hero" />
      </div>
    </section>
  );
};

export default Hero;