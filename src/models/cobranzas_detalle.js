const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return cobranzas_detalle.init(sequelize, DataTypes);
}

class cobranzas_detalle extends Sequelize.Model {
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
    cobranza_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a la cobranza",
      references: {
        model: 'cobranzas',
        key: 'id'
      }
    },
    deuda_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a una deuda",
      references: {
        model: 'deudas',
        key: 'id'
      }
    },
    monto: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Monto de pago"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el detalle de la cobranza está o no activo"
    }
  }, {
    sequelize,
    tableName: 'cobranzas_detalle',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cobranza_detalle_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return cobranzas_detalle;
  }
}
