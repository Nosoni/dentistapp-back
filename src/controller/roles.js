var rolesModel = require("../models/inicializar_modelos").roles;
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    try {
      const { nombre, descripcion } = req.body;

      //validar propiedades obligatorias
      if (!nombre) {
        return res.status(500).json({ mensaje: "Verificar datos del rol." })
      }

      const rol_existe = await rolesModel.findOne({
        where: {
          [Op.and]: {
            nombre,
            activo: true
          }
        }
      })

      if (rol_existe) {
        return res.status(500).send({ mensaje: "Ya existe dicho rol." })
      }

      const rol = await rolesModel.create({
        nombre, descripcion
      })

      return res.status(200).json({ mensaje: "Rol creado con éxito.", datos: rol })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      const { id, nombre, descripcion } = req.body;

      const rol_editar = await rolesModel.findOne({
        where: {
          [Op.and]: {
            id: id,
            activo: true
          }
        }
      })

      if (!rol_editar) {
        return res.status(500).send({ mensaje: "No existe el rol a editar." })
      }

      rol_editar.nombre = nombre
      rol_editar.descripcion = descripcion

      await rol_editar.save()

      return res.status(200).json({ mensaje: "Rol editado con éxito.", datos: rol_editar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async eliminar(req, res) {
    const id = req.params.id

    if (!id) {
      return res.status(500).json({ mensaje: "No es posible procesar solicitud." })
    }

    const rol_eliminar = await rolesModel.findOne({
      where: {
        [Op.and]: {
          id: id,
          activo: true
        }
      }
    })

    if (!rol_eliminar) {
      return res.status(500).send({ mensaje: "No existe el rol a eliminar." })
    }

    rol_eliminar.activo = false
    await rol_eliminar.save()

    return res.status(200).json({ mensaje: "Rol eliminado con éxito." })
  },
  async filtrar(req, res) {
    try {
      const { rol } = req.params;
      const rolFiltrado = await rolesModel.findAll({
        where: {
          [Op.and]: {
            [Op.or]: {
              nombre: {
                [Op.substring]: rol,
              },
              descripcion: {
                [Op.substring]: rol,
              },
            },
            activo: true
          }
        },
        order: [
          ['nombre', 'ASC'],
        ],
      })

      return res.status(200).json({ datos: rolFiltrado })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listar(_, res) {
    try {
      const roles = await rolesModel.findAll({ where: { activo: true } });
      return res.status(200).json({ datos: roles })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
}