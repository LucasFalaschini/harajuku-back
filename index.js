//import express from 'express'
// Es lo mismo
const express = require('express')
require('dotenv').config();
var cors = require('cors')

const { dbConnection } = require('./database/config')

//Crear el servidor de express
const app = express()

// Configurar CORS
// Es un middleware
app.use(cors());

// Base de datos
dbConnection();


// Rutas
// Definimos la respuesta cuando alguien haga la solicitud.
// Req = Lo que se solicita
// Res = Lo que mandamos nosotros

app.get('/',(req, res)=>{

    res.json({
        ok: true,
        msg: 'Hola mundo'
    })

});

app.listen(process.env.PORT, ()=> {
    console.log("Servidor corriendo en puerto " + process.env.PORT)
})