const clienteModel = require("../models/inicializar_modelos").clientes;
const { Op } = require("sequelize")
const objectHasValue = require("../helpers/index").objectHasValue
const Yup = require('yup');

const schemaYup = Yup.object().shape({
  documento: Yup.string().required("El documento es requerido").max(10, "La cantidad de caracteres en el documento supera lo permitido").typeError("El valor en el documento no es válido"),
  tipo_documento_id: Yup.number().required("El tipo de documento es requerido").typeError("Valor no válido en tipo de documento"),
  nombres: Yup.string().required("El nombre es requerido").max(50, "La cantidad de caracteres en el nombre supera lo permitido").typeError("El valor en el nombre no es válido"),
  apellidos: Yup.string().required("El apellido es requerido").max(50, "La cantidad de caracteres en el apellido supera lo permitido").typeError("El valor en el apellido no es válido"),
  direccion: Yup.string().max(100, "La cantidad de caracteres en la dirección supera lo permitido").typeError("El valor en la dirección no es válido"),
  ciudad: Yup.string().max(20, "La cantidad de caracteres en la ciudad supera lo permitido").typeError("El valor en la ciudad no es válido"),
  telefono: Yup.string().max(10, "La cantidad de caracteres en el telefono supera lo permitido").typeError("El valor en el telefono no es válido"),
  email: Yup.string().max(50, "La cantidad de caracteres en el email supera lo permitido").typeError("El valor en el email no es válido")
});


module.exports = {
  async crear(req, res) {
    try {
      console.log(req.body)

      await schemaYup.validate(req.body, { strict: true })

      const { apellidos, ciudad, direccion, documento, email,
        nombres, telefono, tipo_documento_id } = req.body;

      const exite = await clienteModel.findOne({
        where: {
          documento: { [Op.iLike]: `${documento}` },
          activo: true
        }
      })

      if (exite) {
        return res.status(500).send({ mensaje: "Ya existe un cliente con el mismo documento." })
      }

      const cliente = await clienteModel.create({
        apellidos, ciudad, direccion, documento, email,
        nombres, telefono, tipo_documento_id
      })

      return res.status(200).send({ mensaje: "Cliente creado con éxito.", datos: cliente })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async editar(req, res) {
    try {
      await schemaYup.validate(req.body, { strict: true })

      const { id, apellidos, ciudad, direccion, documento, email,
        nombres, telefono, tipo_documento_id } = req.body;

      if (!id) {
        return res.status(500).send({ mensaje: "No es posible procesar solicitud." })
      }

      const existe = await clienteModel.findOne({
        where: {
          [Op.and]: {
            id: { [Op.ne]: id },
            documento: { [Op.iLike]: `${documento}` },
            activo: true
          }
        }
      })

      if (existe) {
        return res.status(500).send({ mensaje: "Ya existe un cliente con el mismo documento." })
      }

      const editar = await clienteModel.findOne({
        where: {
          [Op.and]: {
            id,
            activo: true
          }
        }
      })

      if (!editar) {
        return res.status(500).send({ mensaje: "No existe el cliente a editar." })
      }

      await editar.update({
        apellidos, ciudad, direccion, documento, email,
        nombres, telefono, tipo_documento_id
      })

      return res.status(200).send({ mensaje: "Cliente editado con éxito.", datos: editar })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async eliminar(req, res) {
    try {
      const id = req.params.id

      if (!id) {
        return res.status(500).send({ mensaje: "No es posible procesar solicitud." })
      }

      const eliminar = await clienteModel.findOne({
        where: {
          [Op.and]: {
            id,
            activo: true
          }
        }
      })

      if (!eliminar) {
        return res.status(500).send({ mensaje: "No existe el cliente a eliminar." })
      }

      await eliminar.update({ activo: false })

      return res.status(200).send({ mensaje: "Paciente eliminado con éxito." })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async filtrar(req, res) {
    try {
      const { filtro } = req.params;

      if (!filtro) {
        return res.status(500).send({ mensaje: "No es posible procesar solicitud." })
      }

      const filtrados = await clienteModel.findAll({
        where: {
          [Op.and]: {
            [Op.or]: {
              documento: { [Op.iLike]: `%${filtro}%` },
              nombres: { [Op.iLike]: `%${filtro}%` },
              apellidos: { [Op.iLike]: `%${filtro}%` },
            },
            activo: true
          }
        },
        order: [
          ['documento', 'ASC'],
        ],
      })

      return res.status(200).send({ datos: filtrados })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async listar(_, res) {
    try {
      const listado = await clienteModel.findAll({ where: { activo: true }, order: [['nombres', 'ASC']] });

      return res.status(200).send({ datos: listado })
    } catch (error) {
      return res.status(500).send({ mensaje: error.message })
    }
  },
  async reporteClientes(filtro) {
    try {
      let filtrados;

      if (objectHasValue(filtro)) {
        filtrados = await clienteModel.findAll({
          where: {
            [Op.and]: {
              [Op.or]: {
                documento: { [Op.iLike]: `%${filtro}%` },
                nombres: { [Op.iLike]: `%${filtro}%` },
                apellidos: { [Op.iLike]: `%${filtro}%` },
              },
              activo: true
            }
          },
          order: [
            ['documento', 'ASC'],
          ],
        })
      } else {
        filtrados = await clienteModel.findAll({ where: { activo: true }, order: [['nombres', 'ASC']] });
      }

      return filtrados
    } catch (error) {
      console.log(error)
    }
  },
}