const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return roles.init(sequelize, DataTypes);
}

class roles extends Sequelize.Model {
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
      comment: "Nombre del rol"
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Descripción del rol"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el rol está o no activo"
    }
  }, {
    sequelize,
    tableName: 'roles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "rol_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return roles;
  }
}
