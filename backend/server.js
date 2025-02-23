require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;  // Cambiado de 3306 a 3000

app.use(express.json());
app.use(cors());

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

async function getConnection() {
    return await mysql.createConnection(dbConfig);
}

app.get('/api/carrito', async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM carrito_de_compras');
        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener carritos' });
    }
});

app.post('/api/carrito', async (req, res) => {
    try {
        const connection = await getConnection();
        const { id_cliente, direccion_entrega, forma_pago } = req.body;
        const [result] = await connection.execute(
            'CALL crear_nuevo_carrito(?, ?, ?, @nuevo_id)',
            [id_cliente, direccion_entrega, forma_pago]
        );
        const [idResult] = await connection.execute('SELECT @nuevo_id AS nuevo_id');
        res.status(201).json({ id_carrito: idResult[0].nuevo_id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al crear carrito' });
    }
});

app.post('/api/carrito/:id/productos', async (req, res) => {
    try {
        const connection = await getConnection();
        const { id_producto, cantidad } = req.body;
        const id_carrito = req.params.id;
        const [producto] = await connection.execute(
            'SELECT precio FROM productos WHERE id_producto = ?',
            [id_producto]
        );
        if (!producto.length) throw new Error('Producto no encontrado');
        const precio_unitario = producto[0].precio;
        const [result] = await connection.execute(
            'INSERT INTO productos_en_carrito (id_carrito, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
            [id_carrito, id_producto, cantidad, precio_unitario]
        );
        res.status(201).json({ message: 'Producto agregado' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al agregar producto' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});