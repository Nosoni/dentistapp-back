const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return citas_medicas.init(sequelize, DataTypes);
}

class citas_medicas extends Sequelize.Model {
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
    paciente_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a un paciente",
      references: {
        model: 'pacientes',
        key: 'id'
      }
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "Fecha de inicio de la cita médica"
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "Fecha fin de la cita médica"
    },
    estado_cita_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al estado de la cita médica",
      references: {
        model: 'estados_movimientos',
        key: 'id'
      }
    },
    observacion: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Campo de observación de la reserva"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si la cita médica está o no activa"
    }
  }, {
    sequelize,
    tableName: 'citas_medicas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cita_medica_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return citas_medicas;
  }
}
