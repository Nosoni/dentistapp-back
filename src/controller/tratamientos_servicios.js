var tratamientosServiciosModel = require("../models/inicializar_modelos").tratamientos_servicios;
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    try {
      const { nombre, descripcion, precio, tiempo } = req.body;

      //validar propiedades obligatorias
      if (!nombre || !precio) {
        return res.status(500).json({ mensaje: "Verificar datos del tratamiento o servicio." })
      }

      const trat_serv_existe = await tratamientosServiciosModel.findOne({
        where: {
          [Op.and]: {
            nombre,
            activo: true
          }
        }
      })

      if (trat_serv_existe) {
        return res.status(500).send({ mensaje: "Ya existe dicho tratamiento o servicio." })
      }

      const trat_serv = await tratamientosServiciosModel.create({
        nombre, descripcion, precio, tiempo
      })

      return res.status(200).json({ mensaje: "Tratamiento o servicio creado con éxito.", datos: trat_serv })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      const { id, descripcion, precio, tiempo } = req.body;

      const trat_serv_existe = await tratamientosServiciosModel.findOne({
        where: {
          [Op.and]: {
            nombre,
            activo: true
          }
        }
      })

      if (trat_serv_existe) {
        return res.status(500).send({ mensaje: "Ya existe dicho tratamiento o servicio." })
      }

      const trat_serv_editar = await tratamientosServiciosModel.findOne({
        where: {
          [Op.and]: {
            id,
            activo: true
          }
        }
      })

      if (!trat_serv_editar) {
        return res.status(500).send({ mensaje: "No existe el tratamiento o servicio a editar." })
      }

      await trat_serv_editar.update({ nombre, descripcion, precio, tiempo })

      return res.status(200).json({ mensaje: "Tratamiento o servicio editado con éxito.", datos: trat_serv_editar })
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

      const trat_serv_eliminar = await tratamientosServiciosModel.findOne({
        where: {
          [Op.and]: {
            id,
            activo: true
          }
        }
      })

      if (!trat_serv_eliminar) {
        return res.status(500).send({ mensaje: "No existe el tratamiento o servicio a eliminar." })
      }

      await trat_serv_eliminar.update({ activo: false })

      return res.status(200).json({ mensaje: "Tratamiento o servicio eliminado con éxito." })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async filtrar(req, res) {
    try {
      const { filtro } = req.params;
      const tratServFiltrado = await tratamientosServiciosModel.findAll({
        where: {
          [Op.and]: {
            [Op.or]: {
              nombre: {
                [Op.substring]: filtro,
              },
              descripcion: {
                [Op.substring]: filtro,
              },
            },
            activo: true
          }
        },
        order: [
          ['nombre', 'ASC'],
        ],
      })

      return res.status(200).json({ datos: tratServFiltrado })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listar(_, res) {
    try {
      const tratamientos_servicios = await tratamientosServiciosModel.findAll({ where: { activo: true } });
      return res.status(200).json({ datos: tratamientos_servicios })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
}