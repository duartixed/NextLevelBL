import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Obtener carrito por cliente
router.get('/:idCliente', async (req, res) => {
  try {
    const { idCliente } = req.params;
    const [rows] = await pool.query(
      `SELECT c.idCarrito, c.idProducto, c.cantidad, p.nombre, p.precio, p.imagen, p.descripcion
       FROM Carrito_de_Compras c
       JOIN Productos p ON c.idProducto = p.idProducto
       WHERE c.idCliente = ?`,
      [idCliente]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Agregar producto al carrito (si ya existe suma cantidad)
router.post('/', async (req, res) => {
  try {
    const { idCliente, idProducto, cantidad } = req.body;
    // Verificar si ya existe ese producto en el carrito
    const [exist] = await pool.query(
      'SELECT * FROM Carrito_de_Compras WHERE idCliente = ? AND idProducto = ?',
      [idCliente, idProducto]
    );
    if (exist.length > 0) {
      await pool.query(
        'UPDATE Carrito_de_Compras SET cantidad = cantidad + ? WHERE idCliente = ? AND idProducto = ?',
        [cantidad, idCliente, idProducto]
      );
      return res.json({ message: 'Cantidad actualizada en el carrito' });
    }
    const [result] = await pool.query(
      'INSERT INTO Carrito_de_Compras (idCliente, idProducto, cantidad) VALUES (?, ?, ?)',
      [idCliente, idProducto, cantidad]
    );
    return res.status(201).json({ message: 'Producto agregado al carrito', idCarrito: result.insertId });
  } catch (error) {
    return res.status(500).json({ error: 'Error al agregar al carrito' });
  }
});

// Actualizar cantidad de un producto en el carrito
router.put('/:idCarrito', async (req, res) => {
  try {
    const { cantidad } = req.body;
    const { idCarrito } = req.params;
    await pool.query('UPDATE Carrito_de_Compras SET cantidad = ? WHERE idCarrito = ?', [cantidad, idCarrito]);
    res.json({ message: 'Cantidad actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cantidad' });
  }
});

// Eliminar producto del carrito
router.delete('/:idCarrito', async (req, res) => {
  try {
    const { idCarrito } = req.params;
    await pool.query('DELETE FROM Carrito_de_Compras WHERE idCarrito = ?', [idCarrito]);
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
});

// Vaciar carrito de un cliente
router.delete('/vaciar/:idCliente', async (req, res) => {
  try {
    const { idCliente } = req.params;
    await pool.query('DELETE FROM Carrito_de_Compras WHERE idCliente = ?', [idCliente]);
    res.json({ message: 'Carrito vaciado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al vaciar el carrito' });
  }
});

export default router;
