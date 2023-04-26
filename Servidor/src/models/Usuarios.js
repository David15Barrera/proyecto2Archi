const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const UsuarioSchema = new Schema({
  nombre_usuario: String,
  password: String,
  tipo_usuario: String,
  dpi: String,
  correo_electronico: String,
  telefono: String
},{
  versionKey: false
});

module.exports = model('usuarios', UsuarioSchema);