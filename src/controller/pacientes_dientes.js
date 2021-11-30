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
  async update_paciente_dientes(paciente_dientes) {
    //paciente_dientes es la tabla pacientes_dientes
    //dientes.pacientes_dientes_detalles es el detalle de paciente_dientes
    Promise.all(paciente_dientes.map(async dientes => {
      const { pacientes_dientes_detalles } = dientes
      pacientes_dientes_detalles.map(async detalle => {
        //obtener el detalle por cara
        const det_original = await pacienteDienteDetalleModel.findOne({
          where: {
            [Op.and]: {
              paciente_diente_id: dientes.id,
              cara: detalle.cara,
              activo: true
            }
          }
        })
        //verificar que estado del detalle del diente haya variado
        if (det_original.estado_detalle_id !== detalle.estado_detalle_id) {
          await pacienteDienteDetalleModel.create({
            paciente_diente_id: det_original.paciente_diente_id,
            estado_detalle_id: detalle.estado_detalle_id,
            cara: detalle.cara
          })
          await det_original.update({ activo: false })
        }
      })
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