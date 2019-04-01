const hbs = require('hbs');
const fs = require('fs');
let curso = require('../private/cursos.json');

hbs.registerHelper('obtenerPromedio', (nota1, nota2, nota3)=>{
  return (nota1 + nota2 + nota3) / 3
})

hbs.registerHelper('listar', ()=>{
  listaEstudiantes = require('./listado.json')
  let texto = ' Lista de estudiantes <br> '
  listaEstudiantes.forEach(estudiante => {
    texto = `${texto} el nombre es ${estudiante.nombre} <br>
    su nota en matematicas es ${estudiante.matematicas} <br>
    su nota en ingles es ${estudiante.ingles} <br>
    su nota en programacion es ${estudiante.programacion} <br>
    `
  })
  return texto
})

hbs.registerHelper('mostrarAspi', ()=>{
  let texto = "<table>\
  <thead>\
  <th>Nombre</th>\
  <th>descripcion</th>\
  <th>valor></th>\
  </thead>";

  curso.forEach(curso => {
    if(curso.estado == 'disponible'){
    texto = texto + "<tr>" +
    '<td>'+ curso.nombre +
    '</td>' +
    '<td>'  + curso.descripcion + '</td>' +
    '<td>'  + curso.valor + '</td>' +
    '</tr>' ;
  }
  })
  texto = texto + '</tbody></table>';
  return texto
})
hbs.registerHelper('mostrar', ()=>{

  let texto = "<table>\
  <thead>\
  <th>Nombre</th>\
  <th>descripcion</th>\
  <th>valor></th>\
  </thead>";

  curso.forEach(curso => {

    texto = texto + "<tr>" +
    '<td>'+ curso.nombre +
    '</td>' +
    '<td>'  + curso.descripcion + '</td>' +
    '<td>'  + curso.valor + '</td>' +
    '</tr>' ;

  })
  texto = texto + '</tbody></table>';
  return texto
})
