const usuarioModel = require("../models/inicializar_modelos").usuarios;
const funcionarioModel = require("../models/inicializar_modelos").funcionarios;
const { Op, where } = require("sequelize")
const bcrypt = require("bcrypt")
const definiciones = require('../constantes/index')

module.exports = {
  async crear(req, res) {
    const { usuario, password, confirmar } = req.body;
    if (password !== confirmar) {
      return res.status(409).send("La validación de contraseña no es correcta.")
    }
    if (password.length < definiciones.longitudPass) {
      return res.status(409).send("Logitud de contraseña inválida.")
    }
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
  async editar(req, res) {
    const userExists = await usuarioModel.findOne({
      where: {
        [Op.and]: {
          id: req.body.id,
          activo: true
        }
      }
    })

    if (userExists.length == 0) {
      return res.status(409).send("No existe el usuario a editar.")
    }

    const usuarioEditado = await userExists.update({ ...req.body })

    return res.status(200).json(usuarioEditado)
  },
  async filtrar(req, res) {
    try {
      const { usuario } = req.params;
      const usuariosFiltrados = await usuarioModel.findAll({
        attributes: { exclude: ['password'] },
        include: [{ model: funcionarioModel, as: "funcionario" }],
        where: {
          [Op.and]: {
            usuario: {
              [Op.substring]: usuario,
            },
            activo: true
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
        attributes: { exclude: ['password'] },
        include: [{ model: funcionarioModel, as: "funcionario" }],
        where: {
          activo: true
        }
      });
      return res.status(200).json(usuarioLista)
    } catch (error) {
      return res.status(400).send("error")
    }
  },
}