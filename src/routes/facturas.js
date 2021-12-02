const controller = require("../controller/facturas")
const express = require('express')
const router = express.Router()

router.post(`/crear`, controller.crear)

module.exports = router;