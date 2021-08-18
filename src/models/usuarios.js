const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return usuarios.init(sequelize, DataTypes);
}

class usuarios extends Sequelize.Model {
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
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Alias del usuario"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Texto secreto que valida al usuario"
    },
    funcionario_id: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "Campo que hace referencia a un funcionario",
      references: {
        model: 'funcionarios',
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el usuario está o no activo"
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuario_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return usuarios;
  }
}
