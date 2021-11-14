const citasMedicasModel = require("../models/inicializar_modelos").citas_medicas;
const citasMedicasViewModel = require("../models/inicializar_modelos").citas_medicas_view;
const getEstadoInicialTabla = require('./estados_movimientos').getEstadoInicialTabla
const validarFecha = require('../helpers/index').validarFecha
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    try {
      const { paciente_id, fecha_inicio, fecha_fin, usuario_id
        // , estado_cita_id 
        , observacion
      } = req.body;

      //validar propiedades obligatorias
      if (!paciente_id || !fecha_inicio
        // || !fecha_fin
        // || !usuario_id
        // || !estado_cita_id
      ) {
        return res.status(500).json({ mensaje: "Verificar datos de la cita médica." })
      }

      const estado_inicial = await getEstadoInicialTabla('citas_medicas')
      if (!estado_inicial) {
        return res.status(500).json({ mensaje: "Sin estado inicial." })
      }

      const cita_medica = await citasMedicasModel.create({ paciente_id, fecha_inicio, fecha_fin: fecha_inicio, usuario_id: 1, estado_cita_id: estado_inicial.id, observacion })

      return res.status(200).json({ mensaje: "Cita médica creada con éxito.", datos: cita_medica })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      const { id, paciente_id, fecha_inicio, fecha_fin, usuario_id, estado_cita_id } = req.body;

      //validar propiedades obligatorias
      if (!paciente_id || !fecha_inicio
        // || !fecha_fin
        // || !usuario_id
        // || !estado_cita_id
      ) {
        return res.status(500).json({ mensaje: "Verificar datos de la cita médica." })
      }

      const cita_medica_editar = await citasMedicasModel.findOne({
        where: {
          [Op.and]: {
            id,
            activo: true
          }
        }
      })

      if (!cita_medica_editar) {
        return res.status(500).send({ mensaje: "No existe la cita médica a editar." })
      }

      await cita_medica_editar.update({ paciente_id, fecha_inicio, fecha_fin, usuario_id, estado_cita_id })

      return res.status(200).json({ mensaje: "Cita médica editada con éxito.", datos: cita_medica_editar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async eliminar(req, res) {
    const id = req.params.id

    if (!id) {
      return res.status(500).json({ mensaje: "No es posible procesar solicitud." })
    }

    const cita_medica_eliminar = await citasMedicasModel.findOne({
      where: {
        [Op.and]: {
          id,
          activo: true
        }
      }
    })

    if (!cita_medica_eliminar) {
      return res.status(500).send({ mensaje: "No existe la cita médica a eliminar." })
    }

    await cita_medica_eliminar.update({ activo: false })

    return res.status(200).json({ mensaje: "Cita médica eliminada con éxito." })
  },
  async filtrar(req, res) {
    try {
      const { paciente_id, estado_actual, fecha_inicio, fecha_fin } = req.body;

      if (!paciente_id && (!estado_actual || estado_actual.length == 0) && !fecha_inicio && !fecha_fin) {
        return res.status(500).send({ mensaje: "Favor introduzca un parámetro de búsqueda." })
      }

      let opciones = {}
      if (paciente_id) {
        opciones.paciente_id = paciente_id
      }
      if (estado_actual && estado_actual.length > 0) {
        opciones.estado_actual = estado_actual
      }
      if (fecha_inicio) {
        opciones.fecha_inicio = { [Op.gte]: fecha_inicio }
      }
      if (fecha_fin) {
        opciones.fecha_fin = { [Op.gte]: fecha_fin }
      }

      const cita_medica_filtrar = await citasMedicasViewModel.findAll({
        where: {
          [Op.and]: {
            ...opciones,
            activo: true
          }
        },
      })

      return res.status(200).json({ datos: cita_medica_filtrar })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listar(_, res) {
    try {
      const cita_medica_listar = await citasMedicasViewModel.findAll({
        where: {
          activo: true
        },
      });

      return res.status(200).json({ datos: cita_medica_listar })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
}