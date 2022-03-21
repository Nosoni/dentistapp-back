const controller = require("../controller/pacientes_dientes_historial")
const express = require('express')
const router = express.Router()

router.get(`/getHistorialInicial/:paciente_id`, controller.getHistorialInicial)
router.get(`/getHistorialFacturar/:paciente_id`, controller.getHistorialFacturar)

module.exports = router;