const controller = require("../controller/citas_medicas")
const express = require('express')
const router = express.Router()

router.get(`/listar`, controller.listar)
router.post(`/crear`, controller.crear)
router.post(`/filtrar`, controller.filtrar)
router.put(`/editar`, controller.editar)
router.put(`/eliminar/:id`, controller.eliminar)

module.exports = router;