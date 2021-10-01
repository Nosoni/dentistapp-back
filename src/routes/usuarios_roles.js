const controller = require("../controller/usuarios_roles")
const express = require('express')
const router = express.Router()

router.get(`/obtenerRolesDelUsuario/:usuario_id`, controller.obtenerRolesDelUsuario)

module.exports = router;