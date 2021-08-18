const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return doctores.init(sequelize, DataTypes);
}

class doctores extends Sequelize.Model {
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
    funcionario_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a un funcionario",
      references: {
        model: 'funcionarios',
        key: 'id'
      }
    },
    registro_profesional: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "Registro del profecional"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el doctor está o no activo"
    }
  }, {
    sequelize,
    tableName: 'doctores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "doctor_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return doctores;
  }
}
