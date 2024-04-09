const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use(require('./routes/carreras.routes'));
app.use(require('./routes/materias.routes'));
app.use(require('./routes/especialidades.routes'));
app.use(require('./routes/materias-e.routes'));
module.exports = app;