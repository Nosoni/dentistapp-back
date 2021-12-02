var condicionesPagoModel = require("../models/inicializar_modelos").condiciones_pago;
const { Op } = require("sequelize")

module.exports = {
  async listar(req, res) {
    try {
      const condiciones_pago = await condicionesPagoModel.findAll({ where: { activo: true } });
      return res.status(200).json({ datos: condiciones_pago })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  }
}