const facturaModel = require("../models/inicializar_modelos").facturas;
const cobranzaModel = require("../models/inicializar_modelos").cobranzas;
const cobranzaDetalleModel = require("../models/inicializar_modelos").cobranzas_detalle;
const pacienteModel = require("../models/inicializar_modelos").pacientes;
const estadoMovimientoModel = require("../models/inicializar_modelos").estados_movimientos;
const deudaModel = require("../models/inicializar_modelos").deudas;
const deudaDetalleModel = require("../models/inicializar_modelos").deudas_detalle;
const getEstadoInicialTabla = require('./estados_movimientos').getEstadoInicialTabla
const moment = require('moment')
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    try {
      const { cabecera, detalle } = req.body;

      if (!cabecera || detalle.length == 0) {
        return res.status(500).json({ mensaje: 'La cobranza no cuenta con todos los campos. Favor verificar.' })
      }

      const estado_inicial = await getEstadoInicialTabla('cobranzas')
      const estado_movimiento = await estadoMovimientoModel.findOne({
        where: {
          [Op.and]: {
            activo: true,
            tabla_id: 'cobranzas',
            estado_anterior_id: estado_inicial.id,
          }
        },
      })

      const cobranza = await cobranzaModel.create({ ...cabecera, estado_cobranza_id: estado_movimiento.id })
      const cobranza_detalle = await Promise.all(detalle.map(
        async (det) => {
          let cobrDet = await cobranzaDetalleModel.create({ cobranza_id: cobranza.id, ...det })
          await deudaDetalleModel.create({ deuda_id: det.deuda_id, fecha_insercion: moment(), cobranza_detalle_id: cobrDet.id, debe: 0, haber: det.monto })
          await deudaModel.update({ haber: det.monto }, { where: { id: det.deuda_id } })
          return cobrDet
        })
      )

      const retornar = { cobranza, cobranza_detalle }

      return res.status(200).json({ mensaje: "Cobranza creada con éxito.", datos: retornar })
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

      let cobranzas = await cobranzaModel.findAll({
        include: { model: pacienteModel, as: "paciente", where: { activo: true } },
        where: {
          [Op.and]: {
            ...opciones,
            activo: true
          }
        }
      }).then(async cobranza => {
        return await Promise.all(cobranza.map(async cobra => {
          let total = 0
          let cobranza_detalle = await cobranzaDetalleModel.findAll({
            include: {
              model: deudaModel, as: "deuda", where: { activo: true },
              include: { model: facturaModel, as: "factura", where: { activo: true } },
            },
            where: {
              [Op.and]: {
                cobranza_id: cobra.id,
                activo: true
              }
            }
          }).then(async detalle => {
            return Promise.all(await detalle.map(async det => {
              total += det.monto
              return {
                ...det.dataValues,
                deuda_id: det.deuda.id,
                deuda: det.deuda.factura.comprobante,
              }
            }))
          })

          cobra.dataValues.total = total
          return { ...cobra.dataValues, cobranza_detalle }
        }))
      })

      return res.status(200).json({ datos: cobranzas })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async reporteCobranzas(filtro) {
    try {
      const { paciente_id, fecha_inicio, fecha_fin } = filtro

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

      let cobranzas = await cobranzaModel.findAll({
        include: { model: pacienteModel, as: "paciente", where: { activo: true } },
        where: {
          [Op.and]: {
            ...opciones,
            activo: true
          }
        }
      }).then(async cobranza => {
        return await Promise.all(cobranza.map(async cobra => {
          let total = 0
          let cobranza_detalle = await cobranzaDetalleModel.findAll({
            include: {
              model: deudaModel, as: "deuda", where: { activo: true },
              include: { model: facturaModel, as: "factura", where: { activo: true } },
            },
            where: {
              [Op.and]: {
                cobranza_id: cobra.id,
                activo: true
              }
            }
          }).then(async detalle => {
            return Promise.all(await detalle.map(async det => {
              total += det.monto
              return {
                ...det.dataValues,
                deuda_id: det.deuda.id,
                deuda: det.deuda.factura.comprobante,
              }
            }))
          })

          cobra.dataValues.total = total
          return { ...cobra.dataValues, cobranza_detalle }
        }))
      })

      return cobranzas
    } catch (error) {
      console.log(error)
    }
  }
}