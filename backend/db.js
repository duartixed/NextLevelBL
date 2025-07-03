import 'dotenv/config.js'; // Se agregó .js para evitar error en import/extensions
import mysql from 'mysql2/promise.js'; // Se agregó .js para evitar error en import/extensions

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_DATABASE || 'nextlevelbl',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
};

const pool = mysql.createPool(dbConfig);

async function testDBConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión exitosa a la base de datos MySQL');
    connection.release();
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    throw error; // Propagar el error para que la aplicación sepa si hay problemas
  }
}

testDBConnection();

export default pool;
