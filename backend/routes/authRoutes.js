import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// ✅ Registro
router.post('/register', async (req, res) => {
  try {
    const {
      nombre, usuario, email, contraseña
    } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !usuario || !email || !contraseña) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario o el email ya están registrados
    const [existingUser] = await pool.query(
      'SELECT * FROM Clientes WHERE email = ? OR usuario = ?',
      [email, usuario]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El usuario o email ya está registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Insertar el nuevo usuario en la base de datos
    await pool.query(
      'INSERT INTO Clientes (nombre, usuario, email, contraseña) VALUES (?, ?, ?, ?)',
      [nombre, usuario, email, hashedPassword]
    );

    return res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// ✅ Login
router.post('/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Validar que ambos campos estén presentes
    if (!correo || !contraseña) {
      return res.status(400).json({ error: 'El correo y la contraseña son obligatorios' });
    }

    // Buscar al usuario en la base de datos
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE email = ?', [correo]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = rows[0];

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { idCliente: user.idCliente, idRol: user.idRol },
      process.env.JWT_SECRET || 'tu_secreto_seguro',
      { expiresIn: '1h' }
    );

    return res.json({
      message: 'Inicio de sesión exitoso',
      token,
      usuario: {
        idCliente: user.idCliente,
        nombre: user.nombre,
        email: user.email,
        idRol: user.idRol,
        isAdmin: user.isAdmin === 1 || user.idRol === 2 // Soporte para ambos campos
      },
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    return res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
});

// Obtener usuario actual (requiere token)
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token requerido' });
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_seguro');
    const [rows] = await pool.query(
      'SELECT idCliente, nombre, email, usuario, isAdmin FROM Clientes WHERE idCliente = ?',
      [decoded.idCliente]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    return res.json(rows[0]);
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
});

export default router;