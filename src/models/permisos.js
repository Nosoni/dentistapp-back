import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class permisos extends Model {
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
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Nombre del permiso"
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Descripción del permiso"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el permiso está o no activo"
    }
  }, {
    sequelize,
    tableName: 'permisos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "permiso_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return permisos;
  }
}
