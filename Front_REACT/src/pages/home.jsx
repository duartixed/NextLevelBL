import React from "react";
import "../styles/components/home.scss";
import { Link } from "react-router-dom";
import Hero from "../components/hero";
import StylizedTitle from '../components/StylizedTitle';
import videoNext from '../assets/images/videonext.mp4';



const Home = () => {
  const categorias = [
    { 
      id: "hamburguesas", 
      nombre: "Hamburguesas", 
      imagen: require("../assets/images/nextlevelburguer.png")
    },
    { 
      id: "papas", 
      nombre: "Papas Fritas", 
      imagen: require("../assets/images/classicfries.png")
    },
    { 
      id: "bebidas", 
      nombre: "Bebidas", 
      imagen: require("../assets/images/coca-cola.png")
    },
    { 
      id: "alitas", 
      nombre: "Alitas", 
      imagen: require("../assets/images/personalx12alas.png")
    },
    { 
      id: "hotdogs", 
      nombre: "Hot Dogs", 
      imagen: require("../assets/images/nextlevelhotdog.png")
    },
    { 
      id: "entradas", 
      nombre: "Entradas", 
      imagen: require("../assets/images/dedosqueso.png")
    }
  ];  const publicidad = [
    { 
      id: 'pub1', 
      imagen: require("../assets/images/publi1.png")
    },
    { 
      id: 'pub2', 
      imagen: require("../assets/images/publi2.png")
    },
    { 
      id: 'pub3', 
      imagen: require("../assets/images/publi3.png")
    },
    { 
      id: 'pub4', 
      imagen: require("../assets/images/publi4.png")
    },
    { 
      id: 'pub5', 
      imagen: require("../assets/images/publi5.png")
    },
    { 
      id: 'pub6', 
      imagen: require("../assets/images/publi6.png")
    }
  ];

  return (
    <div className="home">
      <div className="hero-welcome">
        <StylizedTitle 
          title="Una Aventura Para Tu Paladar" 
          subtitle="Donde cada bocado cuenta una historia"
        />
      </div>
      
      <Hero />
      
      <div className="separator"></div>
      
      <section className="video-section">
        <div className="video-container">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="next-video"
            src={videoNext}
          >
            Tu navegador no soporta el video.
          </video>
        </div>
      </section>

      <div className="separator"></div>

      <section className="productos-section">
        <StylizedTitle 
          title="Nuestros Productos" 
          subtitle="Al servicio de un clic"
        />

        <main className="categorias-grid">
          {categorias.map((categoria) => (
            <Link to={`/menu/${categoria.id}`} key={categoria.id} className="categoria-card">
              <div className="categoria-image">
                <img src={categoria.imagen} alt={categoria.nombre} />
              </div>
              <h3>{categoria.nombre}</h3>
            </Link>
          ))}
        </main>
      </section>

      <div className="separator"></div>

      <section className="seccion-publicidad">
        <StylizedTitle 
          title="Publicidad" 
          subtitle="Nuestras promociones especiales"
        />
        <div className="publicidad-grid">          {publicidad.map((item) => (
            <a 
              href="https://www.rappi.com.co/restaurantes/900099119-next-level-burger-lab" 
              target="_blank" 
              rel="noopener noreferrer" 
              key={item.id} 
              className="publicidad-card"
            >
              <div className="publicidad-image">
                <img 
                  src={item.imagen} 
                  alt="Publicidad Next Level en Rappi"
                  loading="lazy"
                />
              </div>
              <div className="publicidad-overlay">
                <span>Pide ahora en Rappi</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;