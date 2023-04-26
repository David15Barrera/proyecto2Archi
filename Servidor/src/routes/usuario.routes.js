const express = require('express')
const Usuarios = require('../models/Usuarios')
const controller = require('../controllers/userController')

const router = express.Router();

router.post('/', controller.insertUsuario);
router.post('/Login', controller.loginUsuario);
router.get('/veruser', controller.listarUsuarios);
router.delete('/eliminar/:dpi', controller.eliminarUsuarioPorDpi);
router.put('/editar/:dpi', controller.editarUsuarioPorDPI);
router.post('/buscar', controller.buscarPorDpi)

module.exports = router;
