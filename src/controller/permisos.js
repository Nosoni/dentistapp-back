var permisosModels = require("../models/inicializar_modelos").permisos;

module.exports = {
  async listar(_, res) {
    try {
      const permisos = await permisosModels.findAll({ where: { activo: true } });
      return res.status(200).json({ datos: permisos })
    } catch (error) {
      return res.status(400).send({ mensaje: error.message })
    }
  },
}