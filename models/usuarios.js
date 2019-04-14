const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    require: true
  },
  documento: {
    type: Number,
    require: true
  },
  correo: {
    type: String,
    require: true
  },
  numero: {
    type: Number,
    require: true
  },
  rol: {
    type: String,
    require: true
  },
  contrasena: {
    type: String,
    require: true
  }
})

const Usuarios = mongoose.model('Usuarios', UsuarioSchema);

module.exports = Usuarios;
