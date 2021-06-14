/*  
    Medicos
    ruta: api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
   getMedicos,
   crearMedico,
   actualizarMedico,
   borrarMedico
} = require('../controllers/medicos.controller')

const router = new Router();    

//Listar 
router.get( '/', getMedicos);

//crear
router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearMedico 
);

//Actualizar
router.put( '/:id', [ 
    validarJWT,
    check('nombre','El nombre del medico  es necesario').not().isEmpty(),
    check('hospital','El hospital id deve de ser válido').isMongoId(),
    validarCampos
],
actualizarMedico);

//Eliminar
router.delete( '/:id', borrarMedico );

module.exports = router;