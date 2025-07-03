// Script de prueba automatizada de endpoints backend
// Requiere instalar axios: npm install axios

const axios = require('axios');

async function testEndpoints() {
  try {
    // Test productos
    const productos = await axios.get('http://localhost:3001/api/productos');
    console.log('Productos:', productos.data.length, 'productos recibidos');

    // Test carrito (ajusta idCliente según corresponda)
    const carrito = await axios.get('http://localhost:3001/api/carrito/1');
    console.log('Carrito:', carrito.data);

    // Test agregar producto al carrito
    const add = await axios.post('http://localhost:3001/api/carrito', {
      idCliente: 1,
      idProducto: productos.data[0].idProducto,
      cantidad: 1
    });
    console.log('Agregar al carrito:', add.data);

    // Test eliminar producto del carrito
    const del = await axios.delete(`http://localhost:3001/api/carrito/1/${productos.data[0].idProducto}`);
    console.log('Eliminar del carrito:', del.data);

    console.log('Todos los endpoints respondieron correctamente.');
  } catch (err) {
    console.error('Error en pruebas:', err.response ? err.response.data : err.message);
  }
}

testEndpoints();
