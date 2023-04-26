const express = require('express')
const Productos = require('../models/Productos')
const controller = require('../controllers/prodController')

const router = express.Router();

router.get('/verprod', controller.listarProd);

module.exports = router;