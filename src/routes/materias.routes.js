const { getMaterias, getMateria, newMateria, updateMateria, deleteMateria } = require('../controllers/materias.controllers');
const { Router, query } = require('express');
const router = Router();

const { pool } = require('../../db/db');

//router.get('/', (req, res) => res.json({message: 'hello'}));
router.get('/materias', getMaterias);

//Carreras segun el id de la materia
router.get('/materia/:id', getMateria);
//nueva materia
router.post('/newMateria', newMateria);

//update materias
router.put('/updateMateria/:id', updateMateria);

router.delete('/deleteMateria/:id', deleteMateria)

module.exports = router;