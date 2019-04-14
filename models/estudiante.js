const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
  nombre: {
    type: String,
    require: true
  }
})

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante;
