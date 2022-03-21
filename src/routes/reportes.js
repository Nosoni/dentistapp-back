const express = require('express')
const router = express.Router()
const cobranzas = require('../reportes/cobranzas')
const estado_cuentas = require('../reportes/estado_cuentas')
const facturacion = require('../reportes/facturas')
const inventario = require('../reportes/inventario')
const pacientes = require('../reportes/pacientes')
const presupuestos = require('../reportes/presupuestos')
const usuarios = require('../reportes/usuarios')

router.use("/cobranzas", cobranzas)
router.use("/estado-cuentas", estado_cuentas)
router.use("/facturacion", facturacion)
router.use("/inventario", inventario)
router.use("/pacientes", pacientes)
router.use("/presupuestos", presupuestos)
router.use("/usuarios", usuarios)

module.exports = router;
