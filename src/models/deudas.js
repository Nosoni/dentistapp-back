const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return deudas.init(sequelize, DataTypes);
}

class deudas extends Sequelize.Model {
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
    factura_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a la factura que genera la deuda",
      references: {
        model: 'facturas',
        key: 'id'
      }
    },
    fecha_insercion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Fecha en la que se realizó la inserción de la deuda"
    },
    fecha_vencimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Fecha de vencimiento de la deuda"
    },
    cuota_numero: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Cuota número de la deuda"
    },
    debe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Monto del debe"
    },
    haber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Monto del haber"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si la cita médica está o no activa"
    }
  }, {
    sequelize,
    tableName: 'deudas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "deuda_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return deudas;
  }
}
