const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryp = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    console.log(password);

    try {

        const usuarioDB = await Usuario.findOne({ email });

        //Verificar Email

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no valido'
            })
        }

        //Verificar contraseña

        const validPasword = bcryp.compareSync(password, usuarioDB.password);

        console.log('estatusDs: ', validPasword);

        if (!validPasword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        //generar JSON Web Token
        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.rol)
        })


    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });

        let usuario;

        if (!usuarioDB) { // Si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else { //Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardar en base de datos
        await usuario.save();

        //Generar Json Web Token
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuario.rol)
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }
}

const renewToken = async(req, res = response) => { //fn para renovar token
    const uid = req.uid;

    //generar JSON Web Token
    const token = await generarJWT(uid)

    //Obtener el usario por el uid
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        token: token,
        usuario,
        menu: getMenuFrontEnd(usuario.rol)
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}