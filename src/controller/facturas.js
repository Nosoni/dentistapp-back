const facturaModel = require("../models/inicializar_modelos").facturas;
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

      const estado_inicial = await getEstadoInicialTabla('facturas')
      console.log("estado inicial", estado_inicial)
      console.log("estado inicial", estado_inicial.id)
      const estado_movimiento = await estadoMovimientoModel.findOne({
        where: {
          [Op.and]: {
            activo: true,
            tabla_id: 'facturas',
            estado_anterior_id: estado_inicial.id,
          }
        },
      })
      let total = 0;
      console.log("estado final", estado_movimiento)

      const factura = await facturaModel.create({ ...cabecera, estado_factura_id: estado_movimiento.id })
      console.log("factura")
      const factura_detalle = await Promise.all(detalle.map(
        async (det) => {
          total += det.precio
          let factDet = await facturaDetalleModel.create({ factura_id: factura.id, ...det })
          //actualizar historial
          return factDet
        })
      )
      console.log("detalle")

      await deudaModel.create({
        factura_id: factura.id,
        fecha_insercion: moment(),
        fecha_vencimiento: moment(),
        cuota_numero: 1,
        debe: total,
        haber: 0
      })
      console.log("deuda")
      const retornar = { factura, factura_detalle }

      return res.status(200).json({ mensaje: "Factura creada con éxito.", datos: retornar })
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

      let facturas = await facturaModel.findAll({
        include: { model: pacienteModel, as: "paciente", where: { activo: true } },
        where: {
          [Op.and]: {
            ...opciones,
            activo: true
          }
        }
      }).then(async factura => {
        return await Promise.all(factura.map(async fact => {
          let total = 0
          let factura_detalle = await facturaDetalleModel.findAll({
            include: { model: impuestoModel, as: "impuesto", where: { activo: true } },
            where: {
              [Op.and]: {
                factura_id: fact.id,
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
                impuesto: det.impuesto.codigo
              }
            }))
          })

          fact.dataValues.total = total
          return { ...fact.dataValues, factura_detalle }
        }))
      })

      return res.status(200).json({ datos: facturas })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  }
}