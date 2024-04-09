const { getCarreras, getCarrera, newCarrera, updateCarrera, deleteCarrera } = require('../controllers/carreras.controllers');
const { Router, query } = require('express');
const router = Router();

const { pool } = require('../../db/db');

//router.get('/', (req, res) => res.json({message: 'hello'}));
router.get('/carreras', getCarreras);

//Carreras segun el id de la carrera
router.get('/carrera/:id', getCarrera);
//nueva carrera
router.post('/newCarrera', newCarrera);

//update carrera
router.put('/updateCarrera/:id', updateCarrera);

//delete
router.delete('/deleteCarrera/:id', deleteCarrera);

module.exports = router;