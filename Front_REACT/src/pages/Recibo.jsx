import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/recibo.scss';

const Recibo = () => {
  const { idCliente } = useParams();
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchRecibo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/generate-receipt/${idCliente}`);
        const data = await res.json();
        setProductos(data.productos);
        setTotal(data.total);
      } catch (error) {
        console.error('Error al obtener el recibo:', error);
      }
    };

    fetchRecibo();
  }, [idCliente]);

  return (
    <div className="recibo-container">
      <h1>Recibo de Compra</h1>
      <table className="recibo-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.nombre}</td>
              <td>${producto.precio.toFixed(2)}</td>
              <td>{producto.cantidad}</td>
              <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="recibo-total">
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Recibo;
