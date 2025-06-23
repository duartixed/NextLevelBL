import express from 'express';
import pool from '../db.js';
import { getAllAnonCarts } from './getAllAnonCarts.js';

const router = express.Router();

// Obtener carrito anónimo por idAnonimo
router.get('/:idAnonimo', async (req, res) => {
  try {
    const { idAnonimo } = req.params;
    const [rows] = await pool.query(
      `SELECT ca.idAnonimo, ca.idProducto, ca.cantidad, p.nombre, p.precio, p.imagen, p.descripcion
       FROM carrito_anonimo ca
       JOIN Productos p ON ca.idProducto = p.idProducto
       WHERE ca.idAnonimo = ?`,
      [idAnonimo]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito anónimo' });
  }
});

// Obtener todos los carritos anónimos agrupados
router.get('/', getAllAnonCarts);

// Agregar producto al carrito anónimo (si ya existe suma cantidad)
router.post('/', async (req, res) => {
  try {
    const { idAnonimo, idProducto, cantidad } = req.body;
    if (!idAnonimo || !idProducto || !cantidad) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    // Verificar si ya existe ese producto en el carrito anónimo
    const [exist] = await pool.query(
      'SELECT * FROM carrito_anonimo WHERE idAnonimo = ? AND idProducto = ?',
      [idAnonimo, idProducto]
    );
    if (exist.length > 0) {
      await pool.query(
        'UPDATE carrito_anonimo SET cantidad = cantidad + ? WHERE idAnonimo = ? AND idProducto = ?',
        [cantidad, idAnonimo, idProducto]
      );
      // Restar stock
      await pool.query('UPDATE Productos SET stock = stock - ? WHERE idProducto = ?', [cantidad, idProducto]);
      return res.json({ message: 'Cantidad actualizada en el carrito anónimo y stock actualizado' });
    }
    const [result] = await pool.query(
      'INSERT INTO carrito_anonimo (idAnonimo, idProducto, cantidad) VALUES (?, ?, ?)',
      [idAnonimo, idProducto, cantidad]
    );
    // Restar stock
    await pool.query('UPDATE Productos SET stock = stock - ? WHERE idProducto = ?', [cantidad, idProducto]);
    return res.status(201).json({ message: 'Producto agregado al carrito anónimo y stock actualizado', idCarrito: result.insertId });
  } catch (error) {
    return res.status(500).json({ error: 'Error al agregar al carrito anónimo' });
  }
});

// Eliminar producto del carrito anónimo
router.delete('/:idAnonimo/:idProducto', async (req, res) => {
  try {
    const { idAnonimo, idProducto } = req.params;
    await pool.query('DELETE FROM carrito_anonimo WHERE idAnonimo = ? AND idProducto = ?', [idAnonimo, idProducto]);
    res.json({ message: 'Producto eliminado del carrito anónimo' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto del carrito anónimo' });
  }
});

// Vaciar carrito anónimo
router.delete('/vaciar/:idAnonimo', async (req, res) => {
  let { idAnonimo } = req.params;
  if (!idAnonimo || idAnonimo === 'null' || idAnonimo === 'undefined') {
    return res.json({ message: 'Carrito anónimo vaciado (id inválido o no enviado)' });
  }
  idAnonimo = String(idAnonimo);
  try {
    await pool.query('DELETE FROM carrito_anonimo WHERE idAnonimo = ?', [idAnonimo]);
    return res.json({ message: 'Carrito anónimo vaciado' });
  } catch (error) {
    console.error('Error al vaciar carrito anónimo:', error);
    return res.status(500).json({ message: 'Error al vaciar carrito anónimo', error: error.message });
  }
});

export default router;
