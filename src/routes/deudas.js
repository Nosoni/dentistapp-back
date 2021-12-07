const controller = require("../controller/deudas")
const express = require('express')
const router = express.Router()

router.get(`/filtrar/:paciente_id`, controller.filtrar)

module.exports = router;