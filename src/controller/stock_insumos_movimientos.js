var stockInsumoMovimientoModel = require("../models/inicializar_modelos").stock_insumos_movimientos;
var insumoModel = require("../models/inicializar_modelos").insumos;
const { Op } = require("sequelize")
const objectHasValue = require("../helpers/index").objectHasValue

module.exports = {
  async reporteInventario(filtro) {
    try {
      let stock_insumos_movimientos;
      const sequelize = stockInsumoMovimientoModel.sequelize
      if (objectHasValue(filtro)) {
        stock_insumos_movimientos = await stockInsumoMovimientoModel.findAll({
          include: { model: insumoModel, as: "insumo" },
          attributes: ['insumo_id',
            [sequelize.fn('sum', sequelize.col('cantidad')), 'stock']
          ],
          where: {
            [Op.and]: {
              insumo_id: {
                [Op.in]: filtro.insumo_id
              },
              activo: true
            }
          },
          group: ['insumo.id', 'insumo_id'],
        })
      } else {
        stock_insumos_movimientos = await stockInsumoMovimientoModel.findAll({
          include: { model: insumoModel, as: "insumo" },
          attributes: ['id',
            'insumo_id',
            [sequelize.fn('sum', sequelize.col('cantidad')), 'stock']
          ],
          where: {
            activo: true
          },
          group: ['insumo.id', 'insumo_id'],
          raw: true
        })
      }

      return stock_insumos_movimientos
    } catch (error) {
      console.log(error)
    }
  }
}