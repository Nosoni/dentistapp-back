const presupuestoModel = require("../models/inicializar_modelos").presupuestos;
const facturaModel = require("../models/inicializar_modelos").facturas;
const presupuestoDetalleModel = require("../models/inicializar_modelos").presupuestos_detalle;
const facturaDetalleModel = require("../models/inicializar_modelos").facturas_detalle;
const pacienteModel = require("../models/inicializar_modelos").pacientes;
const impuestoModel = require("../models/inicializar_modelos").impuestos;
const estadoMovimientoModel = require("../models/inicializar_modelos").estados_movimientos;
const deudaModel = require("../models/inicializar_modelos").deudas;
const getEstadoInicialTabla = require('./estados_movimientos').getEstadoInicialTabla
const get_paciente_historialByID = require('./pacientes_dientes_historial').get_paciente_historialByID
const moment = require('moment')
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    try {
      const { cabecera, detalle } = req.body;

      const estado_inicial = await getEstadoInicialTabla('presupuestos')
      const estado_movimiento = await estadoMovimientoModel.findOne({
        where: {
          [Op.and]: {
            activo: true,
            tabla_id: 'presupuestos',
            estado_anterior_id: estado_inicial.id,
          }
        },
      })
      let total = 0;

      const presupuesto = await presupuestoModel.create({ ...cabecera, estado_presupuesto_id: estado_movimiento.id })
      const presupuesto_detalle = await Promise.all(detalle.map(
        async (det) => {
          total += det.precio
          return await presupuestoDetalleModel.create({ presupuesto_id: presupuesto.id, ...det })
        })
      )

      const retornar = { presupuesto, presupuesto_detalle }

      return res.status(200).json({ mensaje: "Presupuesto creado con éxito.", datos: retornar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async filtrar(req, res) {
    try {
      const { paciente_id, fecha_inicio, fecha_fin } = req.body

      let opciones = {}
      if (paciente_id) {
        opciones.paciente_id = paciente_id
      }
      if (fecha_inicio) {
        opciones.fecha = { [Op.gte]: moment(fecha_inicio).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) }
      }
      if (fecha_fin) {
        opciones.fecha = { [Op.lte]: moment(fecha_fin).set({ hour: 23, minute: 59, second: 59, millisecond: 59 }) }
      }

      let presupuestos = await presupuestoModel.findAll({
        include: { model: pacienteModel, as: "paciente", where: { activo: true } },
        where: {
          [Op.and]: {
            ...opciones,
            activo: true
          }
        }
      }).then(async presupuesto => {
        return await Promise.all(presupuesto.map(async presu => {
          let total = 0
          let presupuesto_detalle = await presupuestoDetalleModel.findAll({
            where: {
              [Op.and]: {
                presupuesto_id: presu.id,
                activo: true
              }
            }
          }).then(async detalle => {
            return Promise.all(await detalle.map(async det => {
              total += det.precio
              const historial = await get_paciente_historialByID(det.paciente_diente_historial_id)
              return {
                ...det.dataValues,
                historial: `${historial.tratamiento_servicio.nombre} - ${historial.tratamiento_servicio.descripcion}`,
              }
            }))
          })

          presu.dataValues.total = total
          return { ...presu.dataValues, presupuesto_detalle }
        }))
      })

      return res.status(200).json({ datos: presupuestos })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  }
}