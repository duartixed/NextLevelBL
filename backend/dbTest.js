import pool from './db.js';

async function testDB() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('✅ Conexión exitosa a MySQL, resultado:', rows[0].solution);
  } catch (error) {
    console.error('❌ Error en la conexión a MySQL:', error);
  }
}

testDB();
