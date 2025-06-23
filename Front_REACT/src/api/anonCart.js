import axios from 'axios';

export function getAnonId() {
  let anonId = localStorage.getItem('anonId');
  if (!anonId) {
    anonId = 'anon_' + Math.random().toString(36).substr(2, 12);
    localStorage.setItem('anonId', anonId);
  }
  return anonId;
}

export async function agregarAlCarritoAnonimo(idProducto, cantidad = 1) {
  const idAnonimo = getAnonId();
  await axios.post('http://localhost:5000/api/carrito-anonimo', {
    idAnonimo,
    idProducto,
    cantidad
  });
}

export async function obtenerCarritoAnonimo() {
  const idAnonimo = getAnonId();
  const res = await axios.get(`http://localhost:5000/api/carrito-anonimo/${idAnonimo}`);
  return res.data;
}

// Eliminar producto del carrito anónimo
export async function eliminarDelCarritoAnonimo(idProducto) {
  const idAnonimo = getAnonId();
  await axios.delete(`http://localhost:5000/api/carrito-anonimo/${idAnonimo}/${idProducto}`);
}

// Actualizar cantidad de producto en el carrito anónimo
export async function actualizarCantidadAnonimo(idProducto, cantidad) {
  const idAnonimo = getAnonId();
  // Simula actualización: elimina si cantidad <= 0, si no, agrega con la nueva cantidad (reemplaza)
  if (cantidad <= 0) {
    await eliminarDelCarritoAnonimo(idProducto);
  } else {
    // Elimina primero el producto y luego lo agrega con la nueva cantidad
    await eliminarDelCarritoAnonimo(idProducto);
    await agregarAlCarritoAnonimo(idProducto, cantidad);
  }
}
