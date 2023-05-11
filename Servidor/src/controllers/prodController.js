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
//---------------------------------------------------------------------------- Para ver los productos
const getProductosPorUsuario = async (req, res) => {
  try {
    const dpi = req.params.dpi;

    const productos = await Productos.find({
      'vendedor.DPI': dpi
    });

    res.status(200).json({ success: true, data: productos });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
};

const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Productos.findById(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ data: producto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

const modificarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, img, descripcion, vendedor, categorias, cantidad_existente, estado } = req.body;
    
    const productoActualizado = await Productos.findByIdAndUpdate(id, { nombre, precio, img, descripcion, vendedor, categorias, cantidad_existente, estado }, { new: true });
    
    if (!productoActualizado) {
      return res.status(404).json({ mensaje: 'No se encontró el producto con el ID proporcionado' });
    }
    
    res.status(200).json({ mensaje: 'Producto actualizado exitosamente', producto: productoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Hubo un error al procesar la solicitud' });
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
const agregarProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion, cantidad_existente, categoria } = req.body;
    const vendedor = req.user ? { nombre: req.user.nombre, DPI: req.user.DPI } : {};

    const producto = new Productos({
      nombre,
      precio,
      img: req.file.path,
      descripcion,
      vendedor,
      categorias: categoria.split(',').map((c) => c.trim()),
      cantidad_existente,
      estado: 'disponible',
    });

    await producto.save();

    res.status(201).json({ mensaje: 'Producto agregado exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al agregar el producto' });
  }
};
//----------------------------------------------------------------------------Reporte
const reporte4 = async (req, res) => {
  try {
    // Obtener todos los productos agrupados por vendedor
    const productosPorVendedor = await Productos.aggregate([
      {
        $group: {
          _id: '$vendedor.DPI',
          nombre_vendedor: { $first: '$vendedor.nombre' },
          cantidad_productos: { $sum: 1 }
        }
      },
      {
        $sort: {
          cantidad_productos: -1
        }
      },
      {
        $limit: 10
      }
    ]);

    res.json(productosPorVendedor);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

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
    actualizarCantidad: actualizarCantidad,
    reporte4: reporte4,
    getProductosPorUsuario: getProductosPorUsuario,
    obtenerProductoPorId: obtenerProductoPorId,
    modificarProducto: modificarProducto

  }