const express = require('express')
const Carrito = require('../models/carrito')
const controller = require('../controllers/carrController')
const router = express.Router();
const multer = require('multer');


router.post('/carrito/:dpi', controller.carritoAgreg);
router.get('/carritoVer/:dpi', controller.obtenerCarrito);  
router.get('/carritoId/:dpi/id', controller.obtenerIdCarritoPorDpi);
router.delete('/carritoEl/:carritoId/producto/:productoId', controller.eliminarProducto);
router.delete('/carritoTodo/:carritoId/productos', controller.eliminarProductosCarrito);


module.exports = router;