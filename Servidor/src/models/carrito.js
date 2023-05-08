const mongosee = require('mongoose');
const Schema = mongosee.Schema;
const model = mongosee.model;

const productoSchema = new Schema({
  _id: Schema.Types.ObjectId,
  nombre: String,
  cantidad: Number,
  precio: Number 
});

const carritoSchema = new Schema({
  _id: Schema.Types.ObjectId,
  nombre_usuario: String,
  dpi: Number,
  productos_agregados: [productoSchema]
});

module.exports = model('carrito', carritoSchema)
