const fichasMedicasModel = require("../models/inicializar_modelos").fichas_medicas;
const { Op } = require("sequelize")

module.exports = {
  async delete_ficha(paciente_id) {
    try {
      const ficha = await fichasMedicasModel.findOne({
        where: {
          [Op.and]: {
            paciente_id,
            activo: true
          }
        },
      })

      if (ficha) {
        ficha.activo = false;
        await ficha.save();
      }
    } catch (error) {
      throw error;
    }
  },
  async get_ficha(paciente_id) {
    const ficha = await fichasMedicasModel.findOne({
      where: {
        [Op.and]: {
          paciente_id,
          activo: true
        }
      },
    })
    return ficha
  },
  async create_ficha(paciente_id) {
    await fichasMedicasModel.create({ paciente_id })
  },
  async update_ficha(ficha_medica) {
    const ficha_editar = await fichasMedicasModel.findOne({
      where: {
        [Op.and]: {
          id: ficha_medica.id
        }
      }
    })
    await ficha_editar.update(ficha_medica)
  },
  async crear(req, res) {
    try {
      const { paciente_id, ficha_medica } = req.body;

      const ficha_existente = await fichasMedicasModel.findAll({
        where: {
          [Op.and]: {
            paciente_id,
            activo: true
          }
        }
      })

      if (ficha_existente.length > 0) {
        return res.status(500).send({ mensaje: "El paciente ya cuenta con una ficha médica." })
      }

      const ficha_creada = await fichasMedicasModel.create({
        paciente_id, ...ficha_medica
      })

      return res.status(200).json({ mensaje: "Ficha cread con éxito.", datos: ficha_creada })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      const { paciente_id, ficha_medica } = req.body
      const ficha_editar = await fichasMedicasModel.findOne({
        where: {
          [Op.and]: {
            paciente_id,
            activo: true
          }
        }
      })

      if (!ficha_editar) {
        return res.status(500).send({ mensaje: "No existe la ficha médica a editar." })
      }

      await ficha_editar.update(ficha_medica)

      return res.status(200).json({ mensaje: "Ficha médica editada con éxito.", datos: ficha_editar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  }
}