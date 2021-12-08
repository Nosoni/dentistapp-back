const stockActualizarModel = require("../models/inicializar_modelos").stock_actualizar;
const stockActualizarDetalleModel = require("../models/inicializar_modelos").stock_actualizar_detalle;
const estadoMovimientoModel = require("../models/inicializar_modelos").estados_movimientos;
const insumoModel = require("../models/inicializar_modelos").insumos;
const tipoMovimientoStockModel = require("../models/inicializar_modelos").tipos_movimientos_stock;
const stockInsumoMovimientoModel = require("../models/inicializar_modelos").stock_insumos_movimientos;
const getEstadoInicialTabla = require('./estados_movimientos').getEstadoInicialTabla
const moment = require('moment')
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    try {
      const { cabecera, detalle } = req.body;

      if (!cabecera || detalle.detalle.length == 0) {
        return res.status(500).json({ mensaje: 'La actualización de stock cuenta con todos los campos. Favor verificar.' })
      }

      const estado_inicial = await getEstadoInicialTabla('actualizar_stock')
      const estado_movimiento = await estadoMovimientoModel.findOne({
        where: {
          [Op.and]: {
            activo: true,
            tabla_id: 'actualizar_stock',
            estado_anterior_id: estado_inicial.id,
          }
        },
      })

      const tipo_movimiento = await tipoMovimientoStockModel.findOne({ where: { activo: true, id: cabecera.tipo_movimiento_id } })
      const stock_actualizar = await stockActualizarModel.create({ ...cabecera, estado_movimiento_id: estado_movimiento.id })
      const stock_actualizar_detalle = await Promise.all(detalle.map(
        async (det) => {

          const new_detalle = await stockActualizarDetalleModel.create({ stock_actualizar_id: stock_actualizar.id, ...det })
          await stockInsumoMovimientoModel.create({
            insumo_id: det.insumo_id,
            stock_actualizar_id: stock_actualizar.id,
            stock_actualizar_detalle_id: new_detalle.id,
            cantidad: det.cantidad * tipo_movimiento.signo,
            fecha_insercion: moment(),
            fecha_movimiento: stock_actualizar.fecha
          })

          return new_detalle
        })
      )

      const retornar = { stock_actualizar, stock_actualizar_detalle }

      return res.status(200).json({ mensaje: "Stock movimiento creado con éxito.", datos: retornar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async filtrar(req, res) {
    try {
      const { tipo_movimiento_id, comprobante, fecha_inicio, fecha_fin } = req.body

      let opciones = {}
      if (tipo_movimiento_id) {
        opciones.tipo_movimiento_id = tipo_movimiento_id
      }
      if (comprobante) {
        opciones.comprobante = comprobante
      }
      if (fecha_inicio) {
        opciones.fecha = { [Op.gte]: moment(fecha_inicio).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) }
      }
      if (fecha_fin) {
        opciones.fecha = { [Op.lte]: moment(fecha_fin).set({ hour: 23, minute: 59, second: 59, millisecond: 59 }) }
      }

      let stock_actualizar = await stockActualizarModel.findAll({
        where: {
          [Op.and]: {
            ...opciones,
            activo: true
          }
        }
      }).then(async stock_actualizar => {
        return await Promise.all(stock_actualizar.map(async stock_act => {
          let stock_actualizar_detalle = await stockActualizarDetalleModel.findAll({
            include: { model: insumoModel, as: "insumo", where: { activo: true } },
            where: {
              [Op.and]: {
                stock_actualizar_id: stock_act.id,
                activo: true
              }
            }
          }).then(async detalle => {
            return Promise.all(await detalle.map(async det => {
              return {
                ...det.dataValues,
                insumo: `${det.insumo.nombre} - ${det.insumo.descripcion}`,
              }
            }))
          })

          return { ...stock_act.dataValues, stock_actualizar_detalle }
        }))
      })

      return res.status(200).json({ datos: stock_actualizar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  }
}