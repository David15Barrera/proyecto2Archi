const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuario.routes')
const productoRoutes = require('./routes/producto.routes')
const carritoRoutes = require('./routes/carrito.routes')
const pedRoutes = require('./routes/pedido.routes')
const path = require('path');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ dest: 'src/controllers/img/imgproductos' });

app.post('/upload', upload.single('file'), (req, res) => {
  // Manejo de la subida del archivo
  console.log(req.file);
  res.send('Archivo subido con éxito');
});

//clase estatica para acceder a nuestras imagenes
app.use(express.static(path.join(__dirname, 'controllers')));
//app.use(multer({dest: path.join(__dirname,'controllers/img/imgproductos')}).single('image'));
//Connection to data base
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
  

//Routes
app.use('/api',usuarioRoutes);
app.use('/prod',productoRoutes);
app.use('/carr', carritoRoutes);
app.use('/pedido', pedRoutes);

app.listen(3000);
console.log('Servido HTTP escuchando en el puerto 3000');

// Resto del código de tu aplicación Express
