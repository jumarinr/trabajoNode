const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursoSchema = new Schema({
  nombre: {
    type: String,
    require: true
  },
  id: {
    type: String,
    require: true
  },
  descripcion: {
    type: String,
    require: true
  },
  valor: {
    type: Number,
    require: true
  },
  estado: {
    type: String,
    require: true
  },
  modalidad: {
    type: String,
    require: true
  },
  intensidad: {
    type: String,
    require: true
  }
})

const Cursos = mongoose.model('Cursos', CursoSchema);

module.exports = Cursos;
