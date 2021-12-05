const express = require('express')
const router = express.Router()
const facturacion = require('../reportes/facturacion')

router.use("/facturacion", facturacion)

module.exports = router;
