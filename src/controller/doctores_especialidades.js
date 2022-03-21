const doctoresEspecialidadesModel = require("../models/inicializar_modelos").doctores_especialidades;
const especialidadModel = require("../models/inicializar_modelos").especialidades;
const { Op } = require("sequelize")

module.exports = {
  async obtenerEspecialidadesDoctor(req, res) {
    try {
      const { doctor_id } = req.params;

      const doctorEspecialidades = await doctoresEspecialidadesModel.findAll({
        include: { model: especialidadModel, as: "especialidad", where: { activo: true } },
        where: {
          [Op.and]: {
            doctor_id,
            activo: true
          }
        },
      })

      return res.status(200).json({ datos: doctorEspecialidades })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async actualizarDoctoresEspecialidades(doctor_id, nuevas_especialidades) {
    try {
      const doctores_especialidades = await doctoresEspecialidadesModel.findAll({
        attributes: ['especialidad_id'],
        where: {
          [Op.and]: {
            doctor_id,
            activo: true
          },
        }
      })
      const especialidades_tiene = doctores_especialidades.map(row => {
        return row.dataValues.especialidad_id
      })

      let eliminar = especialidades_tiene.filter(x => !nuevas_especialidades.includes(x));
      await doctoresEspecialidadesModel.update({
        activo: false
      }, {
        where: {
          doctor_id,
          especialidad_id: { [Op.in]: eliminar },
          activo: true
        }
      })

      let insertar = nuevas_especialidades.filter(x => !especialidades_tiene.includes(x));
      insertar.map(async especialidad_id => {
        await doctoresEspecialidadesModel.create({
          doctor_id,
          especialidad_id
        })
      })
    } catch (error) {
      throw error
    }
  }
}
