import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function setupDatabase() {
    // Configuración inicial sin seleccionar una base de datos
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        multipleStatements: true
    });

    try {
        // Leer y ejecutar el script SQL principal
        const mainSqlScript = fs.readFileSync(path.join(__dirname, 'nextlevelbl_db.sql'), 'utf8');
        await connection.query(mainSqlScript);
        console.log('✅ Base de datos creada y esquema importado correctamente');

        // Leer y ejecutar el script de roles
        const rolesSqlScript = fs.readFileSync(path.join(__dirname, 'init_roles.sql'), 'utf8');
        await connection.query(rolesSqlScript);
        console.log('✅ Roles inicializados correctamente');

        // Leer y ejecutar el script de admin
        const adminSqlScript = fs.readFileSync(path.join(__dirname, 'init_admin.sql'), 'utf8');
        await connection.query(adminSqlScript);
        console.log('✅ Usuario administrador creado correctamente');

        console.log('✅ Configuración de la base de datos completada exitosamente');
    } catch (error) {
        console.error('❌ Error durante la configuración de la base de datos:', error);
    } finally {
        await connection.end();
    }
}

setupDatabase();
