import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'tu_secreto_seguro';

export const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(403).json({ message: 'Acceso denegado. No hay token.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
    req.user = decoded;
    return next(); // ✅ Ahora siempre retorna algo
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.idRol !== 2) { // 2 es el rol de administrador
    return res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador.' });
  }
  return next();
};
