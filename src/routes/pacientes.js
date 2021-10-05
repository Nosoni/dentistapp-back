const controller = require("../controller/pacientes")
const express = require('express')
const router = express.Router()

router.get(`/filtrar/:filtro`, controller.filtrar)
router.get(`/listar`, controller.listar)
router.post(`/crear`, controller.crear)
router.post(`/editar`, controller.editar)
router.post(`/eliminar/:id`, controller.eliminar)

module.exports = router;