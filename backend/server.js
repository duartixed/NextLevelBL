/* eslint-disable no-console */ // Se desactiva eslint para console.log

import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import pool from './db.js'; // Se agregó .js para evitar error en import/extensions

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send(`🚀 API corriendo en el puerto ${PORT}`);
});

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
    return res.json({ success: true, resultado: rows[0].resultado }); // Se agregó return para evitar warning
  } catch (error) {
    console.error('❌ Error en la conexión a la base de datos:', error);
    return res.status(500).json({ success: false, message: 'Error en la conexión a la base de datos' });
  }
});

app.get('/api/carrito', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Carrito_de_Compras');
    return res.json(rows);
  } catch (error) {
    console.error('❌ Error al obtener carritos:', error);
    return res.status(500).json({ error: 'Error al obtener carritos' });
  }
});

app.post('/api/carrito', async (req, res) => {
  try {
    const { idCliente } = req.body;
    if (!idCliente) {
      return res.status(400).json({ error: 'idCliente es obligatorio' });
    }

    const [cliente] = await pool.query('SELECT idCliente FROM Clientes WHERE idCliente = ?', [idCliente]);
    if (cliente.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const [result] = await pool.query('INSERT INTO Carrito_de_Compras (idCliente) VALUES (?)', [idCliente]);
    return res.status(201).json({ idCarrito: result.insertId, message: 'Carrito creado exitosamente' });
  } catch (error) {
    console.error('❌ Error al crear carrito:', error);
    return res.status(500).json({ error: 'Error al crear carrito' });
  }
});

// ==========================
// 🔹 INICIAR EL SERVIDOR
// ==========================
async function startServer() {
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
