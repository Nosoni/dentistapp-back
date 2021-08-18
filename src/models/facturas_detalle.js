const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return facturas_detalle.init(sequelize, DataTypes);
}

class facturas_detalle extends Sequelize.Model {
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
    factura_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a la factura",
      references: {
        model: 'facturas',
        key: 'id'
      }
    },
    paciente_diente_historial_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al historial médico a facturar",
      references: {
        model: 'pacientes_dientes_historial',
        key: 'id'
      }
    },
    precio: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Precio del tratamiento"
    },
    impuesto_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al impuesto",
      references: {
        model: 'impuestos',
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el detalle está o no activo"
    }
  }, {
    sequelize,
    tableName: 'facturas_detalle',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "factura_detalle_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return facturas_detalle;
  }
}
