import React, { useContext } from 'react';
import '../styles/components/promociones.scss';
import { CarritoContext } from '../context/CarritoContext';
import burguerfries from '../assets/images/burguerfries.png';
import paracompartir from '../assets/images/paracompartirx24.png';
import StylizedTitle from '../components/StylizedTitle';

const Promociones = () => {
  const { agregarAlCarrito } = useContext(CarritoContext);

  const promociones = [
    {
      idProducto: 101, // IDs específicos para promociones
      nombre: "Combo Familiar",
      descripcion: "4 hamburguesas, 2 papas grandes, 4 bebidas",
      precio: 35.00,
      precioOriginal: 45.00,
      imagen: burguerfries,
      categoria: 'promociones'
    },
    {
      idProducto: 102, // IDs específicos para promociones
      nombre: "Combo Amigos",
      descripcion: "2 hamburguesas, alitas, papas y bebidas",
      precio: 25.00,
      precioOriginal: 32.00,
      imagen: paracompartir,
      categoria: 'promociones'
    }
  ];

  const handleAgregarAlCarrito = async (promo) => {
    try {
      const result = await agregarAlCarrito({
        idProducto: promo.idProducto,
        nombre: promo.nombre,
        precio: promo.precio,
        imagen: promo.imagen,
        descripcion: promo.descripcion
      });
      if (result && result.message && result.message.includes('agregado al carrito')) {
        window.alert('✅ Producto agregado al carrito');
      }
      // Si no hay result, la alerta de stock ya fue mostrada por el contexto
    } catch (error) {
      window.alert('❌ Error al agregar al carrito');
    }
  };

  return (
    <div className="promociones-page">
      <StylizedTitle 
        title="Promociones Especiales" 
        subtitle="Las mejores ofertas para ti"
      />
      <div className="promociones-grid">
        {promociones.map((promo) => (
          <div key={promo.idProducto} className="promo-card">
            <div className="promo-image">
              <img src={promo.imagen} alt={promo.nombre} />
              <div className="descuento">
                {Math.round(((promo.precioOriginal - promo.precio) / promo.precioOriginal) * 100)}% OFF
              </div>
            </div>
            <div className="promo-info">
              <h3>{promo.nombre}</h3>
              <p>{promo.descripcion}</p>
              <div className="precios">
                <span className="precio-original">${promo.precioOriginal.toFixed(2)}</span>
                <span className="precio-final">${promo.precio.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => handleAgregarAlCarrito(promo)} 
                className="btn-agregar-carrito"
              >
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
