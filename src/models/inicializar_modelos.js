const initModels = require("./init_models");
const Sequelize = require('sequelize');
const config = require('../configuraciones/index').credenciales
const sequelize = new Sequelize("postgres://sxdgokxqutdojv:f9ca45583846422d43de9823204039c7d18eea5d9f763d1d134c5571566b430c@ec2-44-197-94-126.compute-1.amazonaws.com:5432/duntuu8j9cm2p",
 config.config);

models = initModels(sequelize);

module.exports = models;