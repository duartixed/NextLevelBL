import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Endpoint para obtener todos los productos actualmente en carritos (usuarios y anónimos)
router.get('/carritos/productos', async (req, res) => {
  try {
    // Productos en carritos de usuarios
    const [carritoUsuarios] = await pool.query(`
      SELECT c.idProducto, p.nombre, SUM(c.cantidad) as cantidad, p.stock, p.precio, p.imagen, 'usuario' as tipo
      FROM Carrito_de_Compras c
      JOIN Productos p ON c.idProducto = p.idProducto
      GROUP BY c.idProducto
    `);
    // Productos en carritos anónimos
    const [carritoAnonimos] = await pool.query(`
      SELECT ca.idProducto, p.nombre, SUM(ca.cantidad) as cantidad, p.stock, p.precio, p.imagen, 'anonimo' as tipo
      FROM Carrito_Anonimo ca
      JOIN Productos p ON ca.idProducto = p.idProducto
      GROUP BY ca.idProducto
    `);
    const productos = [...carritoUsuarios, ...carritoAnonimos];
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos en carritos' });
  }
});

export default router;
