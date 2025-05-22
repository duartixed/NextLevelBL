import React from "react";
import "../styles/components/home.scss";

// Importar componentes
import Header from "../components/header";
import Hero from "../components/hero";
import Productos from "../components/productos";
import Footer from "../components/footer";

const Home = ({ user, onAddToCart }) => {
  return (
    <div className="home">
      <Header />
      <main>
        <Hero />
        <Productos user={user} onAddToCart={onAddToCart} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;