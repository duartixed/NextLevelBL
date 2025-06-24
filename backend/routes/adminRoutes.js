import express from 'express';
import pool from '../db.js';
import { authenticateUser, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta protegida para obtener estadísticas
router.get('/stats', authenticateUser, isAdmin, async (req, res) => {
  try {
    // Obtener estadísticas de la base de datos
    const [ventasTotal] = await pool.query('SELECT COALESCE(SUM(total), 0) as total FROM Ventas');
    const [productosCount] = await pool.query('SELECT COUNT(*) as total FROM Productos');
    // Contar clientes normales y administradores por separado
    const [clientesCount] = await pool.query('SELECT COUNT(*) as total FROM Clientes WHERE idRol = 1');
    const [adminsCount] = await pool.query('SELECT COUNT(*) as total FROM Clientes WHERE idRol = 2');
    const [ventasRecientes] = await pool.query(`
      SELECT v.idVenta as id, c.nombre as cliente, v.fecha, v.total, 
             CASE 
               WHEN p.estado = 'Pendiente' THEN 'Pendiente'
               WHEN p.estado = 'Completado' THEN 'Completado'
               ELSE 'Cancelado'
             END as estado
      FROM Ventas v
      JOIN Clientes c ON v.idCliente = c.idCliente
      LEFT JOIN ProcesoPago p ON v.idVenta = p.idVenta
      ORDER BY v.fecha DESC
      LIMIT 10
    `);

    res.json({
      totalVentas: ventasTotal[0].total || 0,
      totalProductos: productosCount[0].total,
      totalClientes: clientesCount[0].total,
      totalAdmins: adminsCount[0].total,
      ventasRecientes
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

// Get monthly sales data
router.get('/ventas-mensuales', authenticateUser, isAdmin, async (req, res) => {
  try {
    const [results] = await pool.query(`
      SELECT 
        DATE_FORMAT(fecha, '%Y-%m') as mes,
        SUM(total) as total
      FROM Ventas
      GROUP BY DATE_FORMAT(fecha, '%Y-%m')
      ORDER BY mes DESC
      LIMIT 12
    `);
    
    res.json(results);
  } catch (error) {
    console.error('Error getting monthly sales:', error);
    res.status(500).json({ error: 'Error al obtener ventas mensuales' });
  }
});

// Actualizar estado de una orden
router.put('/orden/:id/estado', authenticateUser, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['Pendiente', 'Completado', 'Cancelado'].includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido' });
    }

    await pool.query(
      'UPDATE ProcesoPago SET estado = ? WHERE idVenta = ?',
      [estado, id]
    );

    res.json({ message: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    res.status(500).json({ error: 'Error al actualizar estado de la orden' });
  }
});

// Obtener detalles de una venta específica
router.get('/venta/:id', authenticateUser, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const [venta] = await pool.query(`
      SELECT v.*, c.nombre as cliente, c.email, c.telefono, c.direccion
      FROM Ventas v
      JOIN Clientes c ON v.idCliente = c.idCliente
      WHERE v.idVenta = ?
    `, [id]);

    if (venta.length === 0) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    const [detalles] = await pool.query(`
      SELECT dv.*, p.nombre, p.precio
      FROM DetalleVentas dv
      JOIN Productos p ON dv.idProducto = p.idProducto
      WHERE dv.idVenta = ?
    `, [id]);

    res.json({
      venta: venta[0],
      detalles
    });
  } catch (error) {
    console.error('Error al obtener detalles de venta:', error);
    res.status(500).json({ error: 'Error al obtener detalles de la venta' });
  }
});

// Obtener lista de clientes con paginación y total
router.get('/clientes', authenticateUser, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Total de clientes
    const [totalResult] = await pool.query('SELECT COUNT(*) as total FROM Clientes WHERE idRol = 1');
    const total = totalResult[0].total;

    // Clientes paginados
    const [clientes] = await pool.query(`
      SELECT idCliente, nombre, email, telefono, direccion, 
             (SELECT COUNT(*) FROM Ventas WHERE idCliente = c.idCliente) as totalCompras,
             (SELECT COALESCE(SUM(total), 0) FROM Ventas WHERE idCliente = c.idCliente) as totalGastado
      FROM Clientes c
      WHERE idRol = 1
      ORDER BY totalCompras DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    res.json({ clientes, total });
  } catch (error) {
    console.error('Error al obtener lista de clientes:', error);
    res.status(500).json({ error: 'Error al obtener lista de clientes' });
  }
});

// Obtener estadísticas detalladas de productos
router.get('/productos/stats', async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        p.idProducto,
        p.nombre,
        p.precio,
        p.stock,
        COUNT(dv.idProducto) as vecesVendido,
        COALESCE(SUM(dv.cantidad), 0) as unidadesVendidas,
        COALESCE(SUM(dv.subtotal), 0) as ingresosTotales,
        p.imagen,
        p.descripcion
      FROM Productos p
      LEFT JOIN DetalleVentas dv ON p.idProducto = dv.idProducto
      GROUP BY p.idProducto
      ORDER BY unidadesVendidas DESC
    `);

    res.json({ productos: stats });
  } catch (error) {
    console.error('Error al obtener estadísticas de productos:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas de productos' });
  }
});

export default router;

// Alias temporal para pedidos (devuelve ventas como pedidos)
// Ruta de pedidos con paginación para el panel admin
router.get('/pedidos', authenticateUser, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Traer ventas con info de cliente y estado
    const [ventas] = await pool.query(`
      SELECT v.idVenta, v.idCliente, c.nombre as cliente, v.fecha, v.total, p.estado,
        CASE WHEN v.idCliente IS NULL THEN 'anonimo' ELSE 'registrado' END as tipo
      FROM Ventas v
      LEFT JOIN Clientes c ON v.idCliente = c.idCliente
      LEFT JOIN ProcesoPago p ON v.idVenta = p.idVenta
      ORDER BY v.fecha DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    // Para cada venta, traer los productos asociados
    for (const venta of ventas) {
      const [productos] = await pool.query(`
        SELECT dv.idProducto, COALESCE(p.nombre, 'Eliminado') as nombre, dv.cantidad, dv.subtotal, p.precio, p.imagen
        FROM DetalleVentas dv
        LEFT JOIN Productos p ON dv.idProducto = p.idProducto
        WHERE dv.idVenta = ?
      `, [venta.idVenta]);
      venta.productos = productos;
    }

    const [total] = await pool.query('SELECT COUNT(*) as total FROM Ventas');
    res.json({ pedidos: ventas, total: total[0].total });
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});
