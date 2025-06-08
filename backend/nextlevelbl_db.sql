-- BASE DE DATO PARA NEXTLEVELBL
-- =============================
CREATE DATABASE IF NOT EXISTS nextlevelbl;
USE nextlevelbl;

-- =============================
-- TABLAS PRINCIPALEs
-- =============================
CREATE TABLE IF NOT EXISTS Roles (
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Clientes (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    usuario VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    idRol INT DEFAULT 1,
    FOREIGN KEY (idRol) REFERENCES Roles(idRol)
);

CREATE TABLE IF NOT EXISTS Productos (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    imagen VARCHAR(255),
    categoria VARCHAR(50) NOT NULL DEFAULT 'General'
);

CREATE TABLE IF NOT EXISTS DetalleProductos (
    idDetalle INT AUTO_INCREMENT PRIMARY KEY,
    idProducto INT NOT NULL,
    especificacion TEXT,
    FOREIGN KEY (idProducto) REFERENCES Productos(idProducto) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Carrito_de_Compras (
    idCarrito INT AUTO_INCREMENT PRIMARY KEY,
    idCliente INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES Clientes(idCliente) ON DELETE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES Productos(idProducto) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Ventas (
    idVenta INT AUTO_INCREMENT PRIMARY KEY,
    idCliente INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES Clientes(idCliente) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS DetalleVentas (
    idDetalleVenta INT AUTO_INCREMENT PRIMARY KEY,
    idVenta INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (idVenta) REFERENCES Ventas(idVenta) ON DELETE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES Productos(idProducto) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MetodosPago (
    idMetodoPago INT AUTO_INCREMENT PRIMARY KEY,
    metodo VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS ProcesoPago (
    idPago INT AUTO_INCREMENT PRIMARY KEY,
    idVenta INT NOT NULL,
    idMetodoPago INT NOT NULL,
    estado ENUM('Pendiente', 'Completado', 'Cancelado') NOT NULL DEFAULT 'Pendiente',
    FOREIGN KEY (idVenta) REFERENCES Ventas(idVenta) ON DELETE CASCADE,
    FOREIGN KEY (idMetodoPago) REFERENCES MetodosPago(idMetodoPago) ON DELETE CASCADE
);

-- =============================
-- DATOS DE PRUEBA
-- =============================

-- Usuarios de prueba: uno cliente, uno admin
INSERT IGNORE INTO Roles (idRol, nombre_rol) VALUES (1, 'Cliente'), (2, 'Administrador');
-- Elimina los datos de prueba para evitar advertencias de duplicados
DELETE FROM Clientes WHERE email IN ('maria.gomez@email.com', 'carlos.ruiz@email.com');
INSERT IGNORE INTO Clientes (idCliente, nombre, email, contraseña, usuario, telefono, direccion, idRol)
VALUES 
  (1, 'María Gómez', 'maria.gomez@email.com', 'clave_segura_123', 'mariag', '123456789', 'Calle 1', 1),
  (2, 'Carlos Ruiz', 'carlos.ruiz@email.com', 'password_carlos', 'carlosr', '987654321', 'Calle 2', 2);


-- Elimina los productos de prueba para evitar advertencias de duplicados y columna
DELETE FROM Productos WHERE nombre IN (
    'Hamburguesa Clásica', 'Hamburguesa Doble', 'Hamburguesa Especial',
    'Papas Clásicas', 'Papas con Queso', 'Papas Supreme',
    'Coca-Cola', 'Limonada', 'Cerveza',
    'Alitas BBQ', 'Alitas Picantes', 'Alitas Teriyaki',
    'Hot Dog Clásico', 'Hot Dog Especial',
    'Nachos', 'Aros de Cebolla',
    'Combo Familiar', 'Combo Amigos'
);
INSERT IGNORE INTO Productos (idProducto, nombre, descripcion, precio, stock, imagen, categoria)
VALUES 
    (1, 'Hamburguesa Clásica', 'Carne, lechuga, tomate, queso y salsa especial', 10.00, 20, '', 'hamburguesas'),
    (2, 'Hamburguesa Doble', 'Doble carne, doble queso, bacon y salsa BBQ', 15.00, 20, '', 'hamburguesas'),
    (3, 'Hamburguesa Especial', 'Carne premium, champiñones, queso suizo', 12.00, 20, '', 'hamburguesas'),
    (4, 'Papas Clásicas', 'Papas fritas crujientes con sal', 5.00, 30, '', 'papas'),
    (5, 'Papas con Queso', 'Papas con queso cheddar derretido', 7.00, 30, '', 'papas'),
    (6, 'Papas Supreme', 'Papas con queso, bacon y jalapeños', 8.00, 30, '', 'papas'),
    (7, 'Coca-Cola', 'Bebida refrescante 500ml', 3.00, 50, '', 'bebidas'),
    (8, 'Limonada', 'Limonada natural con hierbabuena', 4.00, 50, '', 'bebidas'),
    (9, 'Cerveza', 'Cerveza artesanal', 5.00, 50, '', 'bebidas'),
    (10, 'Alitas BBQ', '8 piezas en salsa BBQ', 12.00, 25, '', 'alitas'),
    (11, 'Alitas Picantes', '8 piezas en salsa buffalo', 12.00, 25, '', 'alitas'),
    (12, 'Alitas Teriyaki', '8 piezas en salsa teriyaki', 12.00, 25, '', 'alitas'),
    (13, 'Hot Dog Clásico', 'Salchicha, mostaza y ketchup', 7.00, 20, '', 'hotdogs'),
    (14, 'Hot Dog Especial', 'Salchicha, bacon, queso y cebolla', 9.00, 20, '', 'hotdogs'),
    (15, 'Nachos', 'Con guacamole y pico de gallo', 8.00, 15, '', 'entradas'),
    (16, 'Aros de Cebolla', 'Crujientes aros de cebolla', 6.00, 15, '', 'entradas'),
    (17, 'Combo Familiar', '4 hamburguesas, 2 papas grandes, 4 bebidas', 35.00, 10, '', 'especiales'),
    (18, 'Combo Amigos', '2 hamburguesas, alitas, papas y bebidas', 25.00, 10, '', 'especiales');


-- (Elimina o ajusta los inserts de prueba que referencian ids inexistentes)

-- INSERTS DE PRUEBA SOLO SI LOS IDS EXISTEN
-- INSERT INTO Carrito_de_Compras (idCliente, idProducto, cantidad) VALUES (1, 1, 1);
-- INSERT INTO DetalleProductos (idProducto, especificacion) VALUES (1, 'Ejemplo');
-- INSERT INTO Ventas (idCliente, total) VALUES (1, 2500.00);
-- INSERT INTO DetalleVentas (idVenta, idProducto, cantidad, subtotal) VALUES (1, 1, 1, 2500.00);


INSERT IGNORE INTO MetodosPago (idMetodoPago, metodo) VALUES 
    (1, 'Tarjeta de Crédito'),
    (2, 'PayPal'),
    (3, 'Transferencia Bancaria');


INSERT IGNORE INTO ProcesoPago (idPago, idVenta, idMetodoPago, estado) VALUES 
    (1, 1, 1, 'Completado'),
    (2, 2, 2, 'Pendiente');

-- Limpia el carrito y agrega productos válidos para pruebas
DELETE FROM Carrito_de_Compras;

-- Agrega productos reales al carrito del cliente 1
INSERT INTO Carrito_de_Compras (idCliente, idProducto, cantidad) VALUES
    (1, 1, 2),  -- Hamburguesa Clásica
    (1, 4, 1),  -- Papas Clásicas
    (1, 7, 2),  -- Coca-Cola
    (1, 10, 1), -- Alitas BBQ
    (1, 13, 1), -- Hot Dog Clásico
    (1, 17, 1); -- Combo Familiar

-- =============================
-- PROCEDIMIENTOS ALMACENADOS
-- =============================

-- Procedimientos almacenados (sin DELIMITER, solo para ejecución manual en Workbench)
-- CREATE PROCEDURE InsertarCliente(
--     IN p_nombre VARCHAR(100), 
--     IN p_email VARCHAR(100), 
--     IN p_contraseña VARCHAR(255), 
--     IN p_usuario VARCHAR(100),
--     IN p_telefono VARCHAR(20), 
--     IN p_direccion TEXT, 
--     IN p_idRol INT
-- )
-- BEGIN
--     INSERT INTO Clientes (nombre, email, contraseña, usuario, telefono, direccion, idRol)
--     VALUES (p_nombre, p_email, p_contraseña, p_usuario, p_telefono, p_direccion, p_idRol);
-- END;

-- CREATE PROCEDURE EliminarProducto(IN p_idProducto INT)
-- BEGIN
--     DELETE FROM Productos WHERE idProducto = p_idProducto;
-- END;

-- =============================
-- TRIGGERS
-- =============================

-- Triggers (sin DELIMITER, solo para ejecución manual en Workbench)
-- CREATE TRIGGER actualizar_stock
-- AFTER INSERT ON DetalleVentas
-- FOR EACH ROW
-- BEGIN
--     UPDATE Productos 
--     SET stock = stock - NEW.cantidad
--     WHERE idProducto = NEW.idProducto;
-- END;

-- CREATE TRIGGER verificar_stock
-- BEFORE INSERT ON DetalleVentas
-- FOR EACH ROW
-- BEGIN
--     DECLARE stock_actual INT;
--     SELECT stock INTO stock_actual FROM Productos WHERE idProducto = NEW.idProducto;
--     IF stock_actual < NEW.cantidad THEN
--         SIGNAL SQLSTATE '45000'
--         SET MESSAGE_TEXT = 'Stock insuficiente';
--     END IF;
-- END;

-- Índices para optimización de consultas
-- Índices (si ya existen, MySQL solo dará una advertencia, no error crítico)
CREATE INDEX idx_carrito_cliente ON Carrito_de_Compras(idCliente);
CREATE INDEX idx_ventas_cliente ON Ventas(idCliente);
CREATE INDEX idx_detalleventas_venta ON DetalleVentas(idVenta);
CREATE INDEX idx_detalleventas_producto ON DetalleVentas(idProducto);
CREATE INDEX idx_productos_nombre ON Productos(nombre);
