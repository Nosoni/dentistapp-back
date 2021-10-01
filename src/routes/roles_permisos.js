const controller = require("../controller/roles_permisos")
const express = require('express')
const router = express.Router()

router.get(`/filtrar/:rol_id`, controller.filtrar)
router.get(`/obtenerPermisosRol/:rol_id`, controller.obtenerPermisosDelRol)

module.exports = router;