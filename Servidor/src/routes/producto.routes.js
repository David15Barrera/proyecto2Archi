const express = require('express')
const Productos = require('../models/Productos')
const controller = require('../controllers/prodController')
const router = express.Router();
const multer = require('multer');

router.get('/verprod', controller.listarProd);
router.get('/getprod', controller.getImgProducto);
router.post('/agregar', controller.upload.single('imagen'), controller.agregarProducto);
router.get('/disponibles', controller.prodDisponibles);
router.get('/enviados', controller.prodEnviado);
router.get('/cancelados', controller.prodCancelado);
router.get('/detalles/:id', controller.obtenerProducto);
router.put('/aprobar/:id', controller.prodAprobar);
router.put('/desaprobar/:id', controller.prodNegar);
router.delete('/eliminar/:id', controller.eliminarProducto);
router.get('/prodCancelado/:DPI', controller.prodCanceladoid);


//Revisar el metodo de enviado de imagen, la ruta no responde

router.post('/saveprod', controller.upload.single('imagen'), function (req, res) {
    const fileName = req.file.originalname;
    res.json('/img/imgproductos/' + fileName);
  });
  
module.exports = router;