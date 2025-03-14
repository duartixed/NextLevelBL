import 'dotenv/config.js'; // Se agregó .js para evitar error en import/extensions
import mysql from 'mysql2/promise.js'; // Se agregó .js para evitar error en import/extensions

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

async function testDBConnection() {
  try {
    const connection = await pool.getConnection();
    // console.log('✅ Conexión exitosa a la base de datos MySQL');
    connection.release();
  } catch (error) {
    // console.error('❌ Error al conectar a la base de datos:', error);
  }
}

testDBConnection();

export default pool;
