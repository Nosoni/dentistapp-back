const controller = require("../controller/pacientes_dientes_historial")
const express = require('express')
const router = express.Router()

router.get(`/getHistorialInicial/:paciente_id`, controller.getHistorialInicial)

module.exports = router;