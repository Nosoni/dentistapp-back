import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class pacientes extends Model {
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
      comment: "Nombre o nombres del paciente"
    },
    apellidos: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Apellidos o apellido del paciente"
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Fecha de nacimiento  del paciente"
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Dirección de domicilio del paciente"
    },
    ciudad: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "Ciudad de domicilio del paciente"
    },
    telefono: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "Número de telefono del paciente"
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Correo electrónico del paciente"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el paciente está o no activo"
    }
  }, {
    sequelize,
    tableName: 'pacientes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "paciente_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return pacientes;
  }
}
