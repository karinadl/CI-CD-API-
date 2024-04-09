const { getEspecialidades, getEspecialidad, newEspecialidad, updateEspecialidad, deleteEspecialidad } = require('../controllers/especialidades.controllers');
const { Router, query } = require('express');
const router = Router();

// const { pool } = require('../../db/db');

//router.get('/', (req, res) => res.json({message: 'hello'}));
router.get('/especialidades', getEspecialidades);

//Carreras segun el id de la especialidad
router.get('/especialidad/:id', getEspecialidad);
//nueva especialidades
router.post('/newEspecialidad', newEspecialidad);

//update 
router.put('/updateEspecialidad/:id', updateEspecialidad);

//delete
router.delete('/deleteEspecialidad/:id', deleteEspecialidad);

module.exports = router;