const facturaModel = require("../models/inicializar_modelos").facturas;
const facturaDetalleModel = require("../models/inicializar_modelos").facturas_detalle;
const getEstadoInicialTabla = require('./estados_movimientos').getEstadoInicialTabla
const estadoMovimientoModel = require("../models/inicializar_modelos").estados_movimientos;
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    try {
      const { cabecera, detalle } = req.body;
      console.log(cabecera)

      const estado_inicial = await getEstadoInicialTabla('facturas')
      const estado_movimiento = await estadoMovimientoModel.findOne({
        where: {
          [Op.and]: {
            activo: true,
            tabla_id: 'facturas',
            estado_anterior_id: estado_inicial.id,
          }
        },
      })

      const factura = await facturaModel.create({ ...cabecera, estado_factura_id: estado_movimiento.id })

      let factura_detalle = Promise.all(detalle.map(
        async (det) => await facturaDetalleModel.create({ factura_id: factura.id, ...det })))

      const retornar = { factura, factura_detalle }

      return res.status(200).json({ mensaje: "Factura creado con éxito.", datos: retornar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  }
}