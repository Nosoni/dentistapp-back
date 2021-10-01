const rolesPermisosModel = require("../models/inicializar_modelos").roles_permisos;
const permisosModel = require("../models/inicializar_modelos").permisos;
const rolesModel = require("../models/inicializar_modelos").roles;
const { Op } = require("sequelize")

async function rolesConPermisos(roles) {
  let respuesta = await rolesPermisosModel.findAll({
    include: [{ model: permisosModel, as: 'permiso' }, { model: rolesModel, as: 'rol' }],
    where: {
      [Op.and]: {
        rol_id: { [Op.in]: roles },
        activo: true
      },
    }
  })
  return respuesta
}

module.exports = {
  async filtrarRolesPermisos(roles) {
    return await rolesConPermisos(roles)
  },
  async filtrar(req, res) {
    try {
      const roles_permisos = await rolesConPermisos([req.param.rol_id])
      return res.status(200).json({ datos: roles_permisos })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async obtenerPermisosDelRol(req, res) {
    try {
      const permisos_rol = await rolesConPermisos([req.params.rol_id]).then(roles_permisos => roles_permisos.map(row => row.permiso))
      return res.status(200).json({ datos: permisos_rol })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  }
}