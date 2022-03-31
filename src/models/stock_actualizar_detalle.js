const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return stock_actualizar_detalle.init(sequelize, DataTypes);
}

class stock_actualizar_detalle extends Sequelize.Model {
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
    stock_actualizar_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al stock de actualización",
      references: {
        model: 'stock_actualizar',
        key: 'id'
      }
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
    cantidad: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Cantidad para actualizar el stock"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el detalle del proceso de actualización está o no activo"
    }
  }, {
    sequelize,
    tableName: 'stock_actualizar_detalle',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "stock_actualizar_detalle_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return stock_actualizar_detalle;
  }
}
