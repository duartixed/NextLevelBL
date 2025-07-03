import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Endpoint para finalizar compra (checkout) para usuarios registrados y anónimos
router.post('/checkout', async (req, res) => {
  /*
    Espera en req.body:
    {
      idCliente: (opcional, null si anónimo),
      productos: [ { idProducto, cantidad, precio } ],
      total: number,
      metodoPago: string ("nequi", "efectivo", etc),
      infoAnonimo: { nombre, telefono, direccion } (opcional)
    }
  */
  const { idCliente, productos, total, metodoPago, infoAnonimo } = req.body;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    // Insertar venta
    let ventaResult;
    if (idCliente) {
      [ventaResult] = await conn.query(
        'INSERT INTO Ventas (idCliente, fecha, total) VALUES (?, NOW(), ?)',
        [idCliente, total]
      );
    } else {
      // Guardar infoAnonimo como JSON en la columna infoAnonimo
      [ventaResult] = await conn.query(
        'INSERT INTO Ventas (fecha, total, infoAnonimo) VALUES (NOW(), ?, ?)',
        [total, JSON.stringify(infoAnonimo || {})]
      );
    }
    const idVenta = ventaResult.insertId;
    // Validar y descontar stock antes de insertar productos en DetalleVentas
    for (const prod of productos) {
      // Validar stock actual
      const [rows] = await conn.query(
        'SELECT stock FROM Productos WHERE idProducto = ?',
        [prod.idProducto]
      );
      if (rows.length === 0) {
        await conn.rollback();
        return res.status(404).json({ error: `Producto no encontrado: ${prod.idProducto}` });
      }
      if (rows[0].stock < prod.cantidad) {
        await conn.rollback();
        return res.status(400).json({ error: `Stock insuficiente para el producto ${prod.idProducto}` });
      }
      // Descontar stock
      await conn.query(
        'UPDATE Productos SET stock = stock - ? WHERE idProducto = ?',
        [prod.cantidad, prod.idProducto]
      );
      // Insertar en DetalleVentas
      await conn.query(
        'INSERT INTO DetalleVentas (idVenta, idProducto, cantidad, subtotal) VALUES (?, ?, ?, ?)',
        [idVenta, prod.idProducto, prod.cantidad, prod.precio * prod.cantidad]
      );
    }
    // Buscar idMetodoPago en la tabla MetodosPago
    let idMetodoPago = null;
    let metodoNombre = metodoPago || 'desconocido';
    const [metodoRows] = await conn.query(
      'SELECT idMetodoPago FROM MetodosPago WHERE LOWER(metodo) = LOWER(?) LIMIT 1',
      [metodoNombre]
    );
    if (metodoRows.length > 0) {
      idMetodoPago = metodoRows[0].idMetodoPago;
    } else {
      // Si no existe, insertar el método y obtener el id
      const [insertMetodo] = await conn.query(
        'INSERT INTO MetodosPago (metodo) VALUES (?)',
        [metodoNombre]
      );
      idMetodoPago = insertMetodo.insertId;
    }
    // Insertar registro de pago con ambos campos
    await conn.query(
      'INSERT INTO ProcesoPago (idVenta, idMetodoPago, estado, metodo) VALUES (?, ?, ?, ?)',
      [idVenta, idMetodoPago, 'Pendiente', metodoNombre]
    );
    await conn.commit();
    res.json({ success: true, idVenta });
  } catch (error) {
    await conn.rollback();
    console.error('Error en checkout:', error);
    res.status(500).json({ error: 'Error al finalizar la compra' });
  } finally {
    conn.release();
  }
});

export default router;
