const mongosee = require('mongoose');
const Schema = mongosee.Schema;
const model = mongosee.model;

const pedidoSchema = new Schema({
    dpi: Number,
    nombre_usuario: String,
    productos_comprados: [
        {
            nombre_producto: String,
            cantidad: Number
        }
    ],
    lugar_envio: String,
    fecha_compra: Date,
    fecha_entrega_prevista: Date,
    Total: Number,
    TotalPag: Number,
    TotalCli: Number,
    estado_pedido: String
},
{
    versionKey: false
});

module.exports = model('pedidos', pedidoSchema)