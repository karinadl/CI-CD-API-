const { pool } = require('../../db/db');

const getMaterias = (req, res) => {
    var query = 'SELECT * FROM materias;';
    pool.query(query, (err, result) => {
        res.send(result.rows);
    });
};

const getMateria = (req, res) => {
    const materiaId = req.params.id;
    var query = `SELECT * FROM materias WHERE id = ${materiaId};`;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        if (result.rows.length === 0) {
            res.status(404).send('Materia no encontrada');
            return;
        }
        res.send(result.rows[0]);
    });
};

const newMateria = async (req, res) => {
    const { nombre, creditos, carrera_id } = req.body;
    try {
        const query = 'INSERT INTO materias (nombre, creditos, carrera_id) VALUES ($1, $2, $3) RETURNING id';
        const { rows } = await pool.query(query, [nombre, creditos, carrera_id]);
        if (rows.length > 0) {
            res.status(201).json({
                id: rows[0].id,
                nombre,
                creditos,
                carrera_id
            });
        } else {
            res.status(500).json({ message: 'Error al crear la materia' });
        }
    } catch (error) {
        console.error('Error al insertar la materia:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
const updateMateria = async (req, res) => {
    const { id } = req.params;
    const { nombre, creditos, carrera_id } = req.body;
    try {
        const query = 'UPDATE materias SET nombre = COALESCE($1, nombre), creditos = COALESCE($2, creditos), carrera_id = COALESCE($3, carrera_id) WHERE id = $4';
        const result = await pool.query(query, [nombre, creditos, carrera_id, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Materia not found' });
        }

        const selectQuery = 'SELECT * FROM materias WHERE id = $1';
        const { rows } = await pool.query(selectQuery, [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteMateria = async (req, res) => {
    try {
        const query = 'DELETE FROM materias WHERE id = $1';
        const result = await pool.query(query, [req.params.id]);

        if (result.rowCount <= 0) {
            return res.status(404).json({
                message: 'Materia not found'
            });
        }

        res.sendStatus(204);

    } catch (error) {
        console.error('Error en deleteMateriaEsp:', error);
        return res.status(500).json({
            message: 'Error'
        });
    }
};

module.exports = {
    getMaterias,
    getMateria,
    newMateria,
    updateMateria,
    deleteMateria
};