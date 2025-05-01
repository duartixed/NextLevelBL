import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  console.log('Ingresando a get-productos')
  try {
    const [rows] = await pool.query('SELECT * FROM Productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Agregar un producto
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Productos WHERE idProducto = ?', [req.params.id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

export default router;
