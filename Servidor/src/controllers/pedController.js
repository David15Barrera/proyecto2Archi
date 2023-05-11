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
  
  const obtenerPedidos = async (req, res) => {
    try {
      const pedidos = await Pedido.find();
      res.json(pedidos);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };

  const obtenerPedidosPorDPI = async (req, res) => {
    const { dpi } = req.params;
  
    try {
      const pedidos = await Pedido.find({ dpi: dpi });
      res.json(pedidos);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Error del servidor');
    }
  };
  
  const actuPedido = async (req, res) => {
    const { id } = req.params;
    const { fecha_entrega_prevista, estado_pedido } = req.body;
  
    try {
      const pedido = await Pedido.findById(id);
  
      if (!pedido) {
        return res.status(404).json({ mensaje: 'Pedido no encontrado' });
      }
  
      pedido.fecha_entrega_prevista = fecha_entrega_prevista;
      pedido.estado_pedido = estado_pedido;
  
      await pedido.save();
  
      res.json({ mensaje: 'Pedido actualizado correctamente' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
  
//------------------------------------------------------------Reportes
//Primer reporte
const obtenerTopProductosVendidos = async (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  try {
    const pedidos = await Pedido.find({
      fecha_compra: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) }
    });

    // Crear un objeto para contar la cantidad de cada producto vendido
    const productosVendidos = {};

    // Contar la cantidad de cada producto vendido en cada pedido
    pedidos.forEach(pedido => {
      pedido.productos_comprados.forEach(producto => {
        const { nombre_producto, cantidad } = producto;
      //  console.log(nombre_producto, cantidad);
        if (productosVendidos[nombre_producto]) {
          productosVendidos[nombre_producto] += cantidad;
        } else {
          productosVendidos[nombre_producto] = cantidad;
        }
      });
    });

    // Ordenar los productos por cantidad vendida de mayor a menor
    const productosOrdenados = Object.entries(productosVendidos).sort((a, b) => b[1] - a[1]);

    // Obtener los top 10 productos más vendidos
    const topProductos = productosOrdenados.slice(0, 10);

    res.json(topProductos);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Reportes 2
const obtenerTopClientes = async (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  try {
    const pedidos = await Pedido.find({
      fecha_compra: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) }
    });

    // Crear un objeto para contar las ganancias por cliente
    const gananciasPorCliente = {};

    // Contar las ganancias por cliente en cada pedido
    pedidos.forEach(pedido => {
      const { dpi, nombre_usuario, TotalPag } = pedido;
      if (gananciasPorCliente[dpi]) {
        gananciasPorCliente[dpi].ganancias += TotalPag;
      } else {
        gananciasPorCliente[dpi] = { dpi, nombre_usuario, ganancias: TotalPag };
      }
    });

    // Ordenar los clientes por ganancias generadas de mayor a menor
    const clientesOrdenados = Object.entries(gananciasPorCliente).sort((a, b) => b[1] - a[1]);

    // Obtener los top 5 clientes con más ganancias generadas
    const topClientes = clientesOrdenados.slice(0, 5);

    res.json(topClientes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

//Reporte 3
const reporte3 = async (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  try {
    const pedidos = await Pedido.find({
      fecha_compra: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) }
    });

    // Crear un objeto para contar los pedidos por cliente
    const pedidosPorCliente = {};

    // Contar los pedidos por cliente
    pedidos.forEach(pedido => {
      const { dpi, nombre_usuario } = pedido;
      if (pedidosPorCliente[dpi]) {
        pedidosPorCliente[dpi].cantidad += 1;
      } else {
        pedidosPorCliente[dpi] = { nombre_usuario, cantidad: 1 };
      }
    });

    // Ordenar los clientes por cantidad de pedidos de mayor a menor
    const clientesOrdenados = Object.entries(pedidosPorCliente).sort((a, b) => b[1] - a[1]);

    // Obtener los top 10 clientes con más pedidos realizados
    const topClientes = clientesOrdenados.slice(0, 10);

    res.json(topClientes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

//reporte 4

const topClientesPorVentas = async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.query;
    const topClientes = await Pedido.aggregate([
      {
        $match: {
          fecha_compra: {
            $gte: new Date(fecha_inicio),
            $lte: new Date(fecha_fin)
          }
        }
      },
      {
        $unwind: "$productos_comprados"
      },
      {
        $group: {
          _id: "$dpi",
          nombre_usuario: { $first: "$nombre_usuario" },
          cantidad: { $sum: "$productos_comprados.cantidad" }
        }
      },
      {
        $sort: { cantidad: -1 }
      },
      {
        $limit: 5
      }
    ]);
    res.json(topClientes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el Top 5 de clientes');
  }
}; 

  module.exports = {
    crearPedido: crearPedido,
    obtenerPedidosPorDPI: obtenerPedidosPorDPI,
    obtenerPedidos: obtenerPedidos,
    actuPedido: actuPedido,
    obtenerTopProductosVendidos: obtenerTopProductosVendidos,
    obtenerTopClientes: obtenerTopClientes,
    reporte3: reporte3,
    topClientesPorVentas: topClientesPorVentas
  };