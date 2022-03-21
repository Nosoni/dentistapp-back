const controller = require("../controller/condiciones_pago")
const express = require('express')
const router = express.Router()

router.get(`/listar`, controller.listar)

module.exports = router;