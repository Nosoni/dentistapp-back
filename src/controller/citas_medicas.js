const citasMedicasModel = require("../models/inicializar_modelos").citas_medicas;
const citasMedicasViewModel = require("../models/inicializar_modelos").citas_medicas_view;
const getEstadoInicialTabla = require('./estados_movimientos').getEstadoInicialTabla
const moment = require('moment')
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    try {
      const { paciente_id, fecha_inicio, observacion } = req.body;

      //validar propiedades obligatorias
      if (!paciente_id || !fecha_inicio) {
        return res.status(500).json({ mensaje: "Verificar datos de la cita médica." })
      }

      if (moment(fecha_inicio).format('DD/MM/YYYY') < moment().format('DD/MM/YYYY')) {
        return res.status(500).json({ mensaje: "No es posible agendar cita para una fecha anterior al de hoy." })
      }

      const fecha_fin = moment(fecha_inicio).add(1, 'hour')

      const estado_inicial = await getEstadoInicialTabla('citas_medicas')
      if (!estado_inicial) {
        return res.status(500).json({ mensaje: "Verificar configuración del estado inicial." })
      }

      const cita_medica = await citasMedicasModel.create({
        paciente_id, fecha_inicio, fecha_fin, estado_cita_id: estado_inicial.id, observacion
      }, {
        user_login_id: req.user_login_id
      })

      return res.status(200).json({ mensaje: "Cita médica creada con éxito.", datos: cita_medica })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      const { id, paciente_id, fecha_inicio, estado_cita_id, estado_nuevo_id, observacion } = req.body;

      //validar propiedades obligatorias
      if (!paciente_id || !fecha_inicio) {
        return res.status(500).json({ mensaje: "Verificar datos de la cita médica." })
      }

      if (moment(fecha_inicio).format('DD/MM/YYYY') < moment().format('DD/MM/YYYY')) {
        return res.status(500).json({ mensaje: "No es posible agendar cita para una fecha anterior al de hoy." })
      }

      const fecha_fin = moment(fecha_inicio).add(1, 'hour')

      // en caso que se quiera comprobar que exista una cita para dicha hora
      // const cita_medica_existe = await citasMedicasModel.findOne({
      //   where: {
      //     [Op.and]: {
      //       fecha_inicio: { [Op.lte]: fecha_inicio },
      //       fecha_fin: { [Op.gte]: fecha_inicio },
      //       id: { [Op.ne]: id }
      //     }
      //   }
      // })

      // if (!cita_medica_existe) { 
      //   return res.status(500).send({ mensaje: "No existe la cita médica a editar." })
      // }

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

      let nuevos_valores = { paciente_id, fecha_inicio, fecha_fin, estado_cita_id, observacion }
      if (estado_nuevo_id) {
        nuevos_valores.estado_cita_id = estado_nuevo_id
      }

      await cita_medica_editar.update(nuevos_valores, { user_login_id: req.user_login_id })

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
        opciones.fecha_inicio = { [Op.gte]: moment(fecha_inicio).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) }
      }
      if (fecha_fin) {
        opciones.fecha_fin = { [Op.lte]: moment(fecha_fin).set({ hour: 23, minute: 59, second: 59, millisecond: 59 }) }
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