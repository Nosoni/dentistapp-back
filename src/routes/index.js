const express = require('express')
const usuarios = require('./usuarios')
const router = express.Router()
const jwt = require("jsonwebtoken")

router.all("*", requiereAutenticacion)
router.use("/usuarios", usuarios)

async function requiereAutenticacion(req, res, next) {
  try {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
      return res.status(500).send("Error de autenticación")
    }

    const token = bearerHeader.split(' ')[1]

    const autenticacion = await jwt.verify(token, req.app.get("llaveSecreta"));

    return next()
  } catch (error) {
    return res.status(500).send("Error de autenticación")
  }
}

module.exports = router;