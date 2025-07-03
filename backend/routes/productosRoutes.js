import express from 'express';
import pool from '../db.js';
import { authenticateUser, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();


// Obtener todos los productos
router.get('/', async (req, res) => {
  console.log('Ingresando a get-productos');
  try {
    const [rows] = await pool.query('SELECT * FROM Productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener todas las categorías distintas de productos
router.get('/categorias', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT DISTINCT categoria FROM Productos');
    const categorias = rows.map(row => row.categoria);
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});

// Obtener productos por categoría
router.get('/categoria/:categoria', async (req, res) => {
  try {
    const { categoria } = req.params;
    const [rows] = await pool.query('SELECT * FROM Productos WHERE categoria = ?', [categoria]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos por categoría' });
  }
});

// Agregar un producto
router.post('/', authenticateUser, isAdmin, async (req, res) => {
  try {
    const {
      nombre, descripcion, precio, stock
    } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, precio, stock]
    );

    res.status(201).json({ message: 'Producto agregado', idProducto: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

// Actualizar producto
router.put('/:id', authenticateUser, isAdmin, async (req, res) => {
  try {
    const {
      nombre, descripcion, precio, stock
    } = req.body;
    await pool.query(
      'UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE idProducto = ?',
      [nombre, descripcion, precio, stock, req.params.id]
    );

    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar producto
router.delete('/:id', authenticateUser, isAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM Productos WHERE idProducto = ?', [req.params.id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

export default router;
