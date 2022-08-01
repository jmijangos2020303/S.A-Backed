const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComentarioSchema = Schema({
    
    idPublic: { type: Schema.Types.ObjectId, ref: "Publicaciones" },
    descripcion:String,  
    idProp: { type: Schema.Types.ObjectId, ref: "Usuarios" }
});

module.exports = mongoose.model("Comentarios", ComentarioSchema);