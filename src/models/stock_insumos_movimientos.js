const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return stock_insumos_movimientos.init(sequelize, DataTypes);
}

class stock_insumos_movimientos extends Sequelize.Model {
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
    insumo_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a un insumo",
      references: {
        model: 'insumos',
        key: 'id'
      }
    },
    stock_actualizar_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Campo que hace referencia al registro desde donde se realizó la actualización",
      references: {
        model: 'stock_actualizar',
        key: 'id'
      }
    },
    stock_actualizar_detalle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Campo que hace referencia al registro del detalle desde donde se realizó la actualización",
      references: {
        model: 'stock_actualizar_detalle',
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
    tableName: 'stock_insumos_movimientos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "stock_insumo_movimiento_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return stock_insumos_movimientos;
  }
}
