var express = require('express');
var app = express();
const path = require('path');
const hbs = require('hbs');
require('./helpers');
require('./config/config');
const bcrypt = require('bcrypt');
const fs = require('fs');
const listadoCursos = require('../private/cursos.json');
const listadoEstudiantes = require('../private/usuarios.json');
const listadoMatriculas = require('../private/matriculados.json');
let direccionCursos = "../trabajoNode/private/cursos.json";
let direccionMatriculas = "../trabajoNode/private/matriculados.json";
let direccionEstudiantes = "../trabajoNode/private/usuarios.json";
const bodyParser = require('body-parser');
const Estudiante = require('../models/estudiante');
const Usuarios = require('../models/usuarios');
const Matriculados = require('../models/matriculados');
const Cursos = require('../models/cursos');
const session = require('express-session');

app.set('view engine', 'hbs');
const mongoose = require('mongoose');


const roles = ['aspirante', 'coordinador', 'visitante'];

function crearCurso(nombre, id, descripcion, precio, modalidad, intensidad) {
  let texto;
  Cursos.find({
    id: id
  }).exec((err, resultado) => {
    if (err) {
      console.log(err);
    } else {
      if (resultado.length > 0) {
        texto = "no se creo el curso porque este id ya existe, por favor ingrese otra"
      } else {
        let curso = new Cursos({
          "nombre": nombre,
          "id": id,
          "descripcion": descripcion,
          "valor": precio,
          "estado": "disponible",
          "modalidad": modalidad ? modalidad : null,
          "intensidad": intensidad
        })
        texto = "curso creado";
        curso.save();
      }
    }
  })
  return texto
}

function inscribirACurso(id, idMateria) {
  Usuarios.find({
    id: id
  }).exec((error, result) => {
    if (error) {
      console.log(error);
    } else {
      Matriculados.find({
        $and: [{
          id: id
        }, {
          cursos: idMateria
        }]
      }).exec((error, resultado) => {
        if (error) {
          console.log(error);
        } else {
          if (resultado.length > 0) {
            return "el estudiante ya se encuentra matriculado en este curso"
          } else {
            Matriculados.update({
              id: id
            }, {
              $push: {
                cursos: idMateria
              }
            }, {
              upsert: true
            },
              (error, resultado) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(resultado)
                }
              }
            )
          }
        }
      });
    }
  })
}

function inscribirUsuario(nombre, id, correo, numero, contrasena) {
  Estudiante.find({id: id}).exec((err, respuesta) => {
    if (err) {
      console.log(err);
    } else {
      if (respuesta.length > 0) {
        return "no se creo el usuario porque con este id ya existe, por favor ingrese otra"
      } else {
        let usuario = new Usuarios({
          "nombre": nombre,
          "documento": id,
          "correo": correo,
          "numero": numero,
          "rol": "aspirante",
          "contrasena": contrasena
        })
        usuario.save((error, resultado) => {
          if (error) {
            console.log(error);
          } else {
            resultado
          }
        });
        return "Usuario creado con exito"
      }
    }
  })
}
const partials = path.join(__dirname, '../partials');
hbs.registerPartials(partials);

app.use(bodyParser.urlencoded({
  extended: false
}));



// app.get('/registroUsuario',(req, res)=>{
//   res.render('registroUsuario', {
//     estudiante: req.query.nombre,
//     nota1: parseInt(req.query.nota1),
//     nota2: parseInt(req.query.nota2),
//     nota3: parseInt(req.query.nota3)
//   });
// })

app.use(session({secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use((req,res, next)=>{
  if(req.session.usuario){
    res.locals.session = true;
    res.locals.nombre = req.session.nombre;
  }
  next()
})

app.get('/verCursos', (req, res) => {

  Cursos.find({}).exec((error, respuesta) => {
    if (error) {
      console.log(error);
    } else {

      res.render('verCursos', {
        cursos: respuesta
      })
    }
  })
})
app.get('/inscribirCursos', (req, res) => {
  res.render('registroCurso');
})
app.post('/registroCurso', (req, res) => {
  res.render('registroCursoPost', {
    mensaje: crearCurso(req.body.nombre, req.body.id, req.body.descripcion, req.body.precio, req.body.modalidad, req.body.intensidad)
  })
})
app.get('/inscribirCursosUser', (req, res) => {
  Cursos.find({}).exec((error, respuesta) => {
    if (error) {
      console.log(error);
    } else {
      res.render('inscribirCursos', {
        cursos: respuesta
      })
    }
  })
})
app.post('/inscribirCursosUser', (req, res) => {
  res.render('inscribirCursosPost', {
    mensaje: inscribirACurso(Number(req.body.documento), Number(req.body.option))
  })
})

app.get('/inscribir', (req, res) => {
  res.render('inscribir');
})
app.post('/inscribir', (req, res) => {
  res.render('inscribirPost', {
    mensaje: inscribirUsuario(req.body.nombre, req.body.documento, req.body.correo, req.body.telefono,
      bcrypt.hashSync(req.body.contrasena, 10))
  })
})
app.get('/registroCurso', (req, res) => {
  res.render('registroCurso')
})


app.post('/subirCursos', (req, res) => {

})
app.get('/verInscritos', (req, res) => {
  res.render('verInscritos')
})
app.post('/verInscritos', (req, res) => {
  Matriculados.findOne({id: parseInt(req.body.id) }).exec((error, resultado)=>{
    if(error){
      console.log(error);
    }else{
      res.render('verInscritosPost', {
        data: resultado.cursos
      })
    }
  })
})
app.get('/', (req, res) => {

  res.render('inicio')
})
app.post('/', (req, res) => {

  res.render('inicio')
})
app.get('/salir', (req, res) => {
  req.session.destroy((err)=>{
    if(err) return console.log(err);
  })
  res.redirect('/')
})
app.post('/ingresar', (req, res) => {
  Usuarios.findOne({documento: req.body.documento}).exec((error, resultado)=>{
    if (error) {
      console.log(error);
    } if (!resultado) {
      return res.render('ingresar', {result: "Usuario no encontrado"})
    }if(!bcrypt.compareSync(req.body.contrasena, resultado.contrasena)){
      return res.render('ingresar', {result: "contraseña  incorrecta"})
    }
    req.session.usuario = resultado._id;
    req.session.nombre = resultado.nombre;
      return res.render('ingresar', {result: `bienvenido ${resultado.nombre}`,
    session: true,
  nombre: req.session.nombre})

  })
})
app.get('*', (req, res) => {
  res.render('error');
})

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true
}, (error, resultado) => {
  if (error) {
    console.log(error);
  } else {
    console.log("okey");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`el servidor monto, loool :v. ingrese en su navegador localhost:${process.env.PORT}`);
})
