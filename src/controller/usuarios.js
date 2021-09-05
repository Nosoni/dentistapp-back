const usuarioModel = require("../models/inicializar_modelos").usuarios;
const funcionarioModel = require("../models/inicializar_modelos").funcionarios;
const { Op, where } = require("sequelize")
const bcrypt = require("bcrypt")
const definiciones = require('../constantes/index')

module.exports = {
  async crear(req, res) {
    try {
      const { usuario, funcionario_id, password, confirmar } = req.body;
      if (password !== confirmar) {
        return res.status(409).send({ mensaje: "La validación de contraseña no es correcta." })
      }
      if (password.length < definiciones.longitudMinimaPass) {
        return res.status(409).send({ mensaje: "Logitud de contraseña inválida." })
      }
      const userExists = await usuarioModel.findAll({
        where: {
          usuario
        }
      })

      if (userExists.length > 0) {
        return res.status(409).send({ mensaje: "Ya existe dicho usuario." })
      }

      console.log(req.body)

      const hash = await bcrypt.hash(password, 10);
      const userCreate = await usuarioModel.create({
        usuario,
        funcionario_id,
        password: hash
      })

      return res.status(200).json({ mensaje: "Usuario creado con éxito.", datos: userCreate })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      const userExists = await usuarioModel.findOne({
        where: {
          [Op.and]: {
            id: req.body.id,
            activo: true
          }
        }
      })

      if (userExists.length == 0) {
        return res.status(409).send({ mensaje: "No existe el usuario a editar." })
      }

      const usuarioEditado = await userExists.update({ ...req.body }, {
        attributes: { exclude: ['password'] },
      })

      return res.status(200).json({ mensaje: "Usuario editado con éxito.", datos: usuarioEditado })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
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

      return res.status(200).json({ datos: usuariosFiltrados })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
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
      return res.status(200).json({ datos: usuarioLista })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
}