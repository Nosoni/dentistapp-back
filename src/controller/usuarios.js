var models = require("../models/inicializar_modelos").usuarios;

module.exports = {
  listar(_, res) {
    return models.findAll({})
      .then(result => res.status(200).send(result))
      .catch(() => res.status(400).send("error"));
  },
  filtrar(req, res) {
    return models.findAll({
      where: {
        usuario: req.params.usuario,
      }
    })
      .then(result => res.status(200).send(result))
      .catch(() => res.status(400).send("error"))
  },
}