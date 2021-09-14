const controller = require("../controller/roles")
const express = require('express')
const router = express.Router()

router.get(`/filtrar/:rol`, controller.filtrar)
router.get(`/listar`, controller.listar)
router.post(`/crear`, controller.crear)
router.post(`/editar`, controller.editar)
router.post(`/eliminar/:id`, controller.eliminar)

module.exports = router;