import fs from 'fs';
import pool from './db.js';

export async function runSqlScript(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  // Divide en sentencias por ; y ejecuta cada una
  const statements = sql.split(/;\s*\n/).filter(Boolean);
  console.log('⏳ Aplicando cambios de nextlevelbl_db.sql a la base de datos...');
  for (const stmt of statements) {
    try {
      await pool.query(stmt);
      console.log('✅ Ejecutado:', stmt.split('\n')[0].slice(0, 80) + '...');
    } catch (err) {
      // Ignora errores de sentencias ya existentes
      if (
        !String(err).includes('ER_TABLE_EXISTS_ERROR') &&
        !String(err).includes('Duplicate entry') &&
        !String(err).includes('Duplicate key name') &&
        !String(err).includes('Unknown column') &&
        !String(err).includes('already exists')
      ) {
        console.error('❌ Error ejecutando sentencia:', stmt.split('\n')[0], err.sqlMessage || err);
      } else {
        console.warn('⚠️  Advertencia (ignorada):', err.sqlMessage || err);
      }
    }
  }
  console.log('🎉 Cambios de nextlevelbl_db.sql aplicados a la base de datos de Workbench.');
}
