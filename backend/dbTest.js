import pool from './db.js'; // Asegúrate de importar correctamente

async function testDB() {
  try {
    const { rows } = await pool.query('SELECT 1'); // pool se usa correctamente
    console.log('Conexión exitosa:', rows); // Ahora se usa "rows"
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
  }
}

testDB();