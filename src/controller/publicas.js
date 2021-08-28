const models = require("../models/inicializar_modelos").usuarios;
const bcrypt = require("bcrypt")
const { Op } = require("sequelize")
const jwt = require("jsonwebtoken")

module.exports = {
  async login(req, res) {
    try {
      const { usuario, password } = req.body;
      const usuarioFiltrado = await models.findAll({
        where: {
          usuario: {
            [Op.eq]: usuario,
            //todo and activo
          }
        }
      })

      if (usuarioFiltrado.length == 0) {
        return res.status(409).send("Usuario ingresado inválido.")
      }

      let mach = await bcrypt.compareSync(password, usuarioFiltrado[0].password);
      if (!mach) {
        return res.status(409).send("Contraseña ingresada inválida.")
      }

      const llaveSecreta = req.app.get("llaveSecreta");

      const token = jwt.sign(usuarioFiltrado[0].dataValues, llaveSecreta, {
        expiresIn: "1m"
      });

      let retornarUsuario = {
        usuario: { id: usuarioFiltrado[0].id, usuario },
        token
      }

      return res.status(200).json(retornarUsuario)
    } catch (error) {
      return res.status(400).send("error")
    }
  },
}