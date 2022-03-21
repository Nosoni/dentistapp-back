const controller = require("../controller/facturas")
const express = require('express')
const router = express.Router()

router.post(`/crear`, controller.crear)
router.post(`/filtrar`, controller.filtrar)

module.exports = router;