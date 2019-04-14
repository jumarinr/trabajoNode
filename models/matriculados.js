const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matriculadoSchema = new Schema({
  id: {
    type: Number,
    require: true
  },
  cursos: {
    type: Array,
    require: true
  }
})

const Matriculados = mongoose.model('Matriculados', matriculadoSchema);

module.exports = Matriculados;
