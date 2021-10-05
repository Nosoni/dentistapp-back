const pacienteModel = require("../models/inicializar_modelos").pacientes;
let moment = require('moment');
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    try {
      const { apellidos, ciudad, direccion, documento, email,
        fecha_nacimiento, nombres, telefono, tipo_documento_id } = req.body;

      //validar propiedades obligatorias
      if (!documento || !tipo_documento_id || !nombres || !apellidos) {
        return res.status(500).json({ mensaje: "Verificar datos del paciente" })
      }

      const exite = pacienteModel.findOne({
        where: {
          documento
        }
      })

      if (exite.length > 0) {
        return res.status(500).send({ mensaje: "Ya existe un paciente con el mismo documento." })
      }

      const paciente = await pacienteModel.create({
        apellidos, ciudad, direccion, documento, email,
        fecha_nacimiento, nombres, telefono, tipo_documento_id
      })

      return res.status(200).json({ mensaje: "Paciente creado con éxito.", datos: paciente })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      const { id, apellidos, ciudad, direccion,
        email, fecha_ingreso, nombres, telefono, tipo_documento_id } = req.body;

      const paciente_editar = await pacienteModel.findOne({
        where: {
          [Op.and]: {
            id: id,
            activo: true
          }
        }
      })

      if (paciente_editar.length == 0) {
        return res.status(500).send({ mensaje: "No existe el paciente a editar." })
      }

      paciente_editar.apellidos = apellidos
      paciente_editar.fecha_ingreso = moment.utc(fecha_ingreso)

      await paciente_editar.save()

      return res.status(200).json({ mensaje: "Paciente editado con éxito.", datos: paciente_editar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async eliminar(req, res) {
    const id = req.params.id

    if (!id) {
      return res.status(500).json({ mensaje: "No es posible procesar solicitud." })
    }
    const paciente_eliminar = await pacienteModel.findOne({
      where: {
        [Op.and]: {
          id: id,
          activo: true
        }
      }
    })

    if (!paciente_eliminar) {
      return res.status(500).send({ mensaje: "No existe el paciente a eliminar." })
    }

    paciente_eliminar.activo = false
    await paciente_eliminar.save()

    return res.status(200).json({ mensaje: "Paciente eliminado con éxito." })
  },
  async filtrar(req, res) {
    try {
      const { filtro } = req.params;
      const pacientes_filtrados = await pacienteModel.findAll({
        where: {
          [Op.and]: {
            [Op.or]: {
              documento: {
                [Op.substring]: filtro,
              },
              nombres: {
                [Op.substring]: filtro,
              },
              apellidos: {
                [Op.substring]: filtro,
              },
            },
            activo: true
          }
        },
        order: [
          ['documento', 'ASC'],
        ],
      })

      return res.status(200).json({ datos: pacientes_filtrados })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listar(_, res) {
    try {
      const paciente_lista = await pacienteModel.findAll({
        where: { activo: true },
        order: [
          ['nombres', 'ASC'],
        ],
      });
      return res.status(200).json({ datos: paciente_lista })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
}