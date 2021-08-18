import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class doctores_especialidades extends Model {
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
    doctor_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a un doctor",
      references: {
        model: 'doctores',
        key: 'id'
      }
    },
    especialidad_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a una especialidad",
      references: {
        model: 'especialidades',
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si la especialidad del doctor está o no activo"
    }
  }, {
    sequelize,
    tableName: 'doctores_especialidades',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "doctor_especialidad_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return doctores_especialidades;
  }
}
