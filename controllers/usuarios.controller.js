const { response } = require('express');
const bcryp = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;


    
    // const usuario = await Usuario
    //                 .find({}, 'nombre email role google')
    //                 .skip( desde )
    //                 .limit( 5 )


    // const total = await Usuario.count();

    const [ usuario, total ] =  await Promise.all([

        Usuario
               .find({}, 'nombre email role google img')
               .skip( desde )
               .limit( 5 ),

        Usuario.count()  // total
    ]);

    res.json(
        {
            ok: true,
            usuario,
            total
        }
    );
}

//-------Crear usuario------------------------------
const createUsuario = async(req, res = response) => {
    
    const {email, password, nombre} = req.body;


    try {

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ) {
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            });
        }
        
        const usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcryp.genSaltSync();
        usuario.password = bcryp.hashSync( password, salt );


        //generar JSON Web Token
        const token =  await generarJWT ( usuario.id ); 

        //Guardar Usuario
        await usuario.save(); 
        
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado... revisar logs'
        })
    }  
}

//-------Actualizar usuario------------------------------
const actualizarUsuario = async (req, res = response) => {
    
    const uid = req.params.id;
    

    try {

        const usuarioDB =  await Usuario.findById( uid );

        if ( !usuarioDB )  {
            return  res.status(400).json({
                ok:false,
                msg: 'No existe un usuario con ese Id'
            })
        }

        //Validar token y validar si el usuario es correcto
        
        //Update
        const { password, google, email, ...campos}  = req.body; // extraemos la contraseña y google porque no los voy a utilizar

        if( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.findOne({ email })

            if( existeEmail ) {
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }

        }


        if( !usuarioDB.google ) {
            campos.email = email;
        }else if ( usuarioDB.email !== email ) {
            return res.status(400).json({
                ok:false,
                msg: 'Usuarios de google no puden cambiar su correo'
            })
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true, useFindAndModify: false } );
        

        res.status(200).json({
            ok:true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }   
}


//-------Eliminar usuario------------------------------
const deleteUsuario = async (req, res = response) => {
    const uid = req.params.id;
    try {

        const usuarioDB =  await Usuario.findById( uid );

        if ( !usuarioDB )  { //Si existe un usuario en la base de datos
            return  res.status(400).json({
                ok:false,
                msg: 'No existe un usuario con ese Id'
            })
        }

        await Usuario.findByIdAndDelete( uid );

        res.status(500).json({
            ok:true,
            msg:'Usuario Eliminado'
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getUsuarios,
    createUsuario,
    actualizarUsuario,
    deleteUsuario
}