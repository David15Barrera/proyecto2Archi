const multer = require('multer');
const Productos = require('../models/Productos');
const Pedido = require('../models/pedidos');


//Para almacenar la venta
const crearPedido = async (req, res) => {
    const { dpi, nombre_usuario, productos_comprados,lugar_envio ,fecha_compra, fecha_entrega_prevista, Total, TotalPag, TotalCli, estado_pedido } = req.body;
  
    try {
      const pedido = new Pedido({
        dpi,
        nombre_usuario,
        productos_comprados,
        lugar_envio,
        fecha_compra,
        fecha_entrega_prevista,
        Total,
        TotalPag,
        TotalCli,
        estado_pedido
      });
  
      await pedido.save();
      res.status(201).json(pedido);
    } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
    }
  };
  
  module.exports = {
    crearPedido: crearPedido
  };