const express = require('express')
const Pedidos = require('../models/pedidos')
const controller = require('../controllers/pedController')
const router = express.Router();
const multer = require('multer');

router.post('/finalizar', controller.crearPedido);
router.get('/obtener/:dpi', controller.obtenerPedidosPorDPI);
router.get('/obtenerAll', controller.obtenerPedidos);
router.post('/actFechEst/:id', controller.actuPedido);
//--------Reportes
router.get('/top', controller.obtenerTopProductosVendidos);
router.get('/topclientes', controller.obtenerTopClientes);
router.get('/toppedidos', controller.reporte3);
router.get('/topClientesPorVentas', controller.topClientesPorVentas);


module.exports = router;