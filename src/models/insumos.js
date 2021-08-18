import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class insumos extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "Nombre del insumo"
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Descripción del insumo"
    },
    codigo: {
      autoIncrement: true,
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Código del insumo"
    },
    cantidad_minima: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "Cantidad mínima del insumo en el stock"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el insumo está o no activo"
    }
  }, {
    sequelize,
    tableName: 'insumos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "insumo_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return insumos;
  }
}
