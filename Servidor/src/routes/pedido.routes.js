const express = require('express')
const Pedidos = require('../models/pedidos')
const controller = require('../controllers/pedController')
const router = express.Router();
const multer = require('multer');

router.post('/finalizar', controller.crearPedido);


module.exports = router;