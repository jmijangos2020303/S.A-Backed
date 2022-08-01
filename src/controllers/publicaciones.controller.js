const Publicacion = require('../models/publicacion.model');



function NuevaPublic(req, res) {
    var parametros = req.body;
    var user= req.user;
    var public = new Publicacion()

    public.imagenes = parametros.imagenes
    public.descripcion = parametros.descripcion;
    public.idProp = user.sub;
    
    public.save((err, publicacionSave) => {
        if (err) return res.status(500)
            .send({ mensaje: 'Error en la peticion' });
        if(!publicacionSave) return res.status(500)
            .send({ mensaje: 'Error al agregar el Hotel'});
        
        return res.status(200).send({ Publicacion: publicacionSave });
    }); 
}



function ObtenerPostId (req, res) {
    const idPublic = req.params.idPost;
    Publicacion.findById(idPublic, (err, PostEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!PostEncontrado) return res.status(500).send({ mensaje: 'Error al obtener la publicacion'});

        return res.status(200).send({ Publicacion: PostEncontrado })
    })
    
}

function obtenerPublicacionesUser(req, res){

    Publicacion.find({idProp: req.user.sub}).populate('idProp').exec((err, publicacionesEncontradas)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if(!publicacionesEncontradas) return res.status(500).send({ mensaje: 'no se encontro publicacion'})

        return res.status(200).send({publicaciones: publicacionesEncontradas})
    }) 
    
}


function EditarPost(req, res) {
    const idPublic = req.params.idPost;
    var parametros = req.body;
    var logeado = req.user;

    Publicacion.find({idProp:logeado.sub}, (err, Post)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(!Post) return res.status(500).send({mensaje:'Verifica que sea su post'})

        Publicacion.findByIdAndUpdate(idPublic, parametros, { new : true } ,(err, PublicEdit)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if(!PublicEdit) return res.status(404).send({ mensaje: 'Error al Editar la Publicacion' });
    
            return res.status(200).send({ Publicacion: PublicEdit});
        })

    })
    
}


function EliminarPost(req, res) {
    const idPublic = req.params.idPost;
    var logeado = req.user;

    Publicacion.find({idProp:logeado.sub}, (err, Empr)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(!Empr) return res.status(500).send({mensaje:'Verifica que sea tu Post'})



        Publicacion.findOneAndDelete({_id:idPublic, idProp:logeado.sub}, (err, Eliminado)=>{
            if(err) return res.status(400).send({ mensaje: "Error en la peticion de eliminar la publicacion"});
            if(!Eliminado) return res.status(400).send({ mensaje: "Error al eliminar la publicacion"});
    
            return res.status(200).send({ Post_Eliminado: Eliminado})
        })
    
    })
    
   
}


function visualizarPublics(req, res) {
    
    Publicacion.find({}).populate('idProp').exec((err, Encontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!Encontrados) return res.status(500).send({ mensaje: 'Error al buscar las publicaciones' })

        return res.status(200).send({ Publicaciones: Encontrados })
    })
}


function EliminarPosting(req, res) {
    const idPublic = req.params.idPost;
    

    Publicacion.findOneAndDelete({_id:idPublic}, (err, Eliminado)=>{
        if(err) return res.status(400).send({ mensaje: "Error en la peticion de eliminar la publicacion"});
        if(!Eliminado) return res.status(400).send({ mensaje: "Error al eliminar la publicacion"});

        return res.status(200).send({ Post_Eliminado: Eliminado})
    })
    
   
}


module.exports={
    NuevaPublic,
    EditarPost,
    EliminarPost,
    visualizarPublics,
    ObtenerPostId,
    EliminarPosting,
    obtenerPublicacionesUser
    
    }