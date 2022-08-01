const express = require('express');
const controladorUsuario = require('../controllers/usuario.controller');

const md_aut = require('../middlewares/autenticacion');
const md_rol = require('../middlewares/validacion');

const api = express.Router();



api.post('/registrar', controladorUsuario.Registrarse);
api.post('/login', controladorUsuario.Login);
api.get('/verPerfil',md_aut.Auth , controladorUsuario.VerPerfil);
api.put('/editarPerfil', md_aut.Auth, controladorUsuario.EditarPerfil);
api.delete('/eliminarPerfil', md_aut.Auth, controladorUsuario.EliminarPerfil);
api.get('/usuarioped', md_aut.Auth, controladorUsuario.obtenerUsuarui)

//Actividades del Admin
api.get('/verUsuarios',[md_aut.Auth, md_rol.verAdmin], controladorUsuario.visualizarClientes );
api.get('/verTrabajadores', controladorUsuario.visualizarTrabajadores);
api.delete('/eliminar',[md_aut.Auth, md_rol.verAdmin], controladorUsuario.EliminarUsuario );



module.exports = api;