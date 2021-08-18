const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return dientes.init(sequelize, DataTypes);
}

class dientes extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Código identificador autogenerado",
      primaryKey: true
    },
    codigo: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: "Código del diente"
    },
    temporal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Determina si el diente es uno temporal"
    },
    cantidad_caras: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Determina la cantidad de caras del diente"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el diente está o no activo"
    }
  }, {
    sequelize,
    tableName: 'dientes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "diente_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return dientes;
  }
}
