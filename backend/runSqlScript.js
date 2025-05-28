import fs from 'fs';
import pool from './db.js';

export async function runSqlScript(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  // Divide en sentencias por ; y ejecuta cada una
  const statements = sql.split(/;\s*\n/).filter(Boolean);
  for (const stmt of statements) {
    try {
      await pool.query(stmt);
    } catch (err) {
      // Ignora errores de sentencias ya existentes
      if (!String(err).includes('ER_TABLE_EXISTS_ERROR') && !String(err).includes('Duplicate entry')) {
        console.error('Error ejecutando sentencia:', stmt, err);
      }
    }
  }
}
