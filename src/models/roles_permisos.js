import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class roles_permisos extends Model {
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
    rol_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a un rol",
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    permiso_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a un permiso",
      references: {
        model: 'permisos',
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el permiso está o no activo para el rol"
    }
  }, {
    sequelize,
    tableName: 'roles_permisos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "rol_permiso_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return roles_permisos;
  }
}
