const Productos = require('../models/Productos')
const multer = require('multer');


const listarProd = async (req, res) => {
    try {
      const productos = await Productos.find();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
  };

  const prodDisponibles = async (req, res) => {
    try {
      const productos = await Productos.find({ estado: 'disponible' });
      res.json(productos);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
  };
 
  const prodEnviado = async (req, res )=> {
    try{
      const productos = await Productos.find ({ estado: 'enviado'});
      res.json(productos);
    }catch (error){
      res.status(500).json({mensaje: 'Error al obtener enviados'});
    }
  }

  const prodCancelado = async (req, res )=> {
    try{
      const productos = await Productos.find ({ estado: 'Restringido'});
      res.json(productos);
    }catch (error){
      res.status(500).json({mensaje: 'Error al obtener Restringido'});
    }

  }

  const obtenerProducto = async (req, res) => {
    try {
      const producto = await Productos.findById(req.params.id);
      res.json(producto);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener el producto' });
    }
  };

  const prodAprobar = async (req, res) => {
  const { id } = req.params; 
  const { estado } = req.body; 
  
  try {
         // Buscar el producto por su ID y actualizar su estado
        const producto = await Productos.findByIdAndUpdate(id, { estado }, { new: true });
        res.json(producto); // Enviar el producto modificado como respuesta
  } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: 'Error al modificar el estado del producto' });
  }
  }

  const prodNegar = async (req, res) => {
    const { id } = req.params; // Obtener el ID del producto a modificar
    const { estado } = req.body; // Obtener el nuevo estado del producto
    
    try {
           // Buscar el producto por su ID y actualizar su estado
          const producto = await Productos.findByIdAndUpdate(id, { estado }, { new: true });
          res.json(producto); // Enviar el producto modificado como respuesta
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al modificar el estado del producto' });
    }
    }

    const prodCanceladoId = async (req, res) => {
      try {
        const dpi = req.query.dpi;
        const productos = await Productos.find({ dpi: dpi, estado: 'Restringido' });
     res.json(productos);
      } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos restringidos', error });
      }
    };
  
    const prodCanceladoid = async (req, res) => {
      const { DPI } = req.params;
      try {
        const productos = await Productos.find({ estado: 'Restringido', 'vendedor.DPI': DPI });
        res.status(200).json(productos);
      } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos restringidos' });
      }
    };

//---------------------------------------------------------------------------Actualizar Stock
const actualizarCantidad = async (req, res) => {
  const listaProductos = req.body;
  let productosActualizados = [];

  try {
    for (let i = 0; i < listaProductos.length; i++) {
      const producto = listaProductos[i];
      const { nombre, cantidad_existente } = producto;
      const prod = await Productos.findOne({ nombre: nombre });
      const cantidad_actualizada = prod.cantidad_existente - cantidad_existente;
      const prodActualizado = await Productos.findOneAndUpdate(
        { nombre: nombre },
        { cantidad_existente: cantidad_actualizada },
        { new: true }
      );
      productosActualizados.push(prodActualizado);
    }
    res.json(productosActualizados);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};   
//----------------------------------------------------------------------------Eliminar
const eliminarProducto = async (req, res) => {
  const { id } = req.params; // Obtener el ID del producto a eliminar

  try {
    // Buscar el producto por su ID y eliminarlo
    await Productos.findByIdAndDelete(id);
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto' });
  }
};
//-------------------------------------------------------------------------------Agregar Productos
async function agregarProducto(req, res) {
  const { nombre, descripcion, precio, cantidad_existente, categoria } = req.body;

  const producto = new Producto({
    nombre,
    descripcion,
    precio,
    cantidad_existente,
    categoria,
    estado: 'enviado'
  });

  if (req.file) {
    producto.img = req.file.path;
  }

  try {
    const productoGuardado = await producto.save();
    res.json(productoGuardado);
  } catch (error) {
    res.status(400).send(error);
  }
}
  

 //------------------Para obtener los datos del producto-------------- 


 const saveProducto =async (req, res) => {
  const productoInsert = new Producto({
      nombre:  req.body.nombre,
      precio: req.body.precio,
      img: req.body.img,
      descripcion: req.body.descripcion,
      vendedor: req.body.vendedor,
      categorias:req.body.categorias,
      cantidad_existente:req.body.cantidad_existente,
      estado:'Pendiente'
  })
  const newProducto = await productoInsert.save();
  res.json(newProducto)
}

 const getImgProducto = async (req, res) => {
    res.set('Content-Type', 'image/jpg');
    const url = req.query.url
    res.sendFile(__dirname+url);
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'src/controllers/img/imgproductos');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
});
  
  const upload = multer({ storage: storage })


  module.exports ={
    listarProd: listarProd,
    saveProducto:saveProducto,
    getImgProducto:getImgProducto,
    prodDisponibles: prodDisponibles,
    obtenerProducto: obtenerProducto,
    upload:upload,
    prodAprobar: prodAprobar,
    agregarProducto: agregarProducto,
    prodEnviado: prodEnviado,
    prodNegar: prodNegar,
    prodCancelado: prodCancelado,
    eliminarProducto: eliminarProducto,
    prodCanceladoid: prodCanceladoid,
    prodCanceladoId: prodCanceladoId,
    actualizarCantidad: actualizarCantidad
  }