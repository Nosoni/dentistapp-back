const controller = require("../controller/roles")
const express = require('express')
const router = express.Router()

router.get(`/filtrar/:rol`, controller.filtrar)
router.get(`/listar`, controller.listar)

module.exports = router;