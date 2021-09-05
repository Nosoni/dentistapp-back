const usuarioModel = require("../models/inicializar_modelos").usuarios;
const funcionarioModel = require("../models/inicializar_modelos").funcionarios;
const usuariosRolesModel = require("../models/inicializar_modelos").usuarios_roles;
const rolesModel = require("../models/inicializar_modelos").roles;
const rolesPermisosModel = require("../models/inicializar_modelos").roles_permisos;
const permisosModel = require("../models/inicializar_modelos").permisos;
const bcrypt = require("bcrypt")
const { Op } = require("sequelize")
const jwt = require("jsonwebtoken")
const definiciones = require('../constantes/index')

module.exports = {
  async login(req, res) {
    try {
      const { usuario, password } = req.body;

      //#region Buscar usuario
      const usuarioFiltrado = await usuarioModel.findAll({
        include: [{ model: funcionarioModel, as: "funcionario" }],
        where: {
          [Op.and]: {
            usuario,
            activo: true
          },
        }
      })
      //#endregion Buscar usuario

      //#region Validar usuario
      if (usuarioFiltrado.length == 0) {
        return res.status(409).send({ mensaje: "Usuario ingresado inválido." })
      }

      let mach = await bcrypt.compareSync(password, usuarioFiltrado[0].password);
      if (!mach) {
        return res.status(409).send({ mensaje: "Contraseña ingresada inválida." })
      }
      //#endregion Validar usuario

      //#region Generar JWT
      const llaveSecreta = req.app.get(definiciones.llave_secreta);

      const token = jwt.sign(usuarioFiltrado[0].dataValues, llaveSecreta, {
        expiresIn: definiciones.expiresIn
      });
      //#endregion Generar JWT

      //#region Obtener roles y permisos
      const roles = await usuariosRolesModel.findAll({
        include: [{ model: rolesModel, as: "rol" }],
        where: {
          [Op.and]: {
            usuario_id: usuarioFiltrado[0].id,
            activo: true
          },
        },
      }).then(roles => roles.map(row => row.rol))

      const permisos = roles.length > 0 ?
        await rolesPermisosModel.findAll({
          include: [{ model: permisosModel, as: 'permiso' }],
          where: {
            [Op.and]: {
              //TODO rol_id in
              rol_id: roles[0].id,
              activo: true
            },
          }
        }).then(permisos => permisos.map(row => row.permiso)) :
        [];
      //#endregion Obtener roles y permisos

      let retornarUsuario = {
        usuario: { id: usuarioFiltrado[0].id, usuario, funcionario: usuarioFiltrado[0].funcionario, roles, permisos },
        token,
      }
      return res.status(200).json({ mensaje: "Ingreso exitoso.", datos: retornarUsuario })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
}