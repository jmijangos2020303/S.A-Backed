exports.verAdmin = function(req, res, next) {
    if(req.user.rol !== "ADMIN") return res.status(403).send({mensaje: "Solo puede acceder el Administrador"})
    
    next();
}

exports.verCliente = function(req, res, next) {
    if(req.user.rol !== "CLIENTE") return res.status(403).send({mensaje: "Solo puede acceder los clientes"})
    
    next();
}

exports.verTrabajo = function(req, res, next) {
    if(req.user.rol !== "TRABAJADOR") return res.status(403).send({mensaje: "Solo puede acceder los Trabajadores"})
    
    next();
}