import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tipos_documentos extends Model {
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
    descripcion: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "Campo que representa la descripción del tipo de documento"
    },
    abreviacion: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: "Campo que representa el tipo de documento abreviado"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el tipo de documento está o no activo"
    }
  }, {
    sequelize,
    tableName: 'tipos_documentos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tipo_documento_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return tipos_documentos;
  }
}
