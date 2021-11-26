const dienteModel = require("../models/inicializar_modelos").dientes;
const { Op } = require("sequelize")

module.exports = {
  async listar(req, res) {
    try {
      const dientes = await dienteModel.findAll({
        where: {
          activo: true
        }
      })
      return res.status(200).json({ datos: dientes })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  }
}