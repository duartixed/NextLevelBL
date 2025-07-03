// ...existing code...
import checkoutRoutes from './routes/checkoutRoutes.js';
import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import path from 'path';

import pool from './db.js'; // Se agregó .js para evitar error en import/extensions
import { runSqlScript } from './runSqlScript.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import carritoRoutes from './routes/carritoRoutes.js';
import productosRoutes from './routes/productosRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import carritoAnonimoRoutes from './routes/carritoAnonimoRoutes.js';
import carritosProductosRoutes from './routes/carritosProductosRoutes.js';

const app = express();
const PORT = 5000;

// Middleware global para loguear todas las peticiones
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl} - body:`, req.body);
  next();
});

// Configuración de Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// Montar rutas
app.use('/api/auth', authRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/carrito-anonimo', carritoAnonimoRoutes);
app.use('/api', carritosProductosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', checkoutRoutes); // Checkout debe ir después de inicializar app y rutas

// Ruta principal
app.get('/', (req, res) => {
  res.send(`🚀 API corriendo en el puerto ${PORT}`);
});

// Ruta de prueba de conexión a la base de datos
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
    return res.json({ success: true, resultado: rows[0].resultado });
  } catch (error) {
    console.error('❌ Error en la conexión a la base de datos:', error);
    return res.status(500).json({ success: false, message: 'Error en la conexión a la base de datos' });
  }
});

// Ruta temporal para inspeccionar datos de la base de datos
app.get('/inspect-db', async (req, res) => {
  try {
    const [productos] = await pool.query('SELECT * FROM Productos');
    const [carrito] = await pool.query('SELECT * FROM Carrito_de_Compras');
    res.json({ productos, carrito });
  } catch (error) {
    console.error('Error al inspeccionar la base de datos:', error);
    res.status(500).json({ error: 'Error al inspeccionar la base de datos' });
  }
});

// Ruta temporal para eliminar productos incorrectos del carrito
app.delete('/clean-carrito', async (req, res) => {
  console.log('Ruta /clean-carrito llamada');
  try {
    await pool.query(
      `DELETE FROM Carrito_de_Compras WHERE idProducto NOT IN (
        SELECT idProducto FROM Productos
      )`
    );
    res.json({ message: 'Productos incorrectos eliminados del carrito' });
  } catch (error) {
    console.error('Error al limpiar el carrito:', error);
    res.status(500).json({ error: 'Error al limpiar el carrito' });
  }
});


// Ruta para generar recibo de usuario registrado (última venta real)
app.get('/generate-receipt/:idCliente', async (req, res) => {
  try {
    const { idCliente } = req.params;
    // Buscar la última venta del cliente
    const [ventas] = await pool.query(
      `SELECT idVenta FROM Ventas WHERE idCliente = ? ORDER BY fecha DESC LIMIT 1`,
      [idCliente]
    );
    if (!ventas.length) {
      return res.json({ productos: [], total: 0 });
    }
    const idVenta = ventas[0].idVenta;
    // Traer los productos de esa venta
    const [productos] = await pool.query(
      `SELECT p.nombre, p.precio, dv.cantidad
         FROM DetalleVentas dv
         JOIN Productos p ON dv.idProducto = p.idProducto
         WHERE dv.idVenta = ?`,
      [idVenta]
    );
    const total = productos.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
    res.json({ productos, total });
  } catch (error) {
    console.error('Error al generar el recibo:', error);
    res.status(500).json({ error: 'Error al generar el recibo' });
  }
});

// Ruta para generar recibo de compra anónima (última venta real asociada al anonId)
app.get('/api/recibo-anonimo/:anonId', async (req, res) => {
  try {
    const { anonId } = req.params;
    // Buscar la última venta donde infoAnonimo contiene el anonId
    const [ventas] = await pool.query(
      `SELECT idVenta FROM Ventas WHERE JSON_EXTRACT(infoAnonimo, '$.anonId') = ? ORDER BY fecha DESC LIMIT 1`,
      [anonId]
    );
    if (!ventas.length) {
      return res.json({ productos: [], total: 0 });
    }
    const idVenta = ventas[0].idVenta;
    // Traer los productos de esa venta
    const [productos] = await pool.query(
      `SELECT p.nombre, p.precio, dv.cantidad
         FROM DetalleVentas dv
         JOIN Productos p ON dv.idProducto = p.idProducto
         WHERE dv.idVenta = ?`,
      [idVenta]
    );
    const total = productos.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
    res.json({ productos, total });
  } catch (error) {
    console.error('Error al generar el recibo anónimo:', error);
    res.status(500).json({ error: 'Error al generar el recibo anónimo' });
  }
});



// ==========================
// 🔹 INICIAR EL SERVIDOR
// ==========================
async function startServer() {
  // Ejecuta el script SQL al iniciar si la BD está vacía
  const sqlPath = path.resolve('./nextlevelbl_db.sql');
  await runSqlScript(sqlPath);

  try {
    await pool.query('SELECT 1');
    console.log('✅ Conexión a la base de datos establecida.');

    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
}

startServer();

export default app;
