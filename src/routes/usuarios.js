const controller = require("../controller/usuarios")
const express = require('express')
const router = express.Router()

router.get(`/filtrar/:usuario`, controller.filtrar)
router.get(`/listar`, controller.listar)
router.post(`/crear`, controller.crear)
router.post(`/editar`, controller.editar)

module.exports = router;