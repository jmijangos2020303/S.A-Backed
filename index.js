const mongoose = require('mongoose');
const app = require('./app');

const control = require("./src/controllers/usuario.controller")

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://contrataciones:123@cluster0.5fwru.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Se ha conectado correctamente a la base de datos.');

    control.RegistrarAd();

    app.listen(process.env.PORT || 3000, function (){
        console.log("Contrataciones, esta corriendo correctamente en el puerto 3000");
    });

}).catch(error => console.log(error));
