const { getMateriaEsp, getMateriasEsp, newMateriaEsp, updateMateriaEsp, deleteMateriaEsp } = require('../controllers/materias-e.controllers');
const { Router, query } = require('express');
const router = Router();

// const { pool } = require('../../db/db');

router.get('/materiasEspecialidad', getMateriasEsp);

//Carreras segun el id de la materia
router.get('/materiasEspecialidad/:id', getMateriaEsp);
//nueva materia
router.post('/newMateriaEspecialidad', newMateriaEsp);

//update nateria
router.put('/updateMateriaEspecialidad/:id', updateMateriaEsp);

//Delete materia
router.delete('/deleteMateriaEspecialidad/:id', deleteMateriaEsp)
module.exports = router;