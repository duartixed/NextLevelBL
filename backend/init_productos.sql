-- Insertar productos
USE nextlevelbl;

-- Insertar roles si no existen
INSERT INTO Roles (nombre_rol) VALUES 
('cliente'),
('admin')
ON DUPLICATE KEY UPDATE nombre_rol = VALUES(nombre_rol);

-- Limpiar tabla de productos
DELETE FROM Productos;

-- Verificar productos de promociones
-- Puedes ejecutar este SELECT en tu base de datos para ver si existen y tienen stock
-- SELECT * FROM Productos WHERE nombre IN ('Combo Familiar', 'Combo Amigos');

-- Insertar Hamburguesas
INSERT INTO Productos (nombre, descripcion, precio, stock, imagen, categoria) VALUES
('Hamburguesa Clásica', 'Carne, lechuga, tomate, queso y salsa especial', 10.00, 100, '/images/burgers.png', 'hamburguesas'),
('Hamburguesa Doble', 'Doble carne, doble queso, bacon y salsa BBQ', 15.00, 100, '/images/burgers.png', 'hamburguesas'),
('Hamburguesa Especial', 'Carne premium, champiñones, queso suizo', 12.00, 100, '/images/burgers.png', 'hamburguesas');

-- Insertar Papas
INSERT INTO Productos (nombre, descripcion, precio, stock, imagen, categoria) VALUES
('Papas Clásicas', 'Papas fritas crujientes con sal', 5.00, 100, '/images/fries.png', 'papas'),
('Papas con Queso', 'Papas con queso cheddar derretido', 7.00, 100, '/images/fries.png', 'papas'),
('Papas Supreme', 'Papas con queso, bacon y jalapeños', 8.00, 100, '/images/fries.png', 'papas');

-- Insertar Bebidas
INSERT INTO Productos (nombre, descripcion, precio, stock, imagen, categoria) VALUES
('Coca-Cola', 'Bebida refrescante 500ml', 3.00, 100, '/images/drinks.png', 'bebidas'),
('Limonada', 'Limonada natural con hierbabuena', 4.00, 100, '/images/drinks.png', 'bebidas'),
('Cerveza', 'Cerveza artesanal', 5.00, 100, '/images/drinks.png', 'bebidas');

-- Insertar Alitas
INSERT INTO Productos (nombre, descripcion, precio, stock, imagen, categoria) VALUES
('Alitas BBQ', '8 piezas en salsa BBQ', 12.00, 100, '/images/wings.png', 'alitas'),
('Alitas Picantes', '8 piezas en salsa buffalo', 12.00, 100, '/images/wings.png', 'alitas'),
('Alitas Teriyaki', '8 piezas en salsa teriyaki', 12.00, 100, '/images/wings.png', 'alitas');

-- Insertar Hot Dogs
INSERT INTO Productos (nombre, descripcion, precio, stock, imagen, categoria) VALUES
('Hot Dog Clásico', 'Salchicha, mostaza y ketchup', 7.00, 100, '/images/hotdogs.png', 'hotdogs'),
('Hot Dog Especial', 'Salchicha, bacon, queso y cebolla', 9.00, 100, '/images/hotdogs.png', 'hotdogs');

-- Insertar Entradas
INSERT INTO Productos (nombre, descripcion, precio, stock, imagen, categoria) VALUES
('Nachos', 'Con guacamole y pico de gallo', 8.00, 100, '/images/entradas.png', 'entradas'),
('Aros de Cebolla', 'Crujientes aros de cebolla', 6.00, 100, '/images/entradas.png', 'entradas');

INSERT INTO Productos (nombre, descripcion, precio, stock, imagen, categoria) VALUES
('Combo Familiar', '4 hamburguesas, 2 papas grandes, 4 bebidas', 35.00, 100, '/images/especiales.png', 'especiales'),
('Combo Amigos', '2 hamburguesas, alitas, papas y bebidas', 25.00, 100, '/images/especiales.png', 'especiales');


-- Agregar restricción única para evitar duplicados de nombre y categoría
-- Si ya existe, este comando dará error pero no afecta los datos
ALTER TABLE Productos ADD UNIQUE(nombre, categoria);
