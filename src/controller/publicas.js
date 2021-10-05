const usuarioModel = require("../models/inicializar_modelos").usuarios;
const funcionarioModel = require("../models/inicializar_modelos").funcionarios;
const usuariosRolesModel = require("../models/inicializar_modelos").usuarios_roles;
const rolesModel = require("../models/inicializar_modelos").roles;
const bcrypt = require("bcrypt")
const { Op } = require("sequelize")
const jwt = require("jsonwebtoken")
const definiciones = require('../constantes/index')
const filtrarRolesPermisos = require('./roles_permisos').filtrarRolesPermisos

module.exports = {
  async login(req, res) {
    try {
      const { usuario, password } = req.body;

      //#region Buscar usuario
      const usuarioFiltrado = await usuarioModel.findOne({
        include: [{ model: funcionarioModel, as: "funcionario" }],
        where: {
          [Op.and]: {
            usuario,
          },
        }
      })
      //#endregion Buscar usuario

      //#region Validar usuario
      if (!usuarioFiltrado) {
        return res.status(500).send({ mensaje: "Usuario ingresado inválido." })
      }

      if (!usuarioFiltrado.activo) {
        return res.status(500).send({ mensaje: "Usuario inactivo." })
      }

      let mach = await bcrypt.compareSync(password, usuarioFiltrado.password);
      if (!mach) {
        return res.status(500).send({ mensaje: "Contraseña ingresada inválida." })
      }
      //#endregion Validar usuario

      //#region Generar JWT
      const llaveSecreta = req.app.get(definiciones.llave_secreta);

      const token = jwt.sign(usuarioFiltrado.dataValues, llaveSecreta, {
        expiresIn: definiciones.expiresIn
      });
      //#endregion Generar JWT

      //#region Obtener roles y permisos
      const roles = await usuariosRolesModel.findAll({
        include: [{ model: rolesModel, as: "rol" }],
        where: {
          [Op.and]: {
            usuario_id: usuarioFiltrado.id,
            activo: true
          },
        },
      }).then(usuarios_roles => usuarios_roles.map(row => row.rol))

      const permisos = roles.length > 0 ?
        await filtrarRolesPermisos(roles.map(rol => rol.id))
          .then(roles_permisos => roles_permisos.map(row => row.permiso)) :
        [];
      //#endregion Obtener roles y permisos

      let retornarUsuario = {
        usuario: { id: usuarioFiltrado.id, usuario, funcionario: usuarioFiltrado.funcionario, roles, permisos },
        token,
        authenticated: true
      }
      return res.status(200).json({ mensaje: "Ingreso exitoso.", datos: retornarUsuario })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
}