const usuariosController = require('../controllers/usuarios');

module.exports = (app) => {
  app.get('/usuario', (req, res) => res.status(200).send({
    message: 'Example project did not give you access to the api web services',
  }));
  //app.post('/api/usuario/create/username/:username/status/:status', usuarioController.create);
  app.get('/usuario/list', usuariosController.list);
  //app.get('/api/usuario/find/username/:username', usuarioController.find);
};