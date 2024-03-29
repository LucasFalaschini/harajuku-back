const { response } = require('express')
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario')

const { generarJWT } = require('../helpers/jwt')

const getUsuarios = async (req, res)=> {

    // el find busca todos los usuarios. Lo pasado por parametros es para filtrar
    const usuarios = await Usuario.find({}, 'nombre')

    res.json({
        ok: true,
        msg: 'Get usuarios',
        usuarios,
        uid: req.uid
    })

}

const crearUsuario = async (req, res = response)=>{

    const {nombre, email, password} = req.body



    try {

        const existeEmail = await Usuario.findOne({email})

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body)

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        //Guardar usuario
        await usuario.save();

        const token = await generarJWT(usuario.id)
    
        res.json({
            ok: true,
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }



}

const actualizarUsuario = async  (req, res = response) => {
    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid)

        if(!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese id'
            })
        }

        //Actualizar
        const { password, google, email, ...campos } = req.body

        if(usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos, { new:true })

        res.json({
            ok:true,
            usuario: usuarioActualizado
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado al actualizar'
        })
        
    }

}

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid)

        const { password, google, email, ...campos } = req.body
        
        if(!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese id'
            })
        }

        await Usuario.findByIdAndDelete(uid)

        res.json({
            ok:true,
            msg: 'Usuario eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado al borrar'
        })
        
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}

