/**
 * Ruta : /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, createUsuario, actualizarUsuario, deleteUsuario } = require('../controllers/usuarios.controller');
const { validarJWT, validarAdminRol, validarAdminRolMismoUsuaio } = require('../middlewares/validar-jwt');

const router = new Router();

router.get('/', validarJWT, getUsuarios);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
], createUsuario);

router.put('/:id', [
        validarJWT,
        validarAdminRolMismoUsuaio,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario);


router.delete('/:id', [validarJWT, validarAdminRol], deleteUsuario);

module.exports = router;