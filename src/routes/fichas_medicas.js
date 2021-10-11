const controller = require("../controller/fichas_medicas")
const express = require('express')
const router = express.Router()

router.get(`/filtrar/:paciente_id`, controller.filtrar)
router.post(`/crear`, controller.crear)
router.post(`/editar`, controller.editar)
router.post(`/eliminar/:paciente_id`, controller.eliminar)

module.exports = router;