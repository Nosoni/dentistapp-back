const estadoMovimientoModel = require("../models/inicializar_modelos").estados_movimientos;
const { Op } = require("sequelize")

module.exports = {
  async getEstadoInicialTabla(tabla_id) {
    return await estadoMovimientoModel.findOne({
      where: {
        [Op.and]: {
          activo: true,
          tabla_id,
          estado_anterior_id: null
        }
      },
    })
  },
  async getEstadosByActual(tabla_id, estado_actual) {
    return await estadoMovimientoModel.findAll({
      where: {
        [Op.and]: {
          activo: true,
          tabla_id,
          estado_actual
        }
      },
    })
  },
  async filtrar(req, res) {
    try {
      const { tabla_id, estado_anterior_id } = req.body;
      if (!tabla_id || !estado_anterior_id) {
        return res.status(500).send({ mensaje: 'Verificar solicitud. Dato requerido no válido.' })
      }
      const estadoMovimmientoFiltrados = await estadoMovimientoModel.findAll({
        where: {
          [Op.and]: {
            activo: true,
            tabla_id,
            estado_anterior_id,
          }
        },
      })

      return res.status(200).json({ datos: estadoMovimmientoFiltrados })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listarTablaGrouping(req, res) {
    try {
      const { tabla_id } = req.params;
      const estados_movimientos_listar = await estadoMovimientoModel.findAll({
        attributes: ['estado_actual'],
        where: {
          [Op.and]: {
            activo: true,
            tabla_id,
          }
        },
        group: 'estado_actual'
      })

      return res.status(200).json({ datos: estados_movimientos_listar })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listarTabla(req, res) {
    try {
      const { tabla_id } = req.params;
      const estados_movimientos_listar = await estadoMovimientoModel.findAll({
        where: {
          [Op.and]: {
            activo: true,
            tabla_id,
          }
        },
      })

      return res.status(200).json({ datos: estados_movimientos_listar })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  }
}