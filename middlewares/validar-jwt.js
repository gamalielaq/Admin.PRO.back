const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {

    //Leer el token
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        });
    }


}

const validarAdminRol = async(req, res, next) => {

    const uid = req.uid;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        if (usuarioDB.rol != 'ADMIN_ROL') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene provilegios para hacer eso'
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const validarAdminRolMismoUsuaio = async(req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        if (usuarioDB.rol != 'ADMIN_ROL' && uid !== id) {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene provilegios para hacer eso'
            })
        }

        next();


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    validarJWT,
    validarAdminRol,
    validarAdminRolMismoUsuaio
}