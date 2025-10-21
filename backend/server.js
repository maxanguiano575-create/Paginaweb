const express = require('express');
const cors = require('cors');
const mariadb = require('mariadb');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const pool = mariadb.createPool({
  host: '127.0.0.1', 
  user: 'root',
  password: 'root',
  database: 'tienda', 
  connectionLimit: 5
});

// Ruta para obtener productos
app.get('/productos', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM productos");
    res.json(rows);
  } catch (err) {
    console.log('Error de conexión o consulta:', err);
    res.status(500).json({ error: "Error al consultar productos" });
  } finally {
    if (conn) conn.release();
  }
});

// Ruta para agregar producto
app.post('/productos', async (req, res) => {
  let conn;
  try {
    const { nombre, precio, categoria, imagen_url } = req.body;
    conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO productos (nombre, precio, categoria, imagen_url) VALUES (?, ?, ?, ?)",
      [nombre, precio, categoria, imagen_url]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.log('Error al insertar producto:', err);
    res.status(500).json({ error: "Error al agregar producto" });
  } finally {
    if (conn) conn.release();
  }
});

// Ruta para actualizar producto
app.put('/productos/:id', async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { nombre, precio, categoria, imagen_url } = req.body;
    conn = await pool.getConnection();
    await conn.query(
      "UPDATE productos SET nombre = ?, precio = ?, categoria = ?, imagen_url = ? WHERE id = ?",
      [nombre, precio, categoria, imagen_url, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.log('Error al actualizar producto:', err);
    res.status(500).json({ error: "Error al actualizar producto" });
  } finally {
    if (conn) conn.release();
  }
});

// Ruta para eliminar producto
app.delete('/productos/:id', async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await pool.getConnection();
    await conn.query("DELETE FROM productos WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.log('Error al eliminar producto:', err);
    res.status(500).json({ error: "Error al eliminar producto" });
  } finally {
    if (conn) conn.release();
  }
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Servidor corriendo en http://0.0.0.0:3001');
  console.log('Accesible desde otras dispositivos en la red');
});