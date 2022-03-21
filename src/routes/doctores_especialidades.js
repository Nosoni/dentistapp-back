const controller = require("../controller/doctores_especialidades")
const express = require('express')
const router = express.Router()

router.get(`/obtenerEspecialidadesDoctor/:doctor_id`, controller.obtenerEspecialidadesDoctor)

module.exports = router;