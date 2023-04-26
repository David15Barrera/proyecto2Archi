const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuario.routes')

const app = express();
app.use(express.json()); 
app.use(cors());

async function start(){
    try{
        const db = await mongoose.connect('mongodb://localhost:27017/Ecomerce',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            family: 4
        });
        console.log('Connectado a la base de datos', db.connection.name);
    }catch (error){
        console.log('error');
    }
}
start();

app.use('/api',usuarioRoutes);

app.listen(3000);
console.log('Servido HTTP escuchando en el puerto 3000');

// Resto del código de tu aplicación Express
