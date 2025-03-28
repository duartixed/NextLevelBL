import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const [rows] = await pool.query('SELECT * FROM Clientes WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const usuario = rows[0];
    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { idCliente: usuario.idCliente, idRol: usuario.idRol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ message: 'Inicio de sesión exitoso', token, usuario }); // ✅ Asegura un return siempre
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error en el inicio de sesión:', error); // ✅ Evita `console.log` innecesario
    }
    return res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
});

export default router;
