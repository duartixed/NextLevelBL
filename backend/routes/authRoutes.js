import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, contraseña, telefono, direccion, idRol } = req.body;
    if (!nombre || !email || !contraseña || !idRol) {
      return res.status(400).json({ error: 'Todos los campos obligatorios' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Insertar en la base de datos
    const [result] = await pool.query(
      'INSERT INTO Clientes (nombre, email, contraseña, telefono, direccion, idRol) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, email, hashedPassword, telefono, direccion, idRol]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente', idCliente: result.insertId });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const {nombre_usuario, email, contraseña } = req.body;  
    consolelog('Hola Mundo');
    if ( !nombre_usuario || !email || !contraseña) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const [rows] = await pool.query('SELECT * FROM Clientes WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });

    const usuario = rows[0];
    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ idCliente: usuario.idCliente, idRol: usuario.idRol }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
});

export default router;

