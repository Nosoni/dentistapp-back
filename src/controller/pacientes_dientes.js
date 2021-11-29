const pacienteDienteModel = require("../models/inicializar_modelos").pacientes_dientes;
const pacienteDienteDetalleModel = require("../models/inicializar_modelos").pacientes_dientes_detalle;
const estadoMovimientoModel = require("../models/inicializar_modelos").estados_movimientos;
const dienteModel = require("../models/inicializar_modelos").dientes;
const { Op } = require("sequelize")

module.exports = {
  async get_paciente_dientes(paciente_id) {
    const paciente_diente = await pacienteDienteModel.findAll({
      include: [
        {
          model: pacienteDienteDetalleModel, as: "pacientes_dientes_detalles", where: { activo: true }, attributes: ['cara', 'estado_detalle_id'],
          include: { model: estadoMovimientoModel, as: "estado_detalle", where: { activo: true }, attributes: ['estado_actual'] }
        },
        { model: dienteModel, as: "diente", where: { activo: true } }
      ],
      where: {
        [Op.and]: {
          paciente_id,
          activo: true
        }
      },
    })
    return paciente_diente
  },
  async delete_paciente_dientes(paciente_id) {
    try {
      await pacienteDienteModel.update({ activo: false }, {
        where: {
          paciente_id,
          activo: false
        }
      })
    } catch (error) {
      throw error;
    }
  },
  async create_paciente_dientes(paciente_id) {
    const dientes = await dienteModel.findAll({ where: { activo: true } })
    const estado_actual = await estadoMovimientoModel.findOne({
      where: {
        [Op.and]:
          { tabla_id: 'pacientes_dientes_detalle', estado_actual: 'Normal' }
      }
    })
    Promise.all(dientes.map(async diente => {
      const paciente_diente = await pacienteDienteModel.create({ paciente_id, diente_id: diente.id })
      for (let index = 0; index < diente.cantidad_caras; index++) {
        await pacienteDienteDetalleModel.create({ paciente_diente_id: paciente_diente.id, estado_detalle_id: estado_actual.id, cara: index + 1 })
      }
    }))
  },
  async filtrar(req, res) {
    try {
      const { paciente_id } = req.body
      const paciente_diente = await pacienteDienteModel.findAll({
        where: {
          paciente_id,
          activo: true,
        }
      })
      return res.status(200).json({ datos: paciente_diente })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  }
}