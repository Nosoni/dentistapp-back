var insumosModel = require("../models/inicializar_modelos").insumos;
var stockInsumoMovimientoModel = require("../models/inicializar_modelos").stock_insumos_movimientos;
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    try {
      const { nombre, descripcion, codigo, cantidad_minima } = req.body;

      //validar propiedades obligatorias
      if (!nombre || !codigo) {
        return res.status(500).json({ mensaje: "Verificar datos del insumo." })
      }

      const insumo_existe = await insumosModel.findOne({
        where: {
          [Op.and]: {
            nombre,
            activo: true
          }
        }
      })

      if (insumo_existe) {
        return res.status(500).send({ mensaje: "Ya existe dicho insumo." })
      }

      const insumo = await insumosModel.create({
        nombre, descripcion, codigo, cantidad_minima
      })

      return res.status(200).json({ mensaje: "Insumo creado con éxito.", datos: insumo })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      const { id, nombre, descripcion, codigo, cantidad_minima } = req.body;

      const insumo_existe = await insumosModel.findOne({
        where: {
          [Op.and]: {
            id: {
              [Op.ne]: id
            },
            nombre,
            activo: true
          }
        }
      })

      if (insumo_existe) {
        return res.status(500).send({ mensaje: "Ya existe dicho Insumo." })
      }

      const insumo_editar = await insumosModel.findOne({
        where: {
          [Op.and]: {
            id,
            activo: true
          }
        }
      })

      if (!insumo_editar) {
        return res.status(500).send({ mensaje: "No existe el insumo a editar." })
      }

      await insumo_editar.update({ nombre, descripcion, codigo, cantidad_minima })

      return res.status(200).json({ mensaje: "Insumo editado con éxito.", datos: insumo_editar })
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

      const insumo_eliminar = await insumosModel.findOne({
        where: {
          [Op.and]: {
            id,
            activo: true
          }
        }
      })

      if (!insumo_eliminar) {
        return res.status(500).send({ mensaje: "No existe el insumo a eliminar." })
      }

      await insumo_eliminar.update({ activo: false })

      return res.status(200).json({ mensaje: "Insumo eliminado con éxito." })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async filtrar(req, res) {
    try {
      const { filtro } = req.params;
      const insumos_filtrado = await insumosModel.findAll({
        where: {
          [Op.and]: {
            [Op.or]: {
              nombre: {
                [Op.substring]: filtro,
              },
              descripcion: {
                [Op.substring]: filtro,
              },
              codigo: {
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

      return res.status(200).json({ datos: insumos_filtrado })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listar(_, res) {
    try {
      const insumos = await insumosModel.findAll({ where: { activo: true } });
      return res.status(200).json({ datos: insumos })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },

  async stockBajo(req, res) {
    try {
      const sequelize = stockInsumoMovimientoModel.sequelize
      const stock_bajo = await stockInsumoMovimientoModel.findAll({
        include: {
          model: insumosModel, as: "insumo",
        },
        attributes: ['insumo_id',
          [sequelize.fn('sum', sequelize.col('cantidad')), 'stock']
        ],
        where: {
          [Op.and]: {
            activo: true,
          }
        },
        group: ['insumo.id', 'insumo_id'],
      })
      const retornar = stock_bajo.map(stock => {
        if (stock.dataValues.stock <= stock.insumo.cantidad_minima) {
          return {
            insumo_id: stock.insumo.id,
            insumo: stock.insumo.nombre,
            cantidad_minima: stock.insumo.cantidad_minima,
            stock_actual: stock.dataValues.stock
          }
        }
      })
      return res.status(200).json({ mensaje: "Listado de stock bajo.", datos: retornar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
}