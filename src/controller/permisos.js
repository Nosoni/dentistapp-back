var models = require("../models/inicializar_modelos").permisos;

module.exports = {
  list(_, res) {
    return models.findAll({})
      .then(result => res.status(200).send(result))
      .catch(() => res.status(400).send("error"));
  }
}