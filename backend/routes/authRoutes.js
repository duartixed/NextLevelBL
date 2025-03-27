import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;  
    console.log(req.body);

    if (!email || !contraseña) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    // 🔍 Buscar usuario en la base de datos
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const usuario = rows[0];

    // 🔐 Verificar la contraseña
    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 🛡️ Generar el Token JWT
    const token = jwt.sign(
      { idCliente: usuario.idCliente, idRol: usuario.idRol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Inicio de sesión exitoso', token, usuario });

  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
});

export default router;
