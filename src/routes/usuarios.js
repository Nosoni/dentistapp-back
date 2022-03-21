const controller = require("../controller/usuarios")
const express = require('express')
const router = express.Router()

router.get(`/filtrar/:usuario`, controller.filtrar)
router.get(`/listar`, controller.listar)
router.post(`/crear`, controller.crear)
router.put(`/editar`, controller.editar)
router.put(`/eliminar/:id`, controller.eliminar)

module.exports = router;