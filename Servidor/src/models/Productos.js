const mongosee = require('mongoose');
const Schema = mongosee.Schema;
const model = mongosee.model;

const productoSchema = new Schema({
    nombre: String,
    precio:Number,
    img: String,
    descripcion: String,
    vendedor: { 
        nombre: String,
        DPI: Number 
      },
    categorias:Array,
    cantidad_existente:Number,
    estado: String
},
{
    versionKey: false
})

module.exports = model('productos', productoSchema)