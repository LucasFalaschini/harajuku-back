/*
    Ruta: /api/usuarios
*/
/*
    Definimos la respuesta cuando alguien haga la solicitud.
    Req = Lo que se solicita
    Res = Lo que mandamos nosotros
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
 
const { getUsuarios, crearUsuario, actualizarUsuario,borrarUsuario } = require('../controllers/usuarios')

const router = Router();

router.get('/',
    [
        validarJWT
    ],
    getUsuarios)

router.post(
    '/',
    //Arreglo de validaciones (los custom van al final)
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuario)

router.put(
    '/:id', 
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('role','El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario)

router.delete(
    '/:id', 
    validarJWT,
    borrarUsuario)

module.exports = router