const express = require('express');
const controladorComent = require('../controllers/comentarios.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_autRol = require('../middlewares/validacion');

const api = express.Router();


api.post('/agregarComentario', [md_autenticacion.Auth, md_autRol.verCliente ],controladorComent.NuevoComentario);
api.put('/editarComentario/:idCom', [md_autenticacion.Auth, md_autRol.verCliente],controladorComent.EditarComent);
//api.get('/verComentarios',controladorPublic.visualizarPublics);
api.delete('/eliminarComentario/:idCom', [md_autenticacion.Auth, md_autRol.verCliente ], controladorComent.EliminarComent);
//api.get('/obtenerPublicacion/:idPost',controladorPublic.ObtenerPostId );
api.delete('/eliminarComent/:idCom', [md_autenticacion.Auth, md_autRol.verAdmin ],controladorComent.EliminarComentarios);



module.exports = api;
