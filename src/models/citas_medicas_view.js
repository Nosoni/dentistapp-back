const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return citas_medicas_view.init(sequelize, DataTypes);
}

class citas_medicas_view extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    cita_medica_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    paciente_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    paciente: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estado_cita_id: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    estado_actual: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    puede_avanzar: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    observacion: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'citas_medicas_view',
    schema: 'public',
    timestamps: false
  });
  return citas_medicas_view;
  }
}
