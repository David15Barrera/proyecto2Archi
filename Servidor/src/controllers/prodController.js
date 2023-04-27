const Productos = require('../models/Productos')
const multer = require('multer');


const listarProd = async (req, res) => {
    try {
      const productos = await Productos.find();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
  };


 //------------------Para obtener los datos del producto-------------- 
  const getImgProducto = async (req, res) => {
    res.set('Content-Type', 'image/jpg');
    const url = req.query.url
    res.sendFile(__dirname+url);
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'src/controllers/img/imgproductos');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
});
  
  const upload = multer({ storage: storage })


  module.exports ={
    listarProd: listarProd,
    getImgProducto:getImgProducto,
    upload:upload
  }