-- BASE DE DATOS PARA NEXTLEVELBL
-- =============================
CREATE DATABASE IF NOT EXISTS nextlevelbl;
USE nextlevelbl;

-- =============================
-- TABLAS PRINCIPALES
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
-- PROCEDIMIENTOS ALMACENADOS
-- =============================

-- Procedimiento para insertar cliente
DROP PROCEDURE IF EXISTS InsertarCliente;
DELIMITER $$
CREATE PROCEDURE InsertarCliente(
    IN p_nombre VARCHAR(100), 
    IN p_email VARCHAR(100), 
    IN p_contraseña VARCHAR(255), 
    IN p_usuario VARCHAR(100),
    IN p_telefono VARCHAR(20), 
    IN p_direccion TEXT, 
    IN p_idRol INT
)
BEGIN
    INSERT INTO Clientes (nombre, email, contraseña, usuario, telefono, direccion, idRol)
    VALUES (p_nombre, p_email, p_contraseña, p_usuario, p_telefono, p_direccion, p_idRol);
END$$
DELIMITER ;

-- Procedimiento para eliminar producto
DROP PROCEDURE IF EXISTS EliminarProducto;
DELIMITER $$
CREATE PROCEDURE EliminarProducto(IN p_idProducto INT)
BEGIN
    DELETE FROM Productos WHERE idProducto = p_idProducto;
END$$
DELIMITER ;

-- Procedimiento para actualizar stock
DROP PROCEDURE IF EXISTS ActualizarStock;
DELIMITER $$
CREATE PROCEDURE ActualizarStock(
    IN p_idProducto INT,
    IN p_cantidad INT
)
BEGIN
    UPDATE Productos 
    SET stock = stock - p_cantidad
    WHERE idProducto = p_idProducto;
END$$
DELIMITER ;

-- =============================
-- TRIGGERS
-- =============================

-- Trigger para actualizar stock después de una venta
DROP TRIGGER IF EXISTS actualizar_stock;
DELIMITER $$
CREATE TRIGGER actualizar_stock
AFTER INSERT ON DetalleVentas
FOR EACH ROW
BEGIN
    CALL ActualizarStock(NEW.idProducto, NEW.cantidad);
END$$
DELIMITER ;

-- Trigger para verificar stock antes de una venta
DROP TRIGGER IF EXISTS verificar_stock;
DELIMITER $$
CREATE TRIGGER verificar_stock
BEFORE INSERT ON DetalleVentas
FOR EACH ROW
BEGIN
    DECLARE stock_actual INT;
    SELECT stock INTO stock_actual 
    FROM Productos 
    WHERE idProducto = NEW.idProducto;
    
    IF stock_actual < NEW.cantidad THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock insuficiente';
    END IF;
END$$
DELIMITER ;

-- =============================
-- DATOS INICIALES
-- =============================

-- 1. Insertar roles primero
INSERT INTO Roles (nombre_rol) VALUES ('Cliente'), ('Administrador');

-- 2. Insertar administradores principales con contraseñas hasheadas
-- La contraseña '12345' hasheada con bcrypt (10 rounds)
INSERT INTO Clientes (nombre, email, contraseña, usuario, telefono, idRol)
VALUES 
  ('Daniel Mendoza', 'dcmendozar@gmail.com', '$2a$10$8HXzPWR5JxEBuq0s1eHzZutxO1uL3ZpdzRp9w32f9qV0St5iXPf0y', 'dcmendozar', '3001234567', 2),
  ('Kevin Rodriguez', 'kevinrodriguez019@hotmail.com', '$2a$10$8HXzPWR5JxEBuq0s1eHzZutxO1uL3ZpdzRp9w32f9qV0St5iXPf0y', 'kevinr', '3009876543', 2);

-- 3. Insertar productos
INSERT INTO Productos (nombre, descripcion, precio, stock, imagen, categoria)
VALUES 
    ('Hamburguesa Clásica', 'Carne, lechuga, tomate, queso y salsa especial', 10.00, 20, '', 'hamburguesas'),
    ('Hamburguesa Doble', 'Doble carne, doble queso, bacon y salsa BBQ', 15.00, 20, '', 'hamburguesas'),
    ('Hamburguesa Especial', 'Carne premium, champiñones, queso suizo', 12.00, 20, '', 'hamburguesas'),
    ('Papas Clásicas', 'Papas fritas crujientes con sal', 5.00, 30, '', 'papas'),
    ('Papas con Queso', 'Papas con queso cheddar derretido', 7.00, 30, '', 'papas'),
    ('Papas Supreme', 'Papas con queso, bacon y jalapeños', 8.00, 30, '', 'papas'),
    ('Coca-Cola', 'Bebida refrescante 500ml', 3.00, 50, '', 'bebidas'),
    ('Limonada', 'Limonada natural con hierbabuena', 4.00, 50, '', 'bebidas'),
    ('Cerveza', 'Cerveza artesanal', 5.00, 50, '', 'bebidas'),
    ('Alitas BBQ', '8 piezas en salsa BBQ', 12.00, 25, '', 'alitas'),
    ('Alitas Picantes', '8 piezas en salsa buffalo', 12.00, 25, '', 'alitas'),
    ('Alitas Teriyaki', '8 piezas en salsa teriyaki', 12.00, 25, '', 'alitas'),
    ('Hot Dog Clásico', 'Salchicha, mostaza y ketchup', 7.00, 20, '', 'hotdogs'),
    ('Hot Dog Especial', 'Salchicha, bacon, queso y cebolla', 9.00, 20, '', 'hotdogs'),
    ('Nachos', 'Con guacamole y pico de gallo', 8.00, 15, '', 'entradas'),
    ('Aros de Cebolla', 'Crujientes aros de cebolla', 6.00, 15, '', 'entradas'),
    ('Combo Familiar', '4 hamburguesas, 2 papas grandes, 4 bebidas', 35.00, 10, '', 'especiales'),
    ('Combo Amigos', '2 hamburguesas, alitas, papas y bebidas', 25.00, 10, '', 'especiales');

-- 4. Insertar métodos de pago
INSERT INTO MetodosPago (metodo) VALUES 
    ('Tarjeta de Crédito'),
    ('PayPal'),
    ('Transferencia Bancaria');

-- =============================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =============================
CREATE INDEX idx_carrito_cliente ON Carrito_de_Compras(idCliente);
CREATE INDEX idx_ventas_cliente ON Ventas(idCliente);
CREATE INDEX idx_detalleventas_venta ON DetalleVentas(idVenta);
CREATE INDEX idx_detalleventas_producto ON DetalleVentas(idProducto);
CREATE INDEX idx_productos_nombre ON Productos(nombre);
