import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class stock_actualizar extends Model {
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
      comment: "Fecha y hora del proceso de actualizacíon"
    },
    tipo_movimiento_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al tipo de movimiento",
      references: {
        model: 'tipos_movimientos_stock',
        key: 'id'
      }
    },
    comprobante: {
      type: DataTypes.STRING(15),
      allowNull: true,
      comment: "Comprobante del movimiento"
    },
    estado_movimiento_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al estado de movimiento",
      references: {
        model: 'estados_movimientos',
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
    tableName: 'stock_actualizar',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "stock_actualizar_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return stock_actualizar;
  }
}
