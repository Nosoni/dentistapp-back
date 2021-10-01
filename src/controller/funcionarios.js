const funcionarioModel = require("../models/inicializar_modelos").funcionarios;
let moment = require('moment');
const { Op } = require("sequelize")

module.exports = {
  async crear(req, res) {
    try {
      const { apellidos, ciudad, direccion, documento,
        email, fecha_ingreso, nombres, telefono, tipo_documento_id } = req.body;

      //validar propiedades obligatorias
      if (!documento || !tipo_documento_id || !nombres || !apellidos) {
        return res.status(500).json({ mensaje: "Verificar datos del funcionario" })
      }

      const exite = funcionarioModel.findOne({
        where: {
          documento
        }
      })

      if (exite.length > 0) {
        return res.status(409).send({ mensaje: "Ya existe dicho funcionario." })
      }

      const funcionario = await funcionarioModel.create({
        apellidos, ciudad, direccion, documento,
        email, fecha_ingreso, nombres, telefono, tipo_documento_id
      })

      return res.status(200).json({ mensaje: "Funcionario creado con éxito.", datos: funcionario })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      const { id, apellidos, ciudad, direccion,
        email, fecha_ingreso, nombres, telefono, tipo_documento_id } = req.body;

      const funcionario_editar = await funcionarioModel.findOne({
        where: {
          [Op.and]: {
            id: id,
            activo: true
          }
        }
      })

      if (funcionario_editar.length == 0) {
        return res.status(409).send({ mensaje: "No existe el funcionario a editar." })
      }

      funcionario_editar.apellidos = apellidos
      funcionario_editar.ciudad = ciudad
      funcionario_editar.direccion = direccion
      funcionario_editar.email = email
      funcionario_editar.fecha_ingreso = moment.utc(fecha_ingreso)
      funcionario_editar.nombres = nombres
      funcionario_editar.telefono = telefono
      funcionario_editar.tipo_documento_id = tipo_documento_id

      await funcionario_editar.save()

      return res.status(200).json({ mensaje: "Funcionario editado con éxito.", datos: funcionario_editar })
    } catch (error) {
      return res.status(500).json({ mensaje: error.message })
    }
  },
  async eliminar(req, res) {
    const id = req.params.id

    if (!id) {
      return res.status(500).json({ mensaje: "No es posible procesar solicitud." })
    }
    const funcionario_eliminar = await funcionarioModel.findOne({
      where: {
        [Op.and]: {
          id: id,
          activo: true
        }
      }
    })

    if (!funcionario_eliminar) {
      return res.status(409).send({ mensaje: "No existe el funcionario a eliminar." })
    }

    funcionario_eliminar.activo = false
    await funcionario_eliminar.save()

    return res.status(200).json({ mensaje: "Funcionario eliminado con éxito." })
  },
  async filtrar(req, res) {
    try {
      const { filtro } = req.params;
      const funcionariosFiltrados = await funcionarioModel.findAll({
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

      return res.status(200).json({ datos: funcionariosFiltrados })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listar(_, res) {
    try {
      const funcionarioLista = await funcionarioModel.findAll({
        where: { activo: true },
        order: [
          ['nombres', 'ASC'],
        ],
      });
      return res.status(200).json({ datos: funcionarioLista })
    } catch (error) {
      return res.status(400).send({ mensaje: error.message })
    }
  },
}