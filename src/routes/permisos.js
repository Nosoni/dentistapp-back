const express = require("express")
const router = express.Router()
const controller = require("../controller/permisos")

router.get(`/listar`, controller.listar)

module.exports = router;