const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    nombre: String,
    apellido: String,
    email: String,
    telefono: Number,
    direccion: String,
    oficio: String,
    password: String,
    rol: String
   
});
module.exports = mongoose.model('Usuarios',UsuarioSchema);