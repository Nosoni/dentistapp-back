var productoServicioModel = require("../models/inicializar_modelos").productos_servicios;
var stockMovimientoModel = require("../models/inicializar_modelos").stock_movimientos;
const { Op } = require("sequelize")
const Yup = require('yup');

const schemaYup = Yup.object().shape({
  nombre: Yup.string().required("Nombre requerido").max(30, "nom mucho caract").typeError("nom tipo invalido"),
  descripcion: Yup.string().max(100, "desc mucho caract").nullable().typeError("desc tipo invalido"),
  precio: Yup.number().required("Precio requerido").moreThan(0, "precio debe ser mayo que 0").typeError("precio tipo invalido"),
  cantidad_minima: Yup.number().nullable().moreThan(0, "cantidad debe ser mayo que 0").typeError("cantidad tipo invalido"),
  es_servicio: Yup.boolean().required("Es_servicio requerido").typeError("es_servicio tipo invalido")
});

module.exports = {
  async crear(req, res) {
    try {

      await schemaYup.validate(req.body, { strict: true })

      const { nombre, descripcion, precio, tiempo, cantidad_minima, es_servicio } = req.body;

      const existe = await productoServicioModel.findOne({
        where: {
          [Op.and]: {
            nombre: { [Op.iLike]: `${nombre}` },
            activo: true
          }
        }
      })

      if (existe) {
        return res.status(500).send({ mensaje: "Ya existe dicho producto o servicio." })
      }

      const creado = await productoServicioModel.create({
        nombre, descripcion, precio, tiempo, cantidad_minima, es_servicio
      })

      return res.status(200).send({ mensaje: "Producto o servicio creado con éxito.", datos: creado })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      await schemaYup.validate(req.body, { strict: true })

      const { id, nombre, descripcion, precio, tiempo, cantidad_minima, es_servicio } = req.body;

      if (!id) {
        return res.status(500).send({ mensaje: "No es posible procesar solicitud." })
      }

      const existe = await productoServicioModel.findOne({
        where: {
          [Op.and]: {
            id: { [Op.ne]: id },
            nombre: { [Op.iLike]: `${nombre}` },
            activo: true
          }
        }
      })

      if (existe) {
        return res.status(500).send({ mensaje: "Ya existe dicho producto o servicio." })
      }

      const editar = await productoServicioModel.findOne({
        where: {
          [Op.and]: {
            id,
            activo: true
          }
        }
      })

      if (!editar) {
        return res.status(500).send({ mensaje: "No existe el producto o servicio a editar." })
      }

      await editar.update({ nombre, descripcion, precio, tiempo, cantidad_minima, es_servicio })

      return res.status(200).send({ mensaje: "Producto o servicio editado con éxito.", datos: editar })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async eliminar(req, res) {
    try {
      const id = req.params.id

      if (!id) {
        return res.status(500).send({ mensaje: "No es posible procesar solicitud." })
      }

      const eliminar = await productoServicioModel.findOne({
        where: {
          [Op.and]: {
            id,
            activo: true
          }
        }
      })

      if (!eliminar) {
        return res.status(500).send({ mensaje: "No existe el producto o servicio a eliminar." })
      }

      await eliminar.update({ activo: false })

      return res.status(200).send({ mensaje: "Producto o servicio eliminado con éxito." })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async filtrar(req, res) {
    try {
      const { filtro } = req.params;

      if (!filtro) {
        return res.status(500).send({ mensaje: "No es posible procesar solicitud." })
      }

      const filtrados = await productoServicioModel.findAll({
        where: {
          [Op.and]: {
            [Op.or]: {
              nombre: { [Op.iLike]: `%${filtro}%` },
              descripcion: { [Op.iLike]: `%${filtro}%` },
            },
            activo: true
          }
        },
        order: [
          ['nombre', 'ASC'],
        ],
      })

      return res.status(200).send({ datos: filtrados })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listar(_, res) {
    try {
      const listado = await productoServicioModel.findAll({ where: { activo: true } });
      return res.status(200).send({ datos: listado })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async stockBajo(req, res) {
    try {
      const sequelize = stockMovimientoModel.sequelize
      const stock_bajo = await stockMovimientoModel.findAll({
        include: {
          model: productoServicioModel, as: "producto",
        },
        attributes: ['producto_id',
          [sequelize.fn('sum', sequelize.col('cantidad')), 'stock']
        ],
        where: {
          [Op.and]: {
            activo: true,
          }
        },
        group: ['producto.id', 'producto_id'],
      })
      const retornar = stock_bajo.map(stock => {
        if (stock.dataValues.stock <= stock.producto.cantidad_minima) {
          return {
            producto_id: stock.producto.id,
            producto: stock.producto.nombre,
            cantidad_minima: stock.producto.cantidad_minima,
            stock_actual: stock.dataValues.stock
          }
        }
      })
      return res.status(200).json({ mensaje: "Listado de stock bajo.", datos: retornar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  }
}