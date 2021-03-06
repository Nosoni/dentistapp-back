const pacienteModel = require("../models/inicializar_modelos").pacientes;
const get_ficha_medicas = require("./fichas_medicas").get_ficha
const delete_ficha_medicas = require("./fichas_medicas").delete_ficha
const create_ficha_medicas = require("./fichas_medicas").create_ficha
const update_ficha_medicas = require("./fichas_medicas").update_ficha
const get_paciente_dientes = require("./pacientes_dientes").get_paciente_dientes
const delete_paciente_dientes = require("./pacientes_dientes").delete_paciente_dientes
const create_paciente_dientes = require("./pacientes_dientes").create_paciente_dientes
const update_paciente_dientes = require("./pacientes_dientes").update_paciente_dientes
const get_paciente_historial = require("./pacientes_dientes_historial").get_paciente_historial
const insert_paciente_historial = require("./pacientes_dientes_historial").insert_paciente_historial
const { Op } = require("sequelize")
const validarFecha = require("../helpers/index").validarFecha
const objectHasValue = require("../helpers/index").objectHasValue

module.exports = {
  async crear(req, res) {
    try {
      const { apellidos, ciudad, direccion, documento, email,
        fecha_nacimiento, nombres, telefono, tipo_documento_id } = req.body;

      //validar propiedades obligatorias
      if (!documento || !tipo_documento_id || !nombres || !apellidos) {
        return res.status(500).json({ mensaje: "Verificar datos del paciente." })
      }

      const exite = await pacienteModel.findOne({
        where: {
          documento
        }
      })

      if (exite) {
        return res.status(500).send({ mensaje: "Ya existe un paciente con el mismo documento." })
      }

      const fecha = validarFecha(fecha_nacimiento)
      const paciente = await pacienteModel.create({
        apellidos, ciudad, direccion, documento, email,
        fecha, nombres, telefono, tipo_documento_id
      })

      await create_ficha_medicas(paciente.id)
      await create_paciente_dientes(paciente.id)

      return res.status(200).json({ mensaje: "Paciente creado con ??xito.", datos: paciente })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      const { id, apellidos, ciudad, direccion, email,
        fecha_nacimiento, nombres, telefono, tipo_documento_id,
        ficha_medica, dientes, tratamientos } = req.body;

      const paciente_editar = await pacienteModel.findOne({
        where: {
          [Op.and]: {
            id,
            activo: true
          }
        }
      })

      if (!paciente_editar) {
        return res.status(500).send({ mensaje: "No existe el paciente a editar." })
      }

      paciente_editar.apellidos = apellidos
      paciente_editar.ciudad = ciudad
      paciente_editar.direccion = direccion
      paciente_editar.email = email
      paciente_editar.fecha_nacimiento = validarFecha(fecha_nacimiento)
      paciente_editar.nombres = nombres
      paciente_editar.telefono = telefono
      paciente_editar.tipo_documento_id = tipo_documento_id

      await paciente_editar.save()
      await update_ficha_medicas(ficha_medica)
      await update_paciente_dientes(dientes)
      if (tratamientos) {
        await insert_paciente_historial(tratamientos)
      }

      return res.status(200).json({ mensaje: "Paciente editado con ??xito.", datos: paciente_editar })
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

      await delete_ficha_medicas(id)
      await delete_paciente_dientes(id)

      return res.status(200).json({ mensaje: "Paciente eliminado con ??xito." })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async filtrar(req, res) {
    try {
      const { filtro } = req.params;
      let pacientes_filtrados = await pacienteModel.findAll({
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

      const retornar = await Promise.all(pacientes_filtrados.map(async paciente => {
        let ficha_medica = await get_ficha_medicas(paciente.id)
        let dientes = await get_paciente_dientes(paciente.id)
        let historial = await get_paciente_historial(paciente.id)
        return {
          ...paciente.dataValues,
          ficha_medica,
          dientes,
          historial
        }
      }))

      return res.status(200).json({ datos: retornar })
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

      const retornar = await Promise.all(paciente_lista.map(async paciente => {
        let ficha_medica = await get_ficha_medicas(paciente.id)
        let dientes = await get_paciente_dientes(paciente.id)
        let historial = await get_paciente_historial(paciente.id)
        return {
          ...paciente.dataValues,
          ficha_medica,
          dientes,
          historial
        }
      }))

      return res.status(200).json({ datos: retornar })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listarPacientes(_, res) {
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
  async reportePacientes(filtro) {
    try {
      let pacientes_filtrados;

      if (objectHasValue(filtro)) {
        pacientes_filtrados = await pacienteModel.findAll({
          where: {
            [Op.and]: {
              [Op.or]: {
                documento: {
                  [Op.substring]: filtro.paciente,
                },
                nombres: {
                  [Op.substring]: filtro.paciente,
                },
                apellidos: {
                  [Op.substring]: filtro.paciente,
                },
              },
              activo: true
            }
          },
          order: [
            ['documento', 'ASC'],
          ],
        })
      } else {
        pacientes_filtrados = await pacienteModel.findAll({
          where: { activo: true },
          order: [
            ['nombres', 'ASC'],
          ],
        });
      }

      return pacientes_filtrados
    } catch (error) {
      console.log(error)
    }
  },
}