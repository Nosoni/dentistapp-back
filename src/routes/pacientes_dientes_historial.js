const controller = require("../controller/pacientes_dientes_historial")
const express = require('express')
const router = express.Router()

router.get(`/getHistorialParaFacturar/:paciente_id`, controller.getHistorialParaFacturar)

module.exports = router;