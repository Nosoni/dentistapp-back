const usuariosRolesModel = require("../models/inicializar_modelos").usuarios_roles;
const rolesModel = require("../models/inicializar_modelos").roles;
const usuariosModel = require("../models/inicializar_modelos").usuarios;
const { Op, where } = require("sequelize")

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
  },
  async actualizarUsuariosRoles(usuario_id, nuevos_roles) {
    try {
      const usuario_roles = await usuariosRolesModel.findAll({
        attributes: ['rol_id'],
        where: {
          [Op.and]: {
            usuario_id,
            activo: true
          },
        }
      })

      const roles_tiene = usuario_roles.map(rol => {
        return rol.dataValues.rol_id
      })

      let eliminar = roles_tiene.filter(x => !nuevos_roles.includes(x));
      eliminar.map(async rol_id => {
        await usuariosRolesModel.update({
          activo: false
        }, {
          where: {
            usuario_id,
            rol_id,
            activo: true
          }
        })
      })

      let insertar = nuevos_roles.filter(x => !roles_tiene.includes(x));
      insertar.map(async rol_id => {
        await usuariosRolesModel.create({
          usuario_id,
          rol_id,
        })
      })
    } catch (error) {
      throw error
    }
  }
}