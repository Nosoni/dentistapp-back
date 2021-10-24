const controller = require("../controller/doctores_especialidades")
const express = require('express')
const router = express.Router()

router.get(`/obtenerEspecialidadDoctor/:doctor_id`, controller.obtenerEspecialidadDoctor)

module.exports = router;