const express = require('express')
const usuarios = require('./usuarios')
const router = express.Router()
const jwt = require("jsonwebtoken")
const definiciones = require('../constantes')

router.all("*", requiereAutenticacion)
router.use("/usuarios", usuarios)

async function requiereAutenticacion(req, res, next) {
  try {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
      return res.status(500).send("Error de autenticación")
    }

    const token = bearerHeader.split(' ')[1]

    await jwt.verify(token, req.app.get(definiciones.llave_secreta), (err, decoded) => {
      if (err) {
        return res.status(500).send("Token expirado.")
      }
      req.decoded = decoded
      return next()
    })
  } catch (error) {
    return res.status(500).send("Error de autenticación")
  }
}

module.exports = router;