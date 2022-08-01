const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');



function RegistrarAd(req, res) {

    let usuarioModelo = new Usuario();

    usuarioModelo.nombre='SuperAdmin';
    usuarioModelo.email = 'Superadmin';
    usuarioModelo.rol = 'ADMIN';
    usuarioModelo.password = '123456'

    Usuario.find({$or:[
        {usuario: usuarioModelo.usuario}
    ]}).exec((err, buscarUsuario)=>{
        if(err) return console.log("ERROR en la peticion")
        
        if(buscarUsuario && buscarUsuario.length>=1){
            console.log("Usuario Super Admin creado con anterioridad")
        }else{
            bcrypt.hash(usuarioModelo.password,null,null, (err, passCrypt)=>{
                usuarioModelo.password = passCrypt;
            })

            usuarioModelo.save((err,usuarioGuardado)=>{
                if(err) return console.log( "ERROR al crear el usuario Admin" )

                if(usuarioGuardado){
                    console.log( "Usuario Super Admin Creado" )
                }
            })
        }
    })
}

//Crear Perfil
function Registrarse(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();

    if(parametros.nombre &&parametros.apellido && parametros.direccion &&    
        parametros.email && parametros.password && parametros.oficio && parametros.telefono) {
            usuarioModel.nombre = parametros.nombre;
            usuarioModel.apellido = parametros.apellido;
            usuarioModel.telefono = parametros.telefono;
            usuarioModel.direccion = parametros.direccion;
            usuarioModel.oficio = parametros.oficio;
            usuarioModel.email = parametros.email;
            usuarioModel.rol = "TRABAJADOR";
            

            Usuario.find({ email : parametros.email }, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    }else {
        return res.status(404)
            .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }
}


//General y Usuario

function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
      if (usuarioEncontrado) {
        // COMPARO CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
        bcrypt.compare(
          parametros.password,
          usuarioEncontrado.password,
          (err, verificacionPassword) => {
            //TRUE OR FALSE
            // VERIFICO SI EL PASSWORD COINCIDE EN BASE DE DATOS
            if (verificacionPassword) {
              // SI EL PARAMETRO OBTENERTOKEN ES TRUE, CREA EL TOKEN
              if (parametros.obtenerToken === "true") {
                return res
                  .status(200)
                  .send({ token: jwt.crearToken(usuarioEncontrado) });
              } else {
                usuarioEncontrado.password = undefined;
                return res.status(200).send({ usuario: usuarioEncontrado });
              }
            } else {
              return res
                .status(500)
                .send({ mensaje: "Las contrasena no coincide" });
            }
          }
        );
      } else {
        return res
          .status(500)
          .send({ mensaje: "Error, el correo no se encuentra registrado." });
      }
    });
  }




function EditarPerfil(req, res) {
    var logeado = req.user;
   
    var parametros = req.body;
    
    delete parametros.password
    delete parametros.rol
   
    Usuario.findByIdAndUpdate(logeado.sub, parametros, { new : true } ,(err, usuarioEditado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!usuarioEditado) return res.status(404)
            .send({ mensaje: 'Error al Editar el registro del Usuario' });

        return res.status(200).send({ usuario: usuarioEditado});
    })
}


function VerPerfil(req, res) {
    var logeado = req.user;
       
    Usuario.find({_id:logeado.sub},(err, usuarioEditado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!usuarioEditado) return res.status(404)
            .send({ mensaje: 'Error al encontrar el perfil del Usuario' });

        return res.status(200).send({ usuario: usuarioEditado});
    })
}


function EliminarPerfil(req, res){
    var logeado = req.user;

    Usuario.findByIdAndDelete(logeado.sub, (err, usuarioEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!usuarioEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el Perfil' })

        return res.status(200).send({ perfil_eliminado: usuarioEliminado });
    })
}

function EliminarUsuario(req, res) {
    var idUser= req.params.idUser;

    Usuario.findOne({_id:idUser},(err,encontrado)=>{
        if(err) return res.status(200).send('error en la peticion');
        if(!encontrado) return res.status(200).send('no se encontro usuario');
        
            Usuario.findByIdAndDelete(encontrado._id, (err, usuarioEliminado)=>{
           
                if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if(!usuarioEliminado) return res.status(500)
                    .send({ mensaje: 'Error al eliminar el usuario' })
        
                return res.status(200).send({ user: usuarioEliminado });
            }
        )        
    })
   
}

//Visualizar Clientes y Trabajoderes
function visualizarClientes(req, res) {
    
    let usuarioModel = new Usuario();  
    usuarioModel.rol = 'CLIENTE';

    Usuario.find({$or:[ {rol: usuarioModel.rol} ]}).exec((err, buscarUsuario)=>{
        
        if(err) return console.log("ERROR en la peticion")  
            return res.status(200).send({ Usuarios_Encontrados:  buscarUsuario })

  
    })
}

function visualizarTrabajadores(req, res) {
    
    let usuarioModel = new Usuario();  
    usuarioModel.rol = 'TRABAJADOR';

    Usuario.find({$or:[ {rol: usuarioModel.rol} ]}).exec((err, buscarUsuario)=>{
        
        if(err) return console.log("ERROR en la peticion")  
            return res.status(200).send({ Trabajadores_Encontrados:  buscarUsuario })

  
    })
}

function obtenerUsuarui(req, res){

    var id = req.user.sub;

    Usuario.findById(id, (err, usario)=>{
       if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
       if(!usario) return res.status(500).send({mensaje: 'no se enconto usuario'})

       return res.status(200).send({usuariop: usario})
    })
}


module.exports = {
    RegistrarAd,
    Registrarse,
    Login,
    VerPerfil,
    EditarPerfil,
    visualizarClientes,
    visualizarTrabajadores,
    EliminarUsuario,
    EliminarPerfil,
    obtenerUsuarui
    
}