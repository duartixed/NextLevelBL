import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// ✅ Registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, usuario, email, contraseña } = req.body;

    if (!nombre || !usuario || !email || !contraseña) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const [existingUser] = await pool.query(
      'SELECT * FROM Clientes WHERE email = ? OR usuario = ?',
      [email, usuario]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El usuario o email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    await pool.query(
      'INSERT INTO Clientes (nombre, usuario, email, contraseña) VALUES (?, ?, ?, ?)',
      [nombre, usuario, email, hashedPassword, ]
    );

    return res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// ✅ Login
router.post('/signup', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      return res.status(400).json({ error: 'correo y la contraseña son obligatorios' });
    }

    const [rows] = await pool.query('SELECT * FROM Clientes WHERE email = ?', [correo]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas1' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas2' });
    }

    const token = jwt.sign(
      { idCliente: user.idCliente, idRol: user.idRol },
      process.env.JWT_SECRET || 'tu_secreto_seguro',
      { expiresIn: '1h' }
    );

    // 🟡 Inserta correo y contraseña en la tabla signup (solo para registro simple)
    await pool.query(
      'INSERT INTO signup (correo, contraseña) VALUES (?, ?)',
      [correo, contraseña]
    );

    return res.json({
      message: 'Inicio de sesión exitoso',
      token,
      usuario: {
        idCliente: user.idCliente,
        nombre: user.nombre,
        email: user.email,
      }
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    return res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
});

export default router;