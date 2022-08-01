const express = require('express');
const cors = require('cors');
const app = express();

// IMPORTACION RUTAS
const usuarioRu = require('./src/routes/usuario.routes');
const publicRu = require('./src/routes/publicaciones.routes');
const comentRu = require('./src/routes/comentarios.routes');


// MIDDLEWARES
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos
app.use('/api', usuarioRu, publicRu, comentRu );

module.exports = app;