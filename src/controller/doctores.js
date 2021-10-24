const doctorModel = require("../models/inicializar_modelos").doctores;
const funcionarioModel = require("../models/inicializar_modelos").funcionarios;
const actualizarDoctoresEspecialidades = require('./doctores_especialidades').actualizarDoctoresEspecialidades
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    try {
      const { funcionario_id, registro_profesional, especialidades } = req.body;

      //validar propiedades obligatorias
      if (!funcionario_id) {
        return res.status(500).json({ mensaje: "Verificar datos del doctor." })
      }

      const exite = await doctorModel.findOne({
        where: {
          [Op.and]: {
            funcionario_id,
            activo: true
          }
        }
      })

      if (exite) {
        return res.status(500).send({ mensaje: "El funcionario ya está asociado a otro doctor." })
      }

      const doctor = await doctorModel.create({ funcionario_id, registro_profesional })
      await actualizarDoctoresEspecialidades(doctor.dataValues.id, especialidades)

      return res.status(200).json({ mensaje: "Doctor creado con éxito.", datos: doctor })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      const { id, funcionario_id, registro_profesional, especialidades } = req.body;

      const doctor_editar = await doctorModel.findOne({
        where: {
          [Op.and]: {
            id: id,
            activo: true
          }
        }
      })

      if (!doctor_editar) {
        return res.status(500).send({ mensaje: "No existe el doctor a editar." })
      }

      const exite = await doctorModel.findOne({
        where: {
          [Op.and]: {
            funcionario_id,
            activo: true,
            id: {
              [Op.ne]: id
            }
          }
        }
      })

      if (exite) {
        return res.status(500).send({ mensaje: "El funcionario ya está asociado a otro doctor." })
      }

      await doctor_editar.update({ funcionario_id, registro_profesional })
      await actualizarDoctoresEspecialidades(doctor_editar.dataValues.id, especialidades)

      return res.status(200).json({ mensaje: "Doctor editado con éxito.", datos: doctor_editar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async eliminar(req, res) {
    const id = req.params.id

    if (!id) {
      return res.status(500).json({ mensaje: "No es posible procesar solicitud." })
    }

    const doctor_eliminar = await doctorModel.findOne({
      where: {
        [Op.and]: {
          id,
          activo: true
        }
      }
    })

    if (!doctor_eliminar) {
      return res.status(500).send({ mensaje: "No existe el doctor a eliminar." })
    }

    await doctor_eliminar.update({ activo: false })
    await actualizarDoctoresEspecialidades(id, [])

    return res.status(200).json({ mensaje: "Doctor eliminado con éxito." })
  },
  async filtrar(req, res) {
    try {
      const { filtro } = req.params;
      const doctoresFiltrados = await doctorModel.findAll({
        include: {
          model: funcionarioModel, as: "funcionario", where: {
            [Op.and]: {
              activo: true,
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
              }
            }
          }
        },
        where: {
          activo: true
        },
      })

      return res.status(200).json({ datos: doctoresFiltrados })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listar(_, res) {
    try {
      const doctorLista = await doctorModel.findAll({
        where: {
          activo: true
        },
        include: { model: funcionarioModel, as: "funcionario", where: { activo: true } },
      });

      return res.status(200).json({ datos: doctorLista })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
}