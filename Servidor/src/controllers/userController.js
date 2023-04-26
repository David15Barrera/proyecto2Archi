const Usuario = require('../models/Usuarios')


const insertUsuario = async(req, res) =>{
    const insert = new Usuario({
        nombre_usuario: req.body.nombre_usuario,
        password: req.body.password,
        tipo_usuario: req.body.tipo_usuario,
        dpi: req.body.dpi,
        correo_electronico: req.body.correo_electronico,
        telefono: req.body.telefono
    }); 
    const insertUsuario = await insert.save();
    console.log(insertUsuario);
    res.json(insertUsuario);
}

// busca un usuario con el nombre de usuario y contraseña proporcionados
const loginUsuario = async(req, res) =>{
    const { dpi, password } = req.body;
    try {
      const usuario = await Usuario.findOne({ dpi, password });
      if (!usuario) {
        return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
      }
      return res.json({ mensaje: 'Autenticación exitosa', tipo_usuario: usuario.tipo_usuario });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

const eliminarUsuarioPorDpi = async (req, res) => {
  try {
    const { dpi } = req.params;
    const resultado = await Usuario.deleteOne({ dpi });
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ mensaje: 'No se encontró el usuario' });
    }
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
};

const editarUsuarioPorDPI = async (req, res) => {
  const { dpi } = req.params;
  const { nombre_usuario, password, tipo_usuario, correo_electronico, telefono } = req.body;

  try {
    const usuario = await Usuario.findOne({ dpi });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'No se encontró el usuario' });
    }
      usuario.nombre_usuario = nombre_usuario;
      usuario.password = password;
      usuario.tipo_usuario = tipo_usuario;
      usuario.correo_electronico = correo_electronico;
      usuario.telefono = telefono;
    await usuario.save();

    res.json({ mensaje: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
};

const buscarPorDpi = async (req, res) => {
  const { dpi } = req.body;
  try {
    const usuario = await Usuario.findOne({ dpi });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar usuario por DPI', error });
  }
};

module.exports = {
    insertUsuario:insertUsuario,
    loginUsuario: loginUsuario,
    listarUsuarios: listarUsuarios,
    eliminarUsuarioPorDpi: eliminarUsuarioPorDpi,
    editarUsuarioPorDPI: editarUsuarioPorDPI,
    buscarPorDpi: buscarPorDpi
}