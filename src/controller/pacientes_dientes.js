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
          model: pacienteDienteDetalleModel, as: "pacientes_dientes_detalles", where: { activo: true },
          include: { model: estadoMovimientoModel, as: "estado_detalle", where: { activo: true } }
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