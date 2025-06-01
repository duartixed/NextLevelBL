import React from "react";
import "../styles/components/home.scss";

// Importar componentes
import Hero from "../components/hero";
import Productos from "../components/productos";

import PropTypes from "prop-types";

const Home = ({ user, onAddToCart }) => {
  return (
    <div className="home">
      <main>
        <Hero />
        <Productos user={user} onAddToCart={onAddToCart} />
      </main>
    </div>
  );
};

export default Home;

Home.propTypes = {
  user: PropTypes.object,
  onAddToCart: PropTypes.func,
};