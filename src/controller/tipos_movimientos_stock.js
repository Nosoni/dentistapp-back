var tipoMovimientoStockModel = require("../models/inicializar_modelos").tipos_movimientos_stock;

module.exports = {
  async listar(_, res) {
    try {
      const tipos_movimientos_stock = await tipoMovimientoStockModel.findAll({ where: { activo: true } });
      return res.status(200).json({ datos: tipos_movimientos_stock })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
}