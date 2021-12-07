const express = require('express')
const router = express.Router()
const facturacion = require('../reportes/facturacion')
const usuarios = require('../reportes/usuarios')
const pacientes = require('../reportes/pacientes')

router.use("/facturacion", facturacion)
router.use("/usuarios", usuarios)
router.use("/pacientes", pacientes)

module.exports = router;
