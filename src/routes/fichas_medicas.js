const controller = require("../controller/fichas_medicas")
const express = require('express')
const router = express.Router()

router.post(`/crear`, controller.crear)
router.put(`/editar`, controller.editar)

module.exports = router;