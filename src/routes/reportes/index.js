const express = require('express')
const router = express.Router()
const administracion = require('./administracion')

router.use("/administracion", administracion)

module.exports = router;