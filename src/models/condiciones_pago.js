const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return condiciones_pago.init(sequelize, DataTypes);
}

class condiciones_pago extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Código identificador autogenerado",
      primaryKey: true
    },
    codigo: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "Descripción de la condición de pago"
    },
    cuotas: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Cantidad de cuotas de la condición de pago"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si la condición de pago está o no activa"
    }
  }, {
    sequelize,
    tableName: 'condiciones_pago',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "condicion_pago_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return condiciones_pago;
  }
}
