const controller = require("../controller/especialidades")
const express = require('express')
const router = express.Router()

router.get(`/filtrar/:filtro`, controller.filtrar)
router.get(`/listar`, controller.listar)
router.post(`/crear`, controller.crear)
router.put(`/editar`, controller.editar)
router.put(`/eliminar/:id`, controller.eliminar)

module.exports = router;