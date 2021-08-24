const controller = require("../controller/usuarios")
const servicio = "usuarios";

module.exports = (app) => {
  app.post(`/${servicio}/crear`, controller.crear)
  app.get(`/${servicio}/listar`, controller.listar)
  app.get(`/${servicio}/filtrar/:usuario`, controller.filtrar)
};