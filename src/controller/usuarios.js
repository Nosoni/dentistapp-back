const models = require("../models/inicializar_modelos").usuarios;
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")

module.exports = {
  async crear(req, res) {
    const { usuario, password } = req.body;
    const userExists = await models.findAll({
      where: {
        usuario
      }
    })

    if (userExists.length > 0) {
      return res.status(409).send("Ya existe dicho usuario.")
    }

    const hash = await bcrypt.hash(password, 10);
    const userCreate = await models.create({
      usuario,
      password: hash
    })

    return res.status(200).json(userCreate)
  },
  async listar(_, res) {
    try {
      const list = await models.findAll({});
      return res.status(200).json(list)
    } catch (error) {
      return res.status(400).send("error")
    }
  },
  async filtrar(req, res) {
    try {
      const { usuario } = req.params;
      const usuariosFiltrados = await models.findAll({
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
}