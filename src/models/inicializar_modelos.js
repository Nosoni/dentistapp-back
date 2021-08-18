var initModels = require("./init_models");
const Sequelize = require('sequelize');
let sequelize = new Sequelize('dentistapp', 'dentistapp', 'copernicus', {
    dialect: 'postgres',
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false
    },
});

models = initModels(sequelize);

module.exports = models;