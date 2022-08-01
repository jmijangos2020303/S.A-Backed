const Comentario = require('../models/comentario.model');



function NuevoComentario(req, res) {
    var parametros = req.body;
    var user= req.user;
    var coment = new Comentario()

    coment.descripcion = parametros.descripcion;
    coment.idProp = user.sub;
    
    coment.save((err, conmentSave) => {
        if (err) return res.status(500)
            .send({ mensaje: 'Error en la peticion' });
        if(!conmentSave) return res.status(500)
            .send({ mensaje: 'Error al agregar el Hotel'});
        
        return res.status(200).send({ Comentario: conmentSave });
    }); 
}



function ObtenerComentId (req, res) {
    const idPublic = req.params.idCom;
    Comentario.findById(idPublic, (err, ComentEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!ComentEncontrado) return res.status(500).send({ mensaje: 'Error al obtener la publicacion'});

        return res.status(200).send({ Publicacion: ComentEncontrado })
    })
    
}


function EditarComent(req, res) {
    const idPublic = req.params.idCom;
    var parametros = req.body;
    var logeado = req.user;

    Comentario.find({idProp:logeado.sub}, (err, Post)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(!Post) return res.status(500).send({mensaje:'Verifica que sea su post'})

        Comentario.findByIdAndUpdate(idPublic, parametros, { new : true } ,(err, ComentarioEdit)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if(!ComentarioEdit) return res.status(404).send({ mensaje: 'Error al Editar la Publicacion' });
    
            return res.status(200).send({ Publicacion: ComentarioEdit});
        })

    })
    
}


function EliminarComent(req, res) {
    const idPublic = req.params.idCom;
    var logeado = req.user;

    Comentario.find({idProp:logeado.sub}, (err, Empr)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(!Empr) return res.status(500).send({mensaje:'Verifica que sea tu Post'})



        Comentario.findOneAndDelete({_id:idPublic, idProp:logeado.sub}, (err, Eliminado)=>{
            if(err) return res.status(400).send({ mensaje: "Error en la peticion de eliminar la publicacion"});
            if(!Eliminado) return res.status(400).send({ mensaje: "Error al eliminar la publicacion"});
    
            return res.status(200).send({ Post_Eliminado: Eliminado})
        })
    
    })
    
   
}


function visualizarPublics(req, res) {
    
    Publicacion.find({}, (err, Encontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!Encontrados) return res.status(500).send({ mensaje: 'Error al buscar las publicaciones' })

        return res.status(200).send({ Publicaciones: Encontrados })
    })
}


function EliminarComentarios(req, res) {
    const idPublic = req.params.idCom;
    

   Comentario.findOneAndDelete({_id:idPublic}, (err, Eliminado)=>{
        if(err) return res.status(400).send({ mensaje: "Error en la peticion de eliminar la publicacion"});
        if(!Eliminado) return res.status(400).send({ mensaje: "Error al eliminar la publicacion"});

        return res.status(200).send({ Coment_Eliminado: Eliminado})
    })
    
   
}


module.exports={
    NuevoComentario,
    EditarComent,
    EliminarComent,
    EliminarComentarios
    
    }