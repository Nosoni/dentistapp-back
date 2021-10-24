const doctoresEspecialidadesModel = require("../models/inicializar_modelos").doctores_especialidades;
const especialidadModel = require("../models/inicializar_modelos").especialidades;
const { Op } = require("sequelize")

module.exports = {
  async obtenerEspecialidadDoctor(req, res) {
    try {
      const { doctor_id } = req.params;

      const doctorEspecialidades = await doctoresEspecialidadesModel.findAll({
        include: {
          model: especialidadModel,
          as: "especialidad",
          where: {
            activo: true
          }
        },
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
}
