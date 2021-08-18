import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class impuestos extends Model {
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
    codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "Código del impuesto"
    },
    descripcion: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Descripción del impuesto"
    },
    porcentaje: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      comment: "Porcentaje del impuesto"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el impuesto está o no activo"
    }
  }, {
    sequelize,
    tableName: 'impuestos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "impuesto_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return impuestos;
  }
}
