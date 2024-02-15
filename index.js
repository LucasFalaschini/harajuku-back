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

// Lectura y parseo del body (antes del uso de rutas)
app.use(express.json())

// Base de datos
dbConnection();


app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))




app.listen(process.env.PORT, ()=> {
    console.log("Servidor corriendo en puerto " + process.env.PORT)
})