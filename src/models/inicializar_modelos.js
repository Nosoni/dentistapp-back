const initModels = require("./init_models");
const Sequelize = require('sequelize');
const config = require('../configuraciones/index').credenciales
const sequelize = new Sequelize(config.database, config.user, config.password, config.config);

models = initModels(sequelize);

module.exports = models;