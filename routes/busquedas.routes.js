/*  
    Buesqueda en toda la api
    ruta: api/totdo
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas.controller')  

const router = new Router();    

//Listar 
router.get( '/:busqueda', validarJWT, getTodo );
router.get( '/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion );

module.exports = router;

