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
    console.log('POST /api/carrito-anonimo body:', req.body);
    const { idAnonimo, idProducto, cantidad } = req.body;
    if (!idAnonimo || !idProducto || !cantidad) {
      console.warn('Faltan datos requeridos:', req.body);
      return res.status(400).json({ error: 'Faltan datos requeridos', body: req.body });
    }
    // Validar existencia y stock del producto
    const [productos] = await pool.query(
      'SELECT stock, nombre, categoria FROM Productos WHERE idProducto = ?',
      [idProducto]
    );
    if (productos.length === 0) {
      console.warn('Producto no encontrado:', idProducto);
      return res.status(404).json({ error: 'Producto no encontrado', idProducto });
    }
    const stockDisponible = productos[0].stock;
    // Verificar si ya existe ese producto en el carrito anónimo
    const [exist] = await pool.query(
      'SELECT cantidad FROM carrito_anonimo WHERE idAnonimo = ? AND idProducto = ?',
      [idAnonimo, idProducto]
    );
    let cantidadEnCarrito = 0;
    if (exist.length > 0) {
      cantidadEnCarrito = exist[0].cantidad;
    }
    // Ahora la cantidad enviada es la cantidad total deseada, no la suma
    if (cantidad > stockDisponible) {
      console.warn('Stock insuficiente para producto:', idProducto, 'Stock:', stockDisponible, 'Solicitado:', cantidad);
      return res.status(400).json({ error: 'Stock insuficiente para la cantidad solicitada', stockDisponible, solicitado: cantidad });
    }
    if (exist.length > 0) {
      await pool.query(
        'UPDATE carrito_anonimo SET cantidad = ? WHERE idAnonimo = ? AND idProducto = ?',
        [cantidad, idAnonimo, idProducto]
      );
      return res.json({ message: 'Cantidad actualizada en el carrito anónimo' });
    }
    const [result] = await pool.query(
      'INSERT INTO carrito_anonimo (idAnonimo, idProducto, cantidad) VALUES (?, ?, ?)',
      [idAnonimo, idProducto, cantidad]
    );
    return res.status(201).json({ message: 'Producto agregado al carrito anónimo', idCarrito: result.insertId });
  } catch (error) {
    console.error('Error real al agregar al carrito anónimo:', error, 'Body:', req.body);
    return res.status(500).json({ error: 'Error al agregar al carrito anónimo', detalle: error.message, body: req.body });
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
