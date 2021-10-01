const usuariosRolesModel = require("../models/inicializar_modelos").usuarios_roles;
const rolesModel = require("../models/inicializar_modelos").roles;
const usuariosModel = require("../models/inicializar_modelos").usuarios;
const { Op } = require("sequelize")

async function usuariosConRoles(usuarios) {
  let respuesta = await usuariosRolesModel.findAll({
    include: [{ model: rolesModel, as: 'rol' }, { model: usuariosModel, as: 'usuario' }],
    where: {
      [Op.and]: {
        usuario_id: { [Op.in]: usuarios },
        activo: true
      },
    }
  })
  return respuesta
}

module.exports = {
  async obtenerRolesDelUsuario(req, res) {
    try {
      const roles_usuario = await usuariosConRoles([req.params.usuario_id]).then(usuarios_roles => usuarios_roles.map(row => row.rol))
      return res.status(200).json({ datos: roles_usuario })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  }
}