const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

router.post('/registrar', async (req, res) => {
  const { nombre, correo, contraseña, telefono, direccion, idRol } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const [result] = await pool.query(
      'INSERT INTO Clientes (nombre, correo, contraseña, telefono, direccion, idRol) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, correo, hashedPassword, telefono, direccion, idRol]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente', idCliente: result.insertId });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error del servidor al registrar el usuario' });
  }
});

module.exports = router;
