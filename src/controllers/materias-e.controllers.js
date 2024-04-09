const { pool } = require('../../db/db');
const { deleteMateria } = require('./materias.controllers');

const getMateriasEsp = (req, res) => {
    var query = 'SELECT * FROM materias_especialidad;';
    pool.query(query, (err, result) => {
        res.send(result.rows);
    });
};
// Metodo get para obtener las materias segun el id de su especialidad
const getMateriaEsp = async (req, res) => {
    try {
        const query = 'SELECT * FROM materias_especialidad WHERE especialidad_id = $1';
        const { rows } = await pool.query(query, [req.params.id]);

        if (!rows.length) {
            return res.status(404).json({
                message: 'Materia not found'
            });
        }

        res.json(rows);
    } catch (error) {
        console.error('Error en getMateriaEsp:', error);
        return res.status(500).json({
            message: 'Error'
        });
    }
};

const newMateriaEsp = async (req, res) => {
    const { nombre, creditos, carrera_id, especialidad_id } = req.body;
    try {
        const query = 'INSERT INTO materias_especialidad (nombre, creditos, carrera_id, especialidad_id) VALUES ($1, $2, $3, $4) RETURNING id';
        const { rows } = await pool.query(query, [nombre, creditos, carrera_id, especialidad_id]);
        if (rows.length > 0) {
            res.status(201).json({
                id: rows[0].id,
                nombre,
                creditos,
                carrera_id,
                especialidad_id
            });
        } else {
            res.status(500).json({ message: 'Error al crear la materia' });
        }
    } catch (error) {
        console.error('Error al insertar la materia:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
const updateMateriaEsp = async (req, res) => {
    const { id } = req.params;
    const { nombre, creditos, carrera_id, especialidad_id } = req.body;
    try {
        const query = 'UPDATE materias_especialidad SET nombre = COALESCE($1, nombre), creditos = COALESCE($2, creditos), carrera_id = COALESCE($3, carrera_id), especialidad_id = COALESCE($4, especialidad_id) WHERE id = $5';
        const result = await pool.query(query, [nombre, creditos, carrera_id, especialidad_id, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Materia not found' });
        }

        const selectQuery = 'SELECT * FROM materias_especialidad WHERE id = $1';
        const { rows } = await pool.query(selectQuery, [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteMateriaEsp = async (req, res) => {
    try {
        const query = 'DELETE FROM materias_especialidad WHERE id = $1';
        const result = await pool.query(query, [req.params.id]);

        if (result.rowCount <= 0) {
            return res.status(404).json({
                message: 'Materia not found'
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
    getMateriasEsp,
    getMateriaEsp,
    newMateriaEsp,
    updateMateriaEsp,
    deleteMateriaEsp
};