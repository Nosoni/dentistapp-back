import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class pacientes_dientes_detalle extends Model {
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
    estado_detalle_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al estado del detalle del diente",
      references: {
        model: 'estados_movimientos',
        key: 'id'
      }
    },
    cara: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Indica el número de cara que corresponde el detalle"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el detalle del diente está o no activo"
    }
  }, {
    sequelize,
    tableName: 'pacientes_dientes_detalle',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "paciente_diente_detalle_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return pacientes_dientes_detalle;
  }
}
