-- Inserta los productos de promociones para que el backend los reconozca correctamente
INSERT INTO Productos (idProducto, nombre, categoria, precio, stock)
VALUES
  (101, 'Combo Familiar', 'promociones', 35.00, 100),
  (102, 'Combo Amigos', 'promociones', 25.00, 100)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), categoria=VALUES(categoria), precio=VALUES(precio), stock=VALUES(stock);
