const express = require('express')
//#region routes
const doctores = require('./doctores')
const fichas_medicas = require('./fichas_medicas')
const funcionarios = require('./funcionarios')
const pacientes = require('./pacientes')
const permisos = require('./permisos')
const roles = require('./roles')
const roles_permisos = require('./roles_permisos')
const tipos_documentos = require('./tipos_documentos')
const usuarios = require('./usuarios')
const usuarios_roles = require('./usuarios_roles')
//#endregion routes
const router = express.Router()
const jwt = require("jsonwebtoken")
const definiciones = require('../constantes')

router.all("*", requiereAutenticacion)
router.use("/doctores", doctores)
router.use("/fichas_medicas", fichas_medicas)
router.use("/funcionarios", funcionarios)
router.use("/pacientes", pacientes)
router.use("/permisos", permisos)
router.use("/roles", roles)
router.use("/roles_permisos", roles_permisos)
router.use("/tipos_documentos", tipos_documentos)
router.use("/usuarios", usuarios)
router.use("/usuarios_roles", usuarios_roles)

async function requiereAutenticacion(req, res, next) {
  try {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
      return res.status(500).send({ mensaje: "Error de autenticación." })
    }

    const token = bearerHeader.split(' ')[1]

    await jwt.verify(token, req.app.get(definiciones.llave_secreta), (err, decoded) => {
      if (err) {
        return res.status(500).send({ mensaje: "Token expirado.", authenticated: false })
      }
      req.decoded = decoded
      return next()
    })
  } catch (error) {
    return res.status(500).send("Error de autenticación")
  }
}

module.exports = router;