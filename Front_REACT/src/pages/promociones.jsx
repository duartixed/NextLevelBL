import React, { useContext } from 'react';
import '../styles/components/promociones.scss';
import { CarritoContext } from '../context/CarritoContext';
import especiales from '../assets/Img_front/especiales.png';

const Promociones = () => {
  const { agregarAlCarrito } = useContext(CarritoContext);

  const promociones = [
    {
      id: 1,
      titulo: "Combo Familiar",
      descripcion: "4 hamburguesas, 2 papas grandes, 4 bebidas",
      precio: 35.00,
      precioOriginal: 45.00,
      imagen: especiales
    },
    {
      id: 2,
      titulo: "Combo Amigos",
      descripcion: "2 hamburguesas, alitas, papas y bebidas",
      precio: 25.00,
      precioOriginal: 32.00,
      imagen: especiales
    }
  ];

  return (
    <div className="promociones-page">
      <h1>Promociones Especiales</h1>
      <div className="promociones-grid">
        {promociones.map((promo) => (
          <div key={promo.id} className="promo-card">
            <div className="promo-image">
              <img src={promo.imagen} alt={promo.titulo} />
              <div className="descuento">
                {Math.round(((promo.precioOriginal - promo.precio) / promo.precioOriginal) * 100)}% OFF
              </div>
            </div>
            <div className="promo-info">
              <h3>{promo.titulo}</h3>
              <p>{promo.descripcion}</p>
              <div className="precios">
                <span className="precio-original">${promo.precioOriginal.toFixed(2)}</span>
                <span className="precio-final">${promo.precio.toFixed(2)}</span>
              </div>
              <button onClick={() => agregarAlCarrito(promo)} className="btn-agregar-carrito">
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promociones;
