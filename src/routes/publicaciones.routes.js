const express = require('express');
const controladorPublic = require('../controllers/publicaciones.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_autRol = require('../middlewares/validacion');

const api = express.Router();



api.post('/newPost', [md_autenticacion.Auth],controladorPublic.NuevaPublic);
api.put('/editarPublicacion/:idPost', [md_autenticacion.Auth, md_autRol.verTrabajo],controladorPublic.EditarPost);
api.get('/verPublics',controladorPublic.visualizarPublics);
api.delete('/eliminarPublicacion/:idPost', [md_autenticacion.Auth, md_autRol.verTrabajo ], controladorPublic.EliminarPost);
api.get('/obtenerPublicacion/:idPost',controladorPublic.ObtenerPostId );
api.delete('/eliminarPublic/:idPost', [md_autenticacion.Auth, md_autRol.verAdmin ], controladorPublic.EliminarPosting);
api.get('/obtenerPublicacionUsuario',[md_autenticacion.Auth], controladorPublic.obtenerPublicacionesUser)



module.exports = api;
