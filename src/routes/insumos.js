const controller = require("../controller/insumos")
const express = require('express')
const router = express.Router()

router.get(`/filtrar/:filtro`, controller.filtrar)
router.get(`/stockBajo`, controller.stockBajo)
router.get(`/listar`, controller.listar)
router.post(`/crear`, controller.crear)
router.put(`/editar`, controller.editar)
router.put(`/eliminar/:id`, controller.eliminar)

module.exports = router;