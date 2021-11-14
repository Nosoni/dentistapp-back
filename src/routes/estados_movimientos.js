const controller = require("../controller/estados_movimientos")
const express = require('express')
const router = express.Router()

router.get(`/listarTabla/:tabla_id`, controller.listarTabla)
router.post(`/filtrar/`, controller.filtrar)

module.exports = router;