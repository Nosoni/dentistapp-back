import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tipos_movimientos_stock extends Model {
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
    nombre: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "Nombre del tipo de movimiento de stock"
    },
    descripcion: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Descripción del tipo de movimiento de stock"
    },
    signo: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      comment: "Valor numérico. Indica cómo se comportará el movimiento."
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el tipo de movimiento está o no activo"
    }
  }, {
    sequelize,
    tableName: 'tipos_movimientos_stock',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tipo_movimiento_stock_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return tipos_movimientos_stock;
  }
}
