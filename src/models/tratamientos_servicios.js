import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tratamientos_servicios extends Model {
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
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "Nombre del tratamiento o servicio"
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Descripción del tratamiento o servicio"
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Precio del tratamiento o servicio"
    },
    tiempo: {
      type: DataTypes.TIME,
      allowNull: true,
      comment: "Tiempo que conlleva la atención del tratamiento o servicio"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el tratamiento o servicio está o no activa"
    }
  }, {
    sequelize,
    tableName: 'tratamientos_servicios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tratamiento_servicio_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return tratamientos_servicios;
  }
}
