const controller = require("../controller/impuestos")
const express = require('express')
const router = express.Router()

router.get(`/listar`, controller.listar)

module.exports = router;