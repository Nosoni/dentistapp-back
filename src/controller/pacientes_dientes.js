const pacienteDienteModel = require("../models/inicializar_modelos").pacientes_dientes;
const { Op } = require("sequelize")

module.exports = {
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