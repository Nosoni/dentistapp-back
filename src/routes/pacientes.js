const controller = require("../controller/pacientes")
const express = require('express')
const router = express.Router()

router.get(`/filtrar/:filtro`, controller.filtrar)
router.get(`/listar`, controller.listar)
router.get(`/listarPacientes`, controller.listarPacientes)
router.post(`/crear`, controller.crear)
router.put(`/editar`, controller.editar)
router.put(`/eliminar/:id`, controller.eliminar)

module.exports = router;