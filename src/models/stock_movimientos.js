const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return stock_movimientos.init(sequelize, DataTypes);
}

class stock_movimientos extends Sequelize.Model {
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
    producto_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a un producto",
      references: {
        model: 'productos_servicios',
        key: 'id'
      }
    },
    stock_actualizar_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Campo que hace referencia al registro de actualización",
      references: {
        model: 'stock_actualizar',
        key: 'id'
      }
    },
    stock_actualizar_detalle_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Campo que hace referencia al registro del detalle de actualización",
      references: {
        model: 'stock_actualizar_detalle',
        key: 'id'
      }
    },
    factura_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Campo que hace referencia al registro de facturación",
      references: {
        model: 'facturas',
        key: 'id'
      }
    },
    factura_detalle_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Campo que hace referencia al registro del detalle de facturación",
      references: {
        model: 'facturas_detalle',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Cantidad del movimiento"
    },
    fecha_insercion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Fecha en la que se realizó la inserción del movimiento"
    },
    fecha_movimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Fecha del movimiento"
    },
    usuario_id: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "Campo que hace referencia al usuario que realizó la actualización",
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el movimiento está o no activo"
    }
  }, {
    sequelize,
    tableName: 'stock_movimientos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "stock_movimiento_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return stock_movimientos;
  }
}
