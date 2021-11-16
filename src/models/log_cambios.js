const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return log_cambios.init(sequelize, DataTypes);
}

class log_cambios extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    anterior: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: "Valor anterior al cambio"
    },
    posterior: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: "Valor posterior al cambio"
    },
    tabla_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Nombre de la tabla que realiza el cambio"
    },
    registro_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Id del registro que realiza el cambio"
    },
    usuario_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que representa al usuario que realizó el cambio",
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Fecha y hora del cambio"
    }
  }, {
    sequelize,
    tableName: 'log_cambios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "log_cambios_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return log_cambios;
  }
}
