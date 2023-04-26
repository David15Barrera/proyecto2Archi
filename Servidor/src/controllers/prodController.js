const Productos = require('../models/Productos')

const listarProd = async (req, res) => {
    try {
      const productos = await Productos.find();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
  };
  module.exports ={
    listarProd: listarProd
  }