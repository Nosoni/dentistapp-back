const controller = require("../controller/funcionarios")
const express = require('express')
const router = express.Router()

router.get(`/filtrar/:filtro`, controller.filtrar)
router.get(`/listar`, controller.listar)
router.post(`/crear`, controller.crear)

module.exports = router;