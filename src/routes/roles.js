const controller = require("../controller/roles")
const express = require('express')
const router = express.Router()

router.get(`/filtrar/:rol`, controller.filtrar)
router.get(`/listar`, controller.listar)
router.post(`/crear`, controller.crear)
router.put(`/editar`, controller.editar)
router.put(`/eliminar/:id`, controller.eliminar)

module.exports = router;