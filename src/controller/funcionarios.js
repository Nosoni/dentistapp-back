const funcionarioModel = require("../models/inicializar_modelos").funcionarios;
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    return res.status(200)
  },
  async filtrar(req, res) {
    try {
      const { filtro } = req.params;
      const funcionariosFiltrados = await funcionarioModel.findAll({
        where: {
          [Op.and]: {
            [Op.or]: {
              documento: filtro,
              nombres: filtro,
              apellidos: filtro
            },
            activo: true
          }
        }
      })

      return res.status(200).json({ datos: funcionariosFiltrados })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listar(_, res) {
    try {
      const funcionarioLista = await funcionarioModel.findAll({}, { where: { activo: true } });
      return res.status(200).json({ datos: funcionarioLista })
    } catch (error) {
      return res.status(400).send({ mensaje: error.message })
    }
  },
}