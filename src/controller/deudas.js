const deudaModel = require("../models/inicializar_modelos").deudas;
const pacienteModel = require("../models/inicializar_modelos").pacientes;
const facturaModel = require("../models/inicializar_modelos").facturas;
const { Op } = require("sequelize")

module.exports = {
  async filtrar(req, res) {
    try {
      const { paciente_id } = req.params
      const deudas = await deudaModel.findAll({
        include: { model: facturaModel, as: "factura", where: { activo: true, paciente_id } },
        where: {
          [Op.and]: {
            activo: true,
            debe: { [Op.gt]: deudaModel.sequelize.literal('haber') },
          }
        }
      })

      const retornar = deudas.map(deuda => {
        return {
          deuda_id: deuda.id,
          factura_id: deuda.factura_id,
          factura_comprobante: deuda.factura.comprobante,
          debe: deuda.debe,
          haber: deuda.haber,
          monto: deuda.debe - deuda.haber,
          paciente_id: deuda.factura.paciente_id
        }
      })

      return res.status(200).json({ datos: retornar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async reporteCuentas(filtro) {
    try {
      const { paciente_id } = filtro
      let deudas;
      if (paciente_id) {
        deudas = await deudaModel.findAll({
          include: {
            model: facturaModel, as: "factura", where: { activo: true, paciente_id },
            include: { model: pacienteModel, as: "paciente", where: { activo: true } },
          },
          where: {
            [Op.and]: {
              activo: true,
              debe: { [Op.gt]: deudaModel.sequelize.literal('haber') },
            }
          }
        })
      } else {
        deudas = await deudaModel.findAll({
          include: {
            model: facturaModel, as: "factura", where: { activo: true },
            include: { model: pacienteModel, as: "paciente", where: { activo: true } },
          },
          where: {
            [Op.and]: {
              activo: true,
              debe: { [Op.gt]: deudaModel.sequelize.literal('haber') },
            }
          }
        })
      }

      const retornar = deudas.map(deuda => {
        return {
          deuda_id: deuda.id,
          factura_id: deuda.factura_id,
          factura_comprobante: deuda.factura.comprobante,
          debe: deuda.debe,
          haber: deuda.haber,
          monto: deuda.debe - deuda.haber,
          paciente_id: deuda.factura.paciente_id
        }
      })

      return deudas
    } catch (error) { console.log(error) }
  }
}