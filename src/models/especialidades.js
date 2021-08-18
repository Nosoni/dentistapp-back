import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class especialidades extends Model {
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
      comment: "Nombre de la especialidad"
    },
    descripcion: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Descripción de la especialidad"
    },
    especialidad_padre_id: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "Campo que hace referencia a una especialidad de mayor jerarquía",
      references: {
        model: 'especialidades',
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si la especialidad está o no activa"
    }
  }, {
    sequelize,
    tableName: 'especialidades',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "especialidad_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return especialidades;
  }
}
