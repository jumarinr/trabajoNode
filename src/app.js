var express = require('express');
var app = express();
const path = require('path');
const hbs = require('hbs');
require('./helpers');
require('./config/config');
const fs = require('fs');
const listadoCursos = require('../private/cursos.json');
const listadoEstudiantes = require('../private/usuarios.json');
const listadoMatriculas = require('../private/matriculados.json');
let direccionCursos  = "../trabajoNode/private/cursos.json";
let direccionMatriculas  = "../trabajoNode/private/matriculados.json";
let direccionEstudiantes  = "../trabajoNode/private/usuarios.json";
const bodyParser = require('body-parser');

app.set( 'view engine' , 'hbs');
const mongoose = require('mongoose');

const  roles = ['aspirante', 'coordinador', 'visitante'];
function crearCurso(nombre, id, descripcion, precio, modalidad, intensidad) {
 let cursos = listadoCursos;
 let texto;
 const resultado = cursos.find( curso => curso.id === id)
 if (resultado) {
   texto = "no se creo el curso porque este id ya existe, por favor ingrese otra"
 }else{
   let materia =   { "nombre" : nombre,
     "id" : id ,
     "descripcion" : descripcion,
     "valor": precio,
     "estado" : "disponible",
     "modalidad": modalidad ? modalidad : null,
     "intensidad": intensidad }
     cursos.push(materia)
     texto = "curso creado";
     fs.writeFile(direccionCursos , JSON.stringify(cursos),'utf8', (err)=>{
       if(err){
         console.log(err)
         texto = "no se creo el curso"
       }
       else{
           texto =  "curso creado"
         }
     })
 }
 return texto;
}

function inscribirACurso(id, idMateria) {
 let matriculas = listadoMatriculas;
 let busca;
 const resultado = matriculas.find( matricula => {
   if (matricula.id == id && matricula.cursos){
     for (var i = 0; i < matricula.cursos.length; i++) {
       if (matricula.cursos[i]==idMateria){
        busca = true;
       }
     }
   }
 })
 if (busca) {
   return "el estudiante ya esta registrado en esta";
 }else{
   let estudiante = listadoEstudiantes.find( matricula => matricula.documento == id)
   console.log(id, idMateria)
   let dataEstudiante = matriculas.find( matricula => matricula.id == id)
   console.log(dataEstudiante);
   if (!estudiante){
     return "el estudiante no se encuentra registrado"
   }else{
     if (matriculas.indexOf(dataEstudiante)!=-1 ){
       console.log(matriculas.indexOf(dataEstudiante) )
      matriculas.splice(matriculas.indexOf(dataEstudiante) , 1);
    }else{
      dataEstudiante = {
        id: id,
        cursos: [idMateria]
      }
    }
    dataEstudiante.cursos.push(idMateria);
     matriculas.push(dataEstudiante)
     fs.writeFile(direccionMatriculas , JSON.stringify(matriculas),'utf8', (err)=>{
       if(err){
         console.log(err)
         return "no se añadio el curso"
       }
       else{
           console.log('se ha inscrito al estudiante');
           return "curso añadido"
         }
     })
   }
 }
}

function inscribirUsuario(nombre, id, correo, numero) {
 let usuarios = listadoEstudiantes;
 let texto;
 const resultado = usuarios.find( usuario => usuario.documento == id)
 if (resultado) {
   return "no se creo el usuario porque con este id ya existe, por favor ingrese otra"
 }else{
   let usuario =   { "nombre" : nombre,
     "documento" : id ,
     "correo" : correo,
     "numero": numero,
     "rol" : "aspirante"}
     usuarios.push(usuario)
     texto =  "usuario creado"
     fs.writeFile(direccionEstudiantes , JSON.stringify(usuarios),'utf8', (err)=>{
       if(err){
         console.log(err)
         texto =  "no se creo el usuario"
       }
       else{
           console.log('se ha creado el usuario');
           texto =  "usuario creado"
         }
     })
 }
 return texto
}
const partials = path.join(__dirname, '../partials');
hbs.registerPartials(partials);

app.use(bodyParser.urlencoded({extended: false}));



// app.get('/registroUsuario',(req, res)=>{
//   res.render('registroUsuario', {
//     estudiante: req.query.nombre,
//     nota1: parseInt(req.query.nota1),
//     nota2: parseInt(req.query.nota2),
//     nota3: parseInt(req.query.nota3)
//   });
// })

app.get('/verCursos', (req, res)=>{
  res.render('verCursos'), {
    cursos: listadoCursos
  }
})
app.get('/inscribirCursos', (req, res)=>{
  res.render('registroCurso');
})
app.post('/registroCurso', (req, res)=>{
  res.render('registroCursoPost', {
    mensaje: crearCurso(req.body.nombre, req.body.id, req.body.descripcion, req.body.precio, req.body.modalidad, req.body.intensidad)
  })
})
app.get('/inscribirCursosUser', (req, res)=>{
  res.render('inscribirCursos');
})
app.post('/inscribirCursosUser', (req, res)=>{
  console.log(req.body)
  res.render('inscribirCursosPost', {
    mensaje: inscribirACurso(req.body.documento, req.body.option)
  })
})

app.get('/inscribir', (req, res)=>{
  res.render('inscribir');
})
app.post('/inscribir', (req, res)=>{
  res.render('inscribirPost', {
    mensaje: inscribirUsuario(req.body.nombre, req.body.documento, req.body.correo, req.body.telefono)
  })
})
app.get('/registroCurso', (req, res)=>{
  res.render('registroCurso')
})


app.post('/subirCursos' , (req, res)=>{

})
app.get('/verInscritos', (req, res)=>{
  res.render('verInscritos')
})
app.post('/verInscritos', (req, res)=>{
  res.render('verInscritosPost', {
    id: parseInt(req.body.id)
  })
})
app.get('/inicio' , (req, res)=>{
  res.render('inicio')
})
app.get('*', (req, res)=>{
  res.render('error');
})
//mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

app.listen(port, ()=>{
  console.log(`el servidor monto, loool :v. ingrese en su navegador localhost:${process.env.PORT}`);
})
