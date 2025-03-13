import "dotenv/config";
import mysql from "mysql2/promise";

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

// Crear un pool de conexiones
const pool = mysql.createPool(dbConfig);

// Verificar la conexión con un query de prueba
async function testDBConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conexión exitosa a la base de datos MySQL");
    connection.release();
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
  }
}

testDBConnection();

export default pool;
