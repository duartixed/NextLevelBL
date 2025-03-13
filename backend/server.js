import "dotenv/config";
import express from "express";
import cors from "cors";
import pool from "./db.js"; // Conexión a MySQL

const app = express();
const PORT = process.env.PORT || 5000; // Puerto por defecto

// ==========================
// 🔹 CONFIGURACIONES GENERALES
// ==========================
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// ==========================
// 🔹 RUTA PRINCIPAL (PRUEBA)
// ==========================
app.get("/", (req, res) => {
  res.send(`🚀 API corriendo en el puerto ${PORT}`);
});

// ==========================
// 🔹 PROBAR CONEXIÓN A LA BASE DE DATOS
// ==========================
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS resultado");
    res.json({ success: true, resultado: rows[0].resultado });
  } catch (error) {
    console.error("❌ Error en la conexión a la base de datos:", error);
    res.status(500).json({ success: false, message: "Error en la conexión a la base de datos" });
  }
});

// ==========================
// 🔹 OBTENER TODOS LOS CARRITOS
// ==========================
app.get("/api/carrito", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Carrito_de_Compras");
    res.json(rows);
  } catch (error) {
    console.error("❌ Error al obtener carritos:", error);
    res.status(500).json({ error: "Error al obtener carritos" });
  }
});

// ==========================
// 🔹 CREAR UN NUEVO CARRITO
// ==========================
app.post("/api/carrito", async (req, res) => {
  try {
    const { idCliente } = req.body;
    if (!idCliente) {
      return res.status(400).json({ error: "idCliente es obligatorio" });
    }

    // Verificar si el cliente existe
    const [cliente] = await pool.query("SELECT idCliente FROM Clientes WHERE idCliente = ?", [idCliente]);
    if (cliente.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    // Crear el carrito
    const [result] = await pool.query("INSERT INTO Carrito_de_Compras (idCliente) VALUES (?)", [idCliente]);
    res.status(201).json({ idCarrito: result.insertId, message: "Carrito creado exitosamente" });
  } catch (error) {
    console.error("❌ Error al crear carrito:", error);
    res.status(500).json({ error: "Error al crear carrito" });
  }
});

// ==========================
// 🔹 AGREGAR PRODUCTOS AL CARRITO
// ==========================
app.post("/api/carrito/:idCarrito/productos", async (req, res) => {
  try {
    const { idProducto, cantidad } = req.body;
    const { idCarrito } = req.params;

    if (!idProducto || !cantidad) {
      return res.status(400).json({ error: "idProducto y cantidad son obligatorios" });
    }

    // Verificar si el carrito existe
    const [carrito] = await pool.query("SELECT idCarrito FROM Carrito_de_Compras WHERE idCarrito = ?", [idCarrito]);
    if (carrito.length === 0) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    // Verificar si el producto existe
    const [producto] = await pool.query("SELECT precio FROM Productos WHERE idProducto = ?", [idProducto]);
    if (producto.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const precioUnitario = producto[0].precio;
    const subtotal = precioUnitario * cantidad;

    // Insertar el producto en el carrito
    await pool.query("INSERT INTO Detalle_Carrito (idCarrito, idProducto, cantidad, subtotal) VALUES (?, ?, ?, ?)", 
      [idCarrito, idProducto, cantidad, subtotal]);

    res.status(201).json({ message: "Producto agregado al carrito exitosamente" });
  } catch (error) {
    console.error("❌ Error al agregar producto al carrito:", error);
    res.status(500).json({ error: "Error al agregar producto" });
  }
});

// ==========================
// 🔹 ELIMINAR UN PRODUCTO DEL CARRITO
// ==========================
app.delete("/api/carrito/:idProducto", async (req, res) => {
  try {
    const { idProducto } = req.params;
    const [result] = await pool.query("DELETE FROM Detalle_Carrito WHERE idProducto = ?", [idProducto]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado en el carrito" });
    }

    res.json({ message: "Producto eliminado del carrito ❌" });
  } catch (error) {
    console.error("❌ Error al eliminar producto del carrito:", error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

// ==========================
// 🔹 VACIAR EL CARRITO COMPLETO
// ==========================
app.delete("/api/carrito", async (req, res) => {
  try {
    await pool.query("DELETE FROM Detalle_Carrito");
    res.json({ message: "Carrito vaciado 🗑️" });
  } catch (error) {
    console.error("❌ Error al vaciar carrito:", error);
    res.status(500).json({ error: "Error al vaciar carrito" });
  }
});

// ==========================
// 🔹 SIMULAR PAGO (VACIAR CARRITO)
// ==========================
app.post("/api/pago", async (req, res) => {
  try {
    const [productos] = await pool.query("SELECT * FROM Detalle_Carrito");
    if (productos.length === 0) {
      return res.json({ success: false, message: "El carrito está vacío ❌" });
    }

    await pool.query("DELETE FROM Detalle_Carrito");
    res.json({ success: true, message: "Pago realizado con éxito 💳✅" });
  } catch (error) {
    console.error("❌ Error en el pago:", error);
    res.status(500).json({ error: "Error al procesar el pago" });
  }
});

// ==========================
// 🔹 INICIAR EL SERVIDOR
// ==========================
async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Conexión a la base de datos establecida.");

    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
    process.exit(1);
  }
}

startServer();
