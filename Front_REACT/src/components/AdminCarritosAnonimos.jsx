import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCarritosAnonimos = () => {
  const [carritos, setCarritos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarritos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/carrito-anonimo/');
        setCarritos(response.data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los carritos anónimos');
      } finally {
        setLoading(false);
      }
    };
    fetchCarritos();
  }, []);

  if (loading) return <div>Cargando carritos anónimos...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!carritos || Object.keys(carritos).length === 0) return <div>No hay carritos anónimos activos.</div>;

  return (
    <div className="admin-carritos-anonimos">
      <h2>Carritos de Visitantes (Anónimos)</h2>
      {Object.entries(carritos).map(([idAnonimo, productos]) => (
        <div key={idAnonimo} className="anon-cart-block">
          <h4>ID Visitante: {idAnonimo}</h4>
          <ul>
            {productos.map((prod, idx) => (
              <li key={prod.idProducto + '-' + idx}>
                <b>{prod.nombre}</b> (x{prod.cantidad}) - ${prod.precio}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminCarritosAnonimos;
