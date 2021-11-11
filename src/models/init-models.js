var DataTypes = require("sequelize").DataTypes;
var _citas_medicas = require("./citas_medicas");

function initModels(sequelize) {
  var citas_medicas = _citas_medicas(sequelize, DataTypes);

  citas_medicas.belongsTo(estados_movimientos, { as: "estado_citum", foreignKey: "estado_cita_id"});
  estados_movimientos.hasMany(citas_medicas, { as: "citas_medicas", foreignKey: "estado_cita_id"});
  citas_medicas.belongsTo(pacientes, { as: "paciente", foreignKey: "paciente_id"});
  pacientes.hasMany(citas_medicas, { as: "citas_medicas", foreignKey: "paciente_id"});
  citas_medicas.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(citas_medicas, { as: "citas_medicas", foreignKey: "usuario_id"});

  return {
    citas_medicas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
