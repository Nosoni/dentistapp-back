const fichasMedicasModel = require("../models/inicializar_modelos").fichas_medicas;
const { Op } = require("sequelize")

module.exports = {
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
      const { id, } = req.body
      const ficha_editar = await fichasMedicasModel.findOne({
        where: {
          [Op.and]: {
            id: id,
            activo: true
          }
        }
      })

      if (ficha_editar.length == 0) {
        return res.status(500).send({ mensaje: "No existe la ficha médica a editar." })
      }

      ficha_editar.id = id //cambiar

      //await ficha_editar.save()

      return res.status(200).json({ mensaje: "Ficha médica editada con éxito.", datos: ficha_editar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async eliminar(req, res) {
    const id = req.params.id

    if (!id) {
      return res.status(500).json({ mensaje: "No es posible procesar solicitud." })
    }

    const ficha_eliminar = await fichasMedicasModel.findOne({
      where: {
        [Op.and]: {
          id: id,
          activo: true
        }
      }
    })

    if (ficha_eliminar.length == 0) {
      return res.status(500).send({ mensaje: "No existe la ficha médica a eliminar." })
    }

    ficha_eliminar.activo = false
    await ficha_eliminar.save()

    return res.status(200).json({ mensaje: "Ficha médica eliminada con éxito." })
  },
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
  async filtrar(req, res) {
    try {
      const { paciente_id } = req.params;
      const fichas_filtradas = await fichasMedicasModel.findAll({
        where: {
          [Op.and]: {
            paciente_id,
            activo: true
          }
        },
      })

      return res.status(200).json({ datos: fichas_filtradas })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
}