const { pool } = require('../../db/db');

const getEspecialidades = (req, res) => {
    var query = 'SELECT * FROM especialidades;';
    pool.query(query, (err, result) => {
        res.send(result.rows);
    });
};

const getEspecialidad = (req, res) => {
    const carreraId = req.params.id;
    var query = `SELECT * FROM especialidades WHERE id = ${carreraId};`;
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

const newEspecialidad = async (req, res) => {
    const { nombre, carrera_id } = req.body;
    try {
        const query = 'INSERT INTO especialidades (nombre, carrera_id) VALUES ($1, $2) RETURNING id';
        const { rows } = await pool.query(query, [nombre, carrera_id]);
        if (rows.length > 0) {
            res.status(201).json({
                id: rows[0].id,
                nombre,
                carrera_id,
            });
        } else {
            res.status(500).json({ message: 'Error al crear la carrera' });
        }
    } catch (error) {
        console.error('Error al insertar la carrera:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
const updateEspecialidad = async (req, res) => {
    const { id } = req.params;
    const { nombre, carrera_id } = req.body;
    try {
        const query = 'UPDATE especialidades SET nombre = COALESCE($1, nombre), carrera_id = COALESCE($2, carrera_id) WHERE id = $3';
        const result = await pool.query(query, [nombre, carrera_id, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Carrera not found' });
        }

        const selectQuery = 'SELECT * FROM especialidades WHERE id = $1';
        const { rows } = await pool.query(selectQuery, [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteEspecialidad = async (req, res) => {
    try {
        const query = 'DELETE FROM especialidades WHERE id = $1';
        const result = await pool.query(query, [req.params.id]);

        if (result.rowCount <= 0) {
            return res.status(404).json({
                message: 'Especialidad not found'
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
    getEspecialidades,
    getEspecialidad,
    newEspecialidad,
    updateEspecialidad,
    deleteEspecialidad
};