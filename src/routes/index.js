const express = require('express')
//#region routes
const citas_medicas = require('./citas_medicas')
const cobranzas = require('./cobranzas')
const condiciones_pago = require('./condiciones_pago')
const deudas = require('./deudas')
const doctores_especialidades = require('./doctores_especialidades')
const doctores = require('./doctores')
const especialidades = require('./especialidades')
const estados_movimientos = require('./estados_movimientos')
const facturas = require('./facturas')
const fichas_medicas = require('./fichas_medicas')
const funcionarios = require('./funcionarios')
const impuestos = require('./impuestos')
const insumos = require('./insumos')
const pacientes = require('./pacientes')
const pacientes_dientes = require('./pacientes_dientes')
const pacientes_dientes_historial = require('./pacientes_dientes_historial')
const permisos = require('./permisos')
const presupuestos = require('./presupuestos')
const roles = require('./roles')
const roles_permisos = require('./roles_permisos')
const stock_actualizar = require('./stock_actualizar')
const tipos_documentos = require('./tipos_documentos')
const tipos_movimientos_stock = require('./tipos_movimientos_stock')
const tratamientos_servicios = require('./tratamientos_servicios')
const usuarios = require('./usuarios')
const usuarios_roles = require('./usuarios_roles')
const reportes = require('./reportes')
//#endregion routes
const router = express.Router()
const jwt = require("jsonwebtoken")
const definiciones = require('../constantes')

router.all("*", requiereAutenticacion)
router.use("/citas_medicas", citas_medicas)
router.use("/cobranzas", cobranzas)
router.use("/condiciones_pago", condiciones_pago)
router.use("/deudas", deudas)
router.use("/doctores_especialidades", doctores_especialidades)
router.use("/doctores", doctores)
router.use("/especialidades", especialidades)
router.use("/estados_movimientos", estados_movimientos)
router.use("/facturas", facturas)
router.use("/fichas_medicas", fichas_medicas)
router.use("/funcionarios", funcionarios)
router.use("/impuestos", impuestos)
router.use("/insumos", insumos)
router.use("/pacientes", pacientes)
router.use("/pacientes_dientes", pacientes_dientes)
router.use("/pacientes_dientes_historial", pacientes_dientes_historial)
router.use("/permisos", permisos)
router.use("/presupuestos", presupuestos)
router.use("/reportes", reportes)
router.use("/roles", roles)
router.use("/roles_permisos", roles_permisos)
router.use("/stock_actualizar", stock_actualizar)
router.use("/tipos_documentos", tipos_documentos)
router.use("/tipos_movimientos_stock", tipos_movimientos_stock)
router.use("/tratamientos_servicios", tratamientos_servicios)
router.use("/usuarios", usuarios)
router.use("/usuarios_roles", usuarios_roles)

async function requiereAutenticacion(req, res, next) {
  try {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
      return res.status(500).send({ mensaje: "Error de autenticaci??n." })
    }

    const token = bearerHeader.split(' ')[1]

    await jwt.verify(token, req.app.get(definiciones.llave_secreta), (err, decoded) => {
      if (err) {
        return res.status(500).send({ mensaje: "Token expirado.", authenticated: false })
      }
      req.user_login_id = jwt.decode(token).id;
      req.decoded = decoded
      return next()
    })
  } catch (error) {
    return res.status(500).send("Error de autenticaci??n")
  }
}

module.exports = router;