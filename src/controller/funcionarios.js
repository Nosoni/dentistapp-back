const funcionarioModel = require("../models/inicializar_modelos").funcionarios;
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    return res.status(200)
  },
  async filtrar(req, res) {
    try {
      const { funcionario } = req.params;
      const funcionariosFiltrados = await funcionarioModel.findAll({
        where: {
          [Op.and]: {
            [Op.or]: {
              documento: funcionario,
              nombres: funcionario,
              apellidos: funcionario
            },
            activo
          }
        }
      })

      return res.status(200).json(funcionariosFiltrados)
    } catch (error) {
      return res.status(400).send("error")
    }
  },
  async listar(_, res) {
    try {
      const funcionarioLista = await funcionarioModel.findAll({});
      return res.status(200).json(funcionarioLista)
    } catch (error) {
      return res.status(400).send("error")
    }
  },
}