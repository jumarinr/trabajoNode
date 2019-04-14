const hbs = require('hbs');



hbs.registerHelper('mostrarAspi', (cursos)=>{
let texto = "<table>\
<thead>\
<th>Nombre</th>\
<th>descripcion</th>\
<th>valor</th>\
</thead>";
let key = 0
cursos.forEach(curso => {
  if (curso.estado == "disponible"){
  key = key + 1

  texto = texto + "<tr>" +
  '<td>'+ `<div id="accordion">
  <div class="card">
  <div class="card-header" id="headingOne">
  <h5 class="mb-0">
  <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${key}a" aria-expanded="true" aria-controls="collapse${key}a">
  ${curso.nombre}
  </button>
  </h5>
  </div>

  <div id="collapse${key}a" class="collapse show" aria-labelledby="heading${key}a" data-parent="#accordion">
  <div class="card-body">
  <table>
  <thead>\
  <th>Descripcion</th>\
  <th>Modalidad</th>\
  <th>Intensidad Horaria</th>\
  </thead>
  <tr>
  <td>${curso.descripcion}</td>
  <td>${curso.modalidad ? curso.modalidad : '--'}</td>
  <td>${curso.intensidad ? curso.intensidad : '--'}</td>
  </tr>
  </table
  </div>
  </div>
  </div>
  </div>` +
  '</td>' +
  '<td>'  + curso.descripcion + '</td>' +
  '<td>'  + curso.valor + '</td>' +
  '</tr>' ;
}

})
texto = texto + '</tbody></table>';
return texto;
})
hbs.registerHelper('mostrar', (cursos)=>{


let texto = "<table>\
<thead>\
<th>Nombre</th>\
<th>descripcion</th>\
<th>valor</th>\
</thead>";
let key = 0
cursos.forEach(curso => {
  key = key + 1

  texto = texto + "<tr>" +
  '<td>'+ `<div id="accordion">
  <div class="card">
  <div class="card-header" id="headingOne">
  <h5 class="mb-0">
  <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${key}" aria-expanded="true" aria-controls="collapse${key}">
  ${curso.nombre}
  </button>
  </h5>
  </div>

  <div id="collapse${key}" class="collapse show" aria-labelledby="heading${key}" data-parent="#accordion">
  <div class="card-body">
  <table>
  <thead>\
  <th>Descripcion</th>\
  <th>Modalidad</th>\
  <th>Intensidad Horaria</th>\
  </thead>
  <tr>
  <td>${curso.descripcion}</td>
  <td>${curso.modalidad ? curso.modalidad : '--'}</td>
  <td>${curso.intensidad ? curso.intensidad : '--'}</td>
  </tr>
  </table
  </div>
  </div>
  </div>
  </div>` +
  '</td>' +
  '<td>'  + curso.descripcion + '</td>' +
  '<td>'  + curso.valor + '</td>' +
  '</tr>' ;

})
texto = texto + '</tbody></table>';
return texto;
})
hbs.registerHelper('listarCursosDisponibles', (cursos)=>{
  let texto = `<select name="option" required>  <option disabled selected >seleccione un curso</option>`

  cursos.forEach(curso => {
    if(curso.estado == 'disponible'){
    texto = texto + `
    '<option  value="${curso.id}">${curso.nombre} </option>`
  }
  })
  texto = texto + '</select>';
  return texto
})
hbs.registerHelper('listarMisCursos', (data)=>{
  let texto = ' ';
console.log(data);
  data.forEach(matricula => {
    texto = texto + ' ' + matricula + " "
  })
  return texto
})
