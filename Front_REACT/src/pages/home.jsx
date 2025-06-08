import React from "react";
import "../styles/components/home.scss";
import { Link } from "react-router-dom";
import Hero from "../components/hero";
import StylizedTitle from '../components/StylizedTitle';

const Home = () => {
  const categorias = [
    { id: "hamburguesas", nombre: "Hamburguesas", imagen: require("../assets/images/burgers.png") },
    { id: "papas", nombre: "Papas Fritas", imagen: require("../assets/Img_front/best fries.png") },
    { id: "bebidas", nombre: "Bebidas", imagen: require("../assets/Img_front/drinks.png") },
    { id: "alitas", nombre: "Alitas", imagen: require("../assets/Img_front/wings.png") },
    { id: "hotdogs", nombre: "Hot Dogs", imagen: require("../assets/Img_front/hotdogs.png") },
    { id: "entradas", nombre: "Entradas", imagen: require("../assets/Img_front/entradas.png") }
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
    </div>
  );
};

export default Home;