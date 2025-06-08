-- Actualizar los correos específicos como administradores
UPDATE Clientes SET idRol = 2, contraseña = '12345' WHERE email IN ('dcmendozar@gmail.com', 'kevinrodriguez019@hotmail.com');

-- Si no existen, los creamos
INSERT IGNORE INTO Clientes (nombre, email, contraseña, usuario, idRol)
VALUES 
('David Mendoza', 'dcmendozar@gmail.com', '12345', 'dcmendozar', 2),
('Kevin Rodriguez', 'kevinrodriguez019@hotmail.com', '12345', 'kevinrodriguez', 2);
