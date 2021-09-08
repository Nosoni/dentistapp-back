var tiposDocumentosModel = require("../models/inicializar_modelos").tipos_documentos;

module.exports = {
  async listar(_, res) {
    try {
      const tipos_documentos = await tiposDocumentosModel.findAll({}, { where: { activo: true } });
      return res.status(200).json({ datos: tipos_documentos })
    } catch (error) {
      return res.status(400).send({ mensaje: error.message })
    }
  },
}