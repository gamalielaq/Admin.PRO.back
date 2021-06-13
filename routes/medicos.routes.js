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
   createMedico,
   updateMedico,
   deleteMedico
} = require('../controllers/medicos.controller')

const router = new Router();    

//Listar 
router.get( '/', getMedicos);

//crear
router.post( '/', [
    validarJWT,
    check('nombre','El nombre del medico  es necesario').not().isEmpty(),
    check('hospital','El hospital id deve de ser valido').not().isMongoId(),
    validarCampos 
], createMedico);

//Actualizar
router.put( '/:id', [ 

],
updateMedico);

//Eliminar
router.delete( '/:id', deleteMedico );

module.exports = router;