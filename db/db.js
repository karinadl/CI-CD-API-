const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '192.168.56.1',
    database: 'universidad',
    password: '010601',
    port: 5432
});

pool.on('connect', () => {
    console.log('Conexión exitosa a la base de datos PostgreSQL');
});

pool.on('error', (err) => {
    console.error('Error en la conexión a la base de datos PostgreSQL:', err.message);
});

module.exports = { pool };