import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class usuarios_roles extends Model {
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
    usuario_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a un usuario",
      references: {
        model: 'usuarios',
        key: 'id'
      }
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
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el rol del usuario está o no activo"
    }
  }, {
    sequelize,
    tableName: 'usuarios_roles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuario_rol_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return usuarios_roles;
  }
}
