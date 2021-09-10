const usuarioModel = require("../models/inicializar_modelos").usuarios;
const funcionarioModel = require("../models/inicializar_modelos").funcionarios;
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")
const definiciones = require('../constantes/index')

module.exports = {
  async crear(req, res) {
    try {
      const { usuario, funcionario_id, password, confirmar } = req.body;
      if (!usuario) {
        return res.status(409).send({ mensaje: "Introduzca el usuario." })
      }
      if (password !== confirmar) {
        return res.status(409).send({ mensaje: "La validación de contraseña no es correcta." })
      }
      if (password.length < definiciones.longitudMinimaPass) {
        return res.status(409).send({ mensaje: "Logitud de contraseña inválida." })
      }
      //único findAll en donde no se filtra por activo, 
      //ya que el usuario es único en el sistema
      const userExists = await usuarioModel.findAll({
        where: {
          usuario
        }
      })

      if (userExists.length > 0) {
        return res.status(409).send({ mensaje: "Ya existe dicho usuario." })
      }

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
      const { id, usuario, funcionario_id, password, confirmar } = req.body
      const usuario_editar = await usuarioModel.findOne({
        attributes: { exclude: ['password'] },
        where: {
          [Op.and]: {
            id: id,
            activo: true
          }
        }
      })

      if (usuario_editar.length == 0) {
        return res.status(409).send({ mensaje: "No existe el usuario a editar." })
      }

      usuario_editar.usuario = usuario
      usuario_editar.funcionario_id = funcionario_id

      if (password && confirmar) {
        if (password !== confirmar) {
          return res.status(409).send({ mensaje: "La validación de contraseña no es correcta." })
        }
        if (password.length < definiciones.longitudMinimaPass) {
          return res.status(409).send({ mensaje: "Logitud de contraseña inválida." })
        }

        const hash = await bcrypt.hash(password, 10);
        usuario_editar.password = hash
      }

      await usuario_editar.save()

      let retornar = { ...usuario_editar.dataValues }
      delete retornar.password

      return res.status(200).json({ mensaje: "Usuario editado con éxito.", datos: retornar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async eliminar(req, res) {
    const id = req.params.id

    if (!id) {
      return res.status(500).json({ mensaje: "No es posible procesar solicitud." })
    }
    const usuario_eliminar = await usuarioModel.findOne({
      attributes: { exclude: ['password'] },
      where: {
        [Op.and]: {
          id: id,
          activo: true
        }
      }
    })

    if (usuario_eliminar.length == 0) {
      return res.status(409).send({ mensaje: "No existe el usuario a eliminar." })
    }

    usuario_eliminar.activo = false
    await usuario_eliminar.save()

    return res.status(200).json({ mensaje: "Usuario eliminado con éxito." })
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
          },
          order: [
            ['usuario', 'ASC'],
          ],
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
        },
        order: [
          ['usuario', 'ASC'],
        ],
      });
      return res.status(200).json({ datos: usuarioLista })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
}