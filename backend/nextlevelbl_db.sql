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
    imagen VARCHAR(255)
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
INSERT INTO Roles (nombre_rol) VALUES ('Cliente'), ('Administrador');

INSERT INTO Clientes (nombre, email, contraseña, usuario, telefono, direccion, idRol)
VALUES 
  ('María Gómez', 'maria.gomez@email.com', 'clave_segura_123', 'mariag', '123456789', 'Calle 1', 1),
  ('Carlos Ruiz', 'carlos.ruiz@email.com', 'password_carlos', 'carlosr', '987654321', 'Calle 2', 1);

INSERT INTO Productos (nombre, descripcion, precio, stock, imagen)
VALUES 
    ('Laptop', 'Laptop de última generación', 2500.00, 10, 'laptop.jpg'),
    ('Mouse', 'Mouse inalámbrico', 20.00, 50, 'mouse.jpg');

INSERT INTO DetalleProductos (idProducto, especificacion) VALUES 
    (1, '8GB RAM, 512GB SSD'),
    (2, 'Sensor óptico, inalámbrico');

INSERT INTO Carrito_de_Compras (idCliente, idProducto, cantidad) VALUES 
    (1, 1, 1);

INSERT INTO Ventas (idCliente, total) VALUES 
    (1, 2500.00),
    (2, 40.00);

INSERT INTO DetalleVentas (idVenta, idProducto, cantidad, subtotal) VALUES 
    (1, 1, 1, 2500.00),
    (2, 2, 2, 40.00);

INSERT INTO MetodosPago (metodo) VALUES 
    ('Tarjeta de Crédito'),
    ('PayPal'),
    ('Transferencia Bancaria');

INSERT INTO ProcesoPago (idVenta, idMetodoPago, estado) VALUES 
    (1, 1, 'Completado'),
    (2, 2, 'Pendiente');

-- =============================
-- PROCEDIMIENTOS ALMACENADOS
-- =============================
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
END $$

CREATE PROCEDURE EliminarProducto(IN p_idProducto INT)
BEGIN
    DELETE FROM Productos WHERE idProducto = p_idProducto;
END $$

DELIMITER ;

-- =============================
-- TRIGGERS
-- =============================
DELIMITER $$

CREATE TRIGGER actualizar_stock
AFTER INSERT ON DetalleVentas
FOR EACH ROW
BEGIN
    UPDATE Productos 
    SET stock = stock - NEW.cantidad
    WHERE idProducto = NEW.idProducto;
END $$

CREATE TRIGGER verificar_stock
BEFORE INSERT ON DetalleVentas
FOR EACH ROW
BEGIN
    DECLARE stock_actual INT;
    SELECT stock INTO stock_actual FROM Productos WHERE idProducto = NEW.idProducto;
    IF stock_actual < NEW.cantidad THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock insuficiente';
    END IF;
END $$

DELIMITER ;
