const controller = require("../controller/usuarios")

module.exports = (app) => {
  app.get('/usuario/prueba', controller.list);
};