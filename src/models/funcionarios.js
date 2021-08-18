const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return funcionarios.init(sequelize, DataTypes);
}

class funcionarios extends Sequelize.Model {
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
      comment: "Nombre o nombres del funcionario"
    },
    apellidos: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Apellidos o apellido del funcionario"
    },
    fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Fecha de ingreso del funcionario"
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Dirección de domicilio del funcionario"
    },
    ciudad: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "Ciudad de domicilio del funcionario"
    },
    telefono: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "Número de telefono del funcionario"
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Correo electrónico del funcionario"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el funcionario está o no activo"
    }
  }, {
    sequelize,
    tableName: 'funcionarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "funcionario_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return funcionarios;
  }
}
