/*  
    Hospitales
    ruta: /api/hospitales
*/

 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validarCampos } = require('../middlewares/validar-campos');
 
 const { validarJWT } = require('../middlewares/validar-jwt');

 const {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
 } = require('../controllers/hospitales.controller')
 
 const router = new Router();    
 
 //Listar 
 router.get( '/', getHospitales);

//crear
 router.post( '/', [
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos 
 ], createHospital);
 
 //Actualizar
 router.put( '/:id', [ 

 ],
 updateHospital);
 
 //Eliminar
 router.delete( '/:id', deleteHospital );
 
 module.exports = router;