const controller = require("../controller/tipos_documentos")
const express = require('express')
const router = express.Router()

router.get(`/listar`, controller.listar)

module.exports = router;