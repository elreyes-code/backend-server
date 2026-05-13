const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const puerto = 3000;

app.use(cors());

// CONEXIÓN A LA TERCERA MÁQUINA
const db = mysql.createConnection({
    host: 'AQUI_VA_LA_IP_DE_TU_TERCERA_MAQUINA', 
    user: 'elinath',
    password: 'elinath_123',
    database: 'inventario_db'
});

db.connect((err) => {
    if (err) console.error('Error al conectar a la BD:', err);
    else console.log('¡Conectado a MySQL exitosamente!');
});

// RUTA QUE LE PIDE LOS DATOS A MYSQL
app.get('/api/articulos', (req, res) => {
    db.query('SELECT * FROM articulos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.listen(puerto, () => {
    console.log(`Backend escuchando en el puerto ${puerto}`);
});
