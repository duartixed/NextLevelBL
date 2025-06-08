-- Insertar roles si no existen
INSERT IGNORE INTO Roles (idRol, nombre_rol) VALUES (1, 'Cliente'), (2, 'Administrador');

-- Insertar administrador si no existe
INSERT IGNORE INTO Clientes (nombre, email, contraseña, usuario, idRol) 
VALUES ('Admin', 'admin@nextlevelbl.com', '12345', 'admin', 2);
