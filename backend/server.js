import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import path from 'path';

import pool from './db.js'; // Se agregó .js para evitar error en import/extensions
import { runSqlScript } from './runSqlScript.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import carritoRoutes from './routes/carritoRoutes.js'; // ❌ Antes estaba mal
import productosRoutes from './routes/productosRoutes.js'; // ❌ Antes estaba mal

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

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

// Rutas de la API
app.use('/api/auth', authRoutes); // Registro e inicio de sesión
app.use('/api/carrito', carritoRoutes); // Gestión del carrito de compras
app.use('/api/productos', productosRoutes); // CRUD de productos

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
