import React from "react";
import "../styles/components/home.scss";
import { Link } from "react-router-dom";
import Hero from "../components/hero";

const Home = () => {
  const categorias = [
    { id: "hamburguesas", nombre: "Hamburguesas", imagen: require("../assets/images/burgers.png") },
    { id: "papas", nombre: "Papas Fritas", imagen: require("../assets/Img_front/best fries.png") },
    { id: "bebidas", nombre: "Bebidas", imagen: require("../assets/Img_front/drinks.png") },
    { id: "alitas", nombre: "Alitas", imagen: require("../assets/Img_front/wings.png") },
    { id: "hotdogs", nombre: "Hot Dogs", imagen: require("../assets/Img_front/hotdogs.png") },
    { id: "entradas", nombre: "Entradas", imagen: require("../assets/Img_front/entradas.png") },
    { id: "especiales", nombre: "Especiales", imagen: require("../assets/Img_front/especiales.png") },
  ];

  return (
    <div className="home">
      <Hero />

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
    </div>
  );
};

export default Home;