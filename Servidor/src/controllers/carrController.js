const multer = require('multer');
const Producto = require('../models/Productos');
const Carrito = require('../models/carrito');

const agregarProducto = async (req, res) => {
  const { dpi, nombre_producto, cantidad } = req.body;
  try {
    let carrito = await Carrito.findOne({ dpi });
    if (!carrito) {
      carrito = new Carrito({ dpi, productos_agregados: [] });
    }
    const producto = carrito.productos_agregados.find(
      (p) => p.nombre_producto === nombre_producto
    );
    if (producto) {
      producto.cantidad += cantidad;
    } else {
      carrito.productos_agregados.push({ nombre_producto, cantidad });
    }
    await carrito.save();
    res.json({ mensaje: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al agregar el producto al carrito' });
  }
};


const carritoAgreg = async (req, res) => {
    const { id, nombre, cantidad } = req.body;
    const { dpi } = req.params;
  
    try {
      const carrito = await Carrito.findOne({ dpi });
  
      // Buscar si el producto ya está en el carrito
      const productoExistente = carrito.productos_agregados.find(p => p._id == id);
  
      if (productoExistente) {
        // Si el producto ya está en el carrito, solo actualizar la cantidad
        productoExistente.cantidad += parseInt(cantidad);
      } else {
        // Si el producto no está en el carrito, agregarlo
        const productoNuevo = { _id: id, nombre, cantidad: parseInt(cantidad) };
        carrito.productos_agregados.push(productoNuevo);
      }
  
      await carrito.save();
      res.json({ mensaje: 'Producto agregado al carrito correctamente' });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: 'Error al agregar el producto al carrito' });
    }
  };
  
  const obtenerCarrito = async (req, res) => {
    const { dpi } = req.params;
  
    try {
      const carrito = await Carrito.findOne({ dpi });
      const productos_con_precio = await Promise.all(carrito.productos_agregados.map(async producto => {
        const producto_con_precio = await Producto.findById(producto._id); // Obtener el producto con el precio desde la base de datos
        return {
          ...producto.toObject(),
          precio: producto_con_precio.precio // Agregar el precio al objeto de producto
        };
      }));
      res.json(productos_con_precio);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: 'Error al obtener el carrito' });
    }
  };

  const obtenerIdCarritoPorDpi = (req, res) => {
    const dpi = req.params.dpi;
  
    Carrito.findOne({ dpi: dpi })
      .then(carrito => {
        if (!carrito) {
          throw new Error('No se encontró ningún carrito con el DPI especificado');
        }
        const carritoId = carrito._id;
        res.json({ _id: carritoId });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Ocurrió un error al obtener el ID del carrito' });
      });
  };
 //-----------------------------------------------Para eliminar un producto
 
 async function eliminarProducto(req, res) {
    const idCarrito = req.params.carritoId;
    const idProducto = req.params.productoId;
    try {
      const carrito = await Carrito.findById(idCarrito);
      if (!carrito) {
        return res.status(404).json({ message: 'No se encontró el carrito' });
      }
      const producto = carrito.productos_agregados.id(idProducto);
      if (!producto) {
        return res.status(404).json({ message: 'No se encontró el producto en el carrito' });
      }
      carrito.productos_agregados.pull(idProducto);
      await carrito.save();
      res.status(200).json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
    }
  }

//------------------------------------- Controlador para poder eliminar todos los productos 

async function eliminarProductosCarrito(req, res) {
  const idCarrito = req.params.carritoId;
  try {
    const carrito = await Carrito.findById(idCarrito);
    if (!carrito) {
      return res.status(404).json({ message: 'No se encontró el carrito' });
    }
    carrito.productos_agregados = [];
    await carrito.save();
    res.status(200).json({ message: 'Productos eliminados del carrito' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al eliminar los productos del carrito' });
  }
}


  module.exports ={
    agregarProducto: agregarProducto,
    carritoAgreg: carritoAgreg,
    obtenerCarrito: obtenerCarrito,
    eliminarProducto: eliminarProducto,
    obtenerIdCarritoPorDpi: obtenerIdCarritoPorDpi,
    eliminarProductosCarrito: eliminarProductosCarrito
}