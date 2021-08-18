const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return pacientes_dientes.init(sequelize, DataTypes);
}

class pacientes_dientes extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Código identificador autogenerado",
      primaryKey: true
    },
    paciente_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a un paciente",
      references: {
        model: 'pacientes',
        key: 'id'
      }
    },
    diente_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a un diente",
      references: {
        model: 'dientes',
        key: 'id'
      }
    },
    estado_diente_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al estado del diente",
      references: {
        model: 'estados_movimientos',
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el diente del paciente está o no activo"
    }
  }, {
    sequelize,
    tableName: 'pacientes_dientes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "paciente_diente_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return pacientes_dientes;
  }
}
