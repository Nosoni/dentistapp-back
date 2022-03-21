const controller = require("../controller/pacientes_dientes")
const express = require('express')
const router = express.Router()

router.post(`/filtrar`, controller.filtrar)

module.exports = router;