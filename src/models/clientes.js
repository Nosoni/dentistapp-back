const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return clientes.init(sequelize, DataTypes);
}

class clientes extends Sequelize.Model {
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
    documento: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "Campo que representa al número de documento"
    },
    tipo_documento_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al tipo de documento",
      references: {
        model: 'tipos_documentos',
        key: 'id'
      }
    },
    nombres: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Nombre o nombres del cliente"
    },
    apellidos: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Apellidos o apellido del cliente"
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Dirección de domicilio del cliente"
    },
    ciudad: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "Ciudad de domicilio del cliente"
    },
    telefono: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "Número de telefono del cliente"
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Correo electrónico del cliente"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el cliente está o no activo"
    }
  }, {
    sequelize,
    tableName: 'clientes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cliente_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return clientes;
  }
}
