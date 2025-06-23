import pool from '../db.js';

// Obtener todos los carritos anónimos agrupados por idAnonimo
export async function getAllAnonCarts(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT ca.idAnonimo, ca.idProducto, ca.cantidad, p.nombre, p.precio, p.imagen, p.descripcion
       FROM Carrito_Anonimo ca
       JOIN Productos p ON ca.idProducto = p.idProducto
       ORDER BY ca.idAnonimo, ca.fechaCreacion DESC`
    );
    // Agrupar por idAnonimo
    const carritos = {};
    for (const row of rows) {
      if (!carritos[row.idAnonimo]) carritos[row.idAnonimo] = [];
      carritos[row.idAnonimo].push(row);
    }
    res.json(carritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos anónimos' });
  }
}
