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
  try {
    await axios.post('http://localhost:5000/api/carrito-anonimo', {
      idAnonimo,
      idProducto,
      cantidad
    });
    return { success: true };
  } catch (error) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.includes('Stock insuficiente')
    ) {
      // Propaga el error de stock insuficiente de forma controlada
      throw new Error('Stock insuficiente');
    }
    throw error;
  }
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
  if (cantidad <= 0) {
    await eliminarDelCarritoAnonimo(idProducto);
    return;
  }
  // Antes de eliminar, verifica si hay stock suficiente
  try {
    // Intenta agregar con la cantidad deseada, pero NO elimines el producto original si falla
    await agregarAlCarritoAnonimo(idProducto, cantidad);
    // Si se pudo agregar, elimina el anterior (si existe) y deja el nuevo (esto asegura que la cantidad es la correcta)
    await eliminarDelCarritoAnonimo(idProducto);
    await agregarAlCarritoAnonimo(idProducto, cantidad);
  } catch (error) {
    // Si hay error de stock, NO elimines el producto existente, solo lanza la alerta
    // NO hagas nada, solo lanza el error
    throw error;
  }
}
