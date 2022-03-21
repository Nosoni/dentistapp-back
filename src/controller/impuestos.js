var impuestosModel = require("../models/inicializar_modelos").impuestos;

module.exports = {
  async listar(_, res) {
    try {
      const impuestos = await impuestosModel.findAll({ where: { activo: true } });
      return res.status(200).json({ datos: impuestos })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
}