import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Obtener carrito por cliente
router.get('/:idCliente', async (req, res) => {
  try {
    const { idCliente } = req.params;
    const [rows] = await pool.query('SELECT * FROM Carrito_de_Compras WHERE idCliente = ?', [idCliente]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Agregar producto al carrito
router.post('/', async (req, res) => {
  try {
    const { idCliente, idProducto, cantidad } = req.body;

    const [result] = await pool.query(
      'INSERT INTO Carrito_de_Compras (idCliente, idProducto, cantidad) VALUES (?, ?, ?)',
      [idCliente, idProducto, cantidad]
    );

    res.status(201).json({ message: 'Producto agregado al carrito', idCarrito: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar al carrito' });
  }
});

export default router;

