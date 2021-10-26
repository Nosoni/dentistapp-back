const especialidadModel = require("../models/inicializar_modelos").especialidades;
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    try {
      const { nombre, descripcion, especialidad_padre_id } = req.body;

      //validar propiedades obligatorias
      if (!nombre) {
        return res.status(500).json({ mensaje: "Verificar datos de la especialidad." })
      }

      const exite = await especialidadModel.findOne({
        where: {
          [Op.and]: {
            nombre,
            activo: true
          }
        }
      })

      if (exite) {
        return res.status(500).send({ mensaje: "Ya existe una especialidad con el mismo nombre." })
      }

      const especialidad = await especialidadModel.create({ nombre, descripcion, especialidad_padre_id })

      return res.status(200).json({ mensaje: "Especialidad creada con éxito.", datos: especialidad })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      const { id, nombre, descripcion, especialidad_padre_id } = req.body;

      const exite = await especialidadModel.findOne({
        where: {
          [Op.and]: {
            nombre,
            activo: true
          }
        }
      })

      if (exite) {
        return res.status(500).send({ mensaje: "Ya existe una especialidad con el mismo nombre." })
      }

      const especialidad_editar = await especialidadModel.findOne({
        where: {
          [Op.and]: {
            id,
            activo: true
          }
        }
      })

      if (!especialidad_editar) {
        return res.status(500).send({ mensaje: "No existe la especialidad a editar." })
      }

      await especialidad_editar.update({ nombre, descripcion, especialidad_padre_id })

      return res.status(200).json({ mensaje: "Especialidad editada con éxito.", datos: especialidad_editar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async eliminar(req, res) {
    try {
      const id = req.params.id

      if (!id) {
        return res.status(500).json({ mensaje: "No es posible procesar solicitud." })
      }

      const especialidad_eliminar = await especialidadModel.findOne({
        where: {
          [Op.and]: {
            id,
            activo: true
          }
        }
      })

      if (!especialidad_eliminar) {
        return res.status(500).send({ mensaje: "No existe la especialidad a eliminar." })
      }

      await especialidad_eliminar.update({ activo: false })

      return res.status(200).json({ mensaje: "Especialidad eliminada con éxito." })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async filtrar(req, res) {
    try {
      const { filtro } = req.params;
      const especialidadFiltradas = await especialidadModel.findAll({
        where: {
          [Op.and]: {
            activo: true,
            [Op.or]: {
              nombre: filtro,
              descripcion: filtro
            }
          }
        },
      })

      return res.status(200).json({ datos: especialidadFiltradas })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listar(_, res) {
    try {
      const especialidades = await especialidadModel.findAll({
        where: {
          activo: true
        }
      })
      return res.status(200).json({ datos: especialidades })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  }
}
