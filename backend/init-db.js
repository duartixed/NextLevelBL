import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function initDatabase() {
    // Configuración inicial sin seleccionar una base de datos    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345',
        multipleStatements: true
    });

    try {
        console.log('🔄 Iniciando configuración de la base de datos...');
        
        // Crear la base de datos si no existe
        await connection.query('CREATE DATABASE IF NOT EXISTS nextlevelbl;');
        await connection.query('USE nextlevelbl;');
        
        // Verificar si las tablas ya existen
        const [tables] = await connection.query('SHOW TABLES;');
        if (tables.length === 0) {
            console.log('📦 Creando estructura de la base de datos...');
            
            // Leer y ejecutar el script SQL principal solo si no hay tablas
            const mainSqlScript = fs.readFileSync(path.join(__dirname, 'nextlevelbl_db.sql'), 'utf8');
            await connection.query(mainSqlScript);
            console.log('✅ Esquema de base de datos importado correctamente');

            // Leer y ejecutar el script de roles
            const rolesSqlScript = fs.readFileSync(path.join(__dirname, 'init_roles.sql'), 'utf8');
            await connection.query(rolesSqlScript);
            console.log('✅ Roles inicializados correctamente');

            // Leer y ejecutar el script de admin
            const adminSqlScript = fs.readFileSync(path.join(__dirname, 'init_admin.sql'), 'utf8');
            await connection.query(adminSqlScript);
            console.log('✅ Usuario administrador creado correctamente');
        } else {
            console.log('✅ La base de datos ya está configurada');
        }

        console.log('✅ Proceso de configuración completado exitosamente');
    } catch (error) {
        console.error('❌ Error durante la configuración de la base de datos:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

initDatabase().catch(console.error);
