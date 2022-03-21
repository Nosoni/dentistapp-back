const publicas = require("../controller/publicas")
//const usuarios = require("../controller/usuarios")
const express = require('express')
const router = express.Router()

router.post(`/login`, publicas.login)
//router.post(`/crear`, usuarios.crear)

module.exports = router;