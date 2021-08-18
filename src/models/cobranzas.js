const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return cobranzas.init(sequelize, DataTypes);
}

class cobranzas extends Sequelize.Model {
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
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Fecha de la cobranza"
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
    estado_cobranza_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al estado de la cobranza",
      references: {
        model: 'estados_movimientos',
        key: 'id'
      }
    },
    comprobante: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "Comprobante de la cobranza"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si la cobranza está o no activa"
    }
  }, {
    sequelize,
    tableName: 'cobranzas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cobranza_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return cobranzas;
  }
}
