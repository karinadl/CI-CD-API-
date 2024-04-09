const { pool } = require('../../db/db');

const getCarreras = (req, res) => {
    var query = 'SELECT * FROM carreras;';
    pool.query(query, (err, result) => {
        res.send(result.rows);
    });
};

const getCarrera = (req, res) => {
    const carreraId = req.params.id; // Suponiendo que el ID esté en los parámetros de la solicitud
    var query = `SELECT * FROM carreras WHERE id = ${carreraId};`;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        if (result.rows.length === 0) {
            res.status(404).send('Carrera no encontrada');
            return;
        }
        res.send(result.rows[0]); // Devolver la primera fila encontrada (ya que debería ser única por ID)
    });
};

const newCarrera = async (req, res) => {
    const { nombre, creditos } = req.body;
    try {
        const query = 'INSERT INTO carreras (nombre, creditos) VALUES ($1, $2) RETURNING id';
        const { rows } = await pool.query(query, [nombre, creditos]);
        if (rows.length > 0) {
            res.status(201).json({
                id: rows[0].id,
                nombre,
                creditos,
            });
        } else {
            res.status(500).json({ message: 'Error al crear la carrera' });
        }
    } catch (error) {
        console.error('Error al insertar la carrera:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
const updateCarrera = async (req, res) => {
    const { id } = req.params;
    const { nombre, creditos } = req.body;
    try {
        const query = 'UPDATE carreras SET nombre = COALESCE($1, nombre), creditos = COALESCE($2, creditos) WHERE id = $3';
        const result = await pool.query(query, [nombre, creditos, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Carrera not found' });
        }

        const selectQuery = 'SELECT * FROM carreras WHERE id = $1';
        const { rows } = await pool.query(selectQuery, [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteCarrera = async (req, res) => {
    try {
        const query = 'DELETE FROM carreras WHERE id = $1';
        const result = await pool.query(query, [req.params.id]);

        if (result.rowCount <= 0) {
            return res.status(404).json({
                message: 'Carrera not found'
            });
        }

        res.sendStatus(204);

    } catch (error) {
        console.error('Error en delete:', error);
        return res.status(500).json({
            message: 'Error'
        });
    }
};



module.exports = {
    getCarreras,
    getCarrera,
    newCarrera,
    updateCarrera,
    deleteCarrera
};