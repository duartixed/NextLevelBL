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
    const [usuariosCount] = await pool.query('SELECT COUNT(*) as total FROM Clientes');
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
      totalUsuarios: usuariosCount[0].total,
      ventasRecientes
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

// Get monthly sales data
router.get('/ventas-mensuales', async (req, res) => {
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

export default router;
