const pacienteDienteHistorialModel = require("../models/inicializar_modelos").pacientes_dientes_historial;
const tratamientoServicioModel = require("../models/inicializar_modelos").tratamientos_servicios;
const getEstadoInicialTabla = require('./estados_movimientos').getEstadoInicialTabla
const { Op } = require("sequelize")

module.exports = {
  async get_paciente_historial(paciente_id) {
    const paciente_historial = await pacienteDienteHistorialModel.findAll({
      include: { model: tratamientoServicioModel, as: "tratamiento_servicio", where: { activo: true } },
      where: {
        [Op.and]: {
          paciente_id,
          activo: true
        }
      },
      order: [
        ['id', 'DESC'],
      ],
    })
    return paciente_historial
  },
  async insert_paciente_historial(tratamientos) {
    Promise.all(tratamientos.map(async tratamiento => {
      const estado_inicial = await getEstadoInicialTabla('pacientes_dientes_historial')
      await pacienteDienteHistorialModel.create({ ...tratamiento, estado_historial_id: estado_inicial.id })
    }))
  },
  async getHistorialInicial(req, res) {
    try {
      const { paciente_id } = req.params
      const estado_inicial = await getEstadoInicialTabla('pacientes_dientes_historial')
      const historial = await pacienteDienteHistorialModel.findAll({
        where: {
          [Op.and]: {
            activo: true,
            estado_historial_id: estado_inicial.id,
            paciente_id
          }
        },
        include: { model: tratamientoServicioModel, as: "tratamiento_servicio", where: { activo: true } },
      })

      const filtrado = historial.map(hist => {
        return {
          historial_id: hist.id,
          tratamiento_servicio_id: hist.tratamiento_servicio_id,
          tratamiento_servicio_nombre: hist.tratamiento_servicio.nombre,
          tratamiento_servicio_descripcion: hist.tratamiento_servicio.descripcion,
          precio: hist.tratamiento_servicio.precio,
        }
      })
      return res.status(200).json({ datos: filtrado })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async get_paciente_historialByID(id) {
    const paciente_historial = await pacienteDienteHistorialModel.findOne({
      include: { model: tratamientoServicioModel, as: "tratamiento_servicio", where: { activo: true } },
      where: {
        [Op.and]: {
          id,
          activo: true
        }
      },
      order: [
        ['id', 'DESC'],
      ],
    })
    return paciente_historial
  },
}