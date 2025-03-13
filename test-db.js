require('dotenv').config();
const mysql = require('mysql2/promise');

async function testDB() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });

        console.log('✅ Conexión exitosa a la base de datos');
        await connection.end();
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
    }
}

testDB();
