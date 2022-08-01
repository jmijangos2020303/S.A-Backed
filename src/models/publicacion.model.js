const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublicSchema = Schema({
    
    descripcion:String,
    imagenes:String,
    idProp: { type: Schema.Types.ObjectId, ref: "Usuarios" }
});

module.exports = mongoose.model("Publicaciones", PublicSchema);