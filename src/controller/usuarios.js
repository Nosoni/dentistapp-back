const usuarioModel = require("../models/inicializar_modelos").usuarios;
const funcionarioModel = require("../models/inicializar_modelos").funcionarios;
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")

module.exports = {
  async crear(req, res) {
    const { usuario, password } = req.body;
    const userExists = await usuarioModel.findAll({
      where: {
        usuario
      }
    })

    if (userExists.length > 0) {
      return res.status(409).send("Ya existe dicho usuario.")
    }

    const hash = await bcrypt.hash(password, 10);
    const userCreate = await usuarioModel.create({
      usuario,
      password: hash
    })

    return res.status(200).json(userCreate)
  },
  async filtrar(req, res) {
    try {
      const { usuario } = req.params;
      const usuariosFiltrados = await usuarioModel.findAll({
        attributes: { exclude: ['password'] },
        include: [{ model: funcionarioModel, as: "funcionario" }],
        where: {
          usuario: {
            [Op.substring]: usuario,
          }
        }
      })

      return res.status(200).json(usuariosFiltrados)
    } catch (error) {
      return res.status(400).send("error")
    }
  },
  async listar(_, res) {
    try {
      const usuarioLista = await usuarioModel.findAll({
        include: [{ model: funcionarioModel, as: "funcionario" }]
      });
      return res.status(200).json(usuarioLista)
    } catch (error) {
      return res.status(400).send("error")
    }
  },
}