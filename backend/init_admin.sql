-- Insertar roles si no existen
INSERT IGNORE INTO Roles (idRol, nombre_rol) VALUES (1, 'Cliente'), (2, 'Administrador');

-- Insertar administradores si no existen
INSERT IGNORE INTO Clientes (nombre, email, contraseña, usuario, idRol) 
VALUES 
('Admin', 'admin@nextlevelbl.com', '12345', 'admin', 2),
('David Mendoza', 'dcmendozar@gmail.com', '12345', 'dcmendozar', 2),
('Kevin Rodriguez', 'kevinrodriguez019@hotmail.com', '12345', 'kevinrodriguez', 2),
('Franchesca', 'vfranchesca27@gmail.com', '12345', 'franchesca', 2);
