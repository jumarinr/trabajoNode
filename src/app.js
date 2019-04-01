var express = require('express');
var app = express();
const path = require('path');
const hbs = require('hbs');
require('./helpers');
const listadoCursos = require('../private/cursos.json');
const bodyParser = require('body-parser');

app.set( 'view engine' , 'hbs');

const  roles = ['aspirante', 'coordinador', 'visitante'];

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

app.get('/inicio', (req, res)=>{
  res.render('index'), {
    cursos: listadoCursos
  }
})

app.post('/calculos',(req, res)=>{
  res.render('calculos', {
    documento: parseInt(req.body.documento),
    nombre: req.body.nombre,
    correo: req.body.correo,
    telefono: parseInt(req.body.telefono)
  });
})

app.get('/registroCurso', (req, res)=>{
  res.render('registroCurso')
})

app.post('/subirCursos' , (req, res)=>{
  console.log(req.body)
})

app.get('*', (req, res)=>{
  res.render('error');
})

app.listen(3000, ()=>{
  console.log("el servidor monto, loool :v. ingrese en su navegador localhost:3000");
})
