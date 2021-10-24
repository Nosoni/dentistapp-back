const especialidadModel = require("../models/inicializar_modelos").especialidades;

module.exports = {
  async listar(_, res) {
    try {
      const especialidades = await especialidadModel.findAll({
        where: {
          activo: true
        }
      })
      return res.status(200).json({ datos: especialidades })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  }
}
