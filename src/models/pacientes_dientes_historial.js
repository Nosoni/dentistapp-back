import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class pacientes_dientes_historial extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Código identificador autogenerado",
      primaryKey: true
    },
    paciente_diente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Campo que hace referencia al diente del paciente",
      references: {
        model: 'pacientes_dientes',
        key: 'id'
      }
    },
    tratamiento_servicio_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al tratamiento o servicio hecho o pendiente de realizar",
      references: {
        model: 'tratamientos_servicios',
        key: 'id'
      }
    },
    estado_historial_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al estado del historial del diente",
      references: {
        model: 'estados_movimientos',
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el historia del diente está o no activo"
    }
  }, {
    sequelize,
    tableName: 'pacientes_dientes_historial',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "paciente_diente_historial_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return pacientes_dientes_historial;
  }
}
