var rolesModel = require("../models/inicializar_modelos").roles;
const { Op } = require("sequelize")

module.exports = {
  async filtrar(req, res) {
    try {
      const { rol } = req.params;
      const rolFiltrado = await rolesModel.findAll({
        where: {
          [Op.and]: {
            [Op.or]: {
              nombre: {
                [Op.substring]: rol,
              },
              descripcion: {
                [Op.substring]: rol,
              },
            },
            activo: true
          }
        },
        order: [
          ['nombre', 'ASC'],
        ],
      })

      return res.status(200).json({ datos: rolFiltrado })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listar(_, res) {
    try {
      const roles = await rolesModel.findAll({ where: { activo: true } });
      return res.status(200).json({ datos: roles })
    } catch (error) {
      return res.status(400).send({ mensaje: error.message })
    }
  },
}