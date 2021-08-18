const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return fichas_medicas.init(sequelize, DataTypes);
}

class fichas_medicas extends Sequelize.Model {
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
    paciente_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a un paciente",
      references: {
        model: 'pacientes',
        key: 'id'
      }
    },
    otro_medico: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si está siendo atendido por otro médico"
    },
    otro_medico_obsevacion: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: "Observación en caso de ser atendido por otro médico"
    },
    psiquiatra: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si es atendido por un psiquiatra"
    },
    medicamento: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si está consumiendo algún medicamento"
    },
    medicamento_json: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "Listado de medicamentos"
    },
    alergia: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si es alérgico a algún medicamento o antibiótico"
    },
    reaccion_anestesia: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si ha tendido reacción con anestesia local"
    },
    diabetico: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si es diabético"
    },
    trastornos_convulsivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si tiene trastornos convulsivos"
    },
    hepatitis: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si padece o padeció hepatitis"
    },
    enfermedad_renal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Padece o padeció alguna enfermedad renal"
    },
    problema_cardiaco: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si padece o padeció algún problema cardiaco"
    },
    cancer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si padece o padeció cáncer"
    },
    intervencion_quirurgica: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si ha sido intervenido quirúrgicamente"
    },
    hospitalizado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si ha sido hospitalizado"
    },
    sangrado_excesivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si ha tenido algún sangrado excesivo"
    },
    hipertension: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si sufre de hipertensión"
    },
    transfusion_sangre: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si le han transfundido sangre"
    },
    problema_digestivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si tiene algún problema digestivo"
    },
    embarazada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si está embarazada, en caso de ser mujer"
    },
    anticonceptivos_orales: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si toma algún anticonceptivo de forma oral, en caso de ser mujer"
    },
    trastornos_periodo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si tiene trastornos con el periodo menstrual, en caso de ser mujer"
    },
    otra_enfermedad_trastorno: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si padece alguna otra enfermedad o trastornos no mencionados"
    },
    otra_enfermedad_trastornos_observacion: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: "Observación en caso de padecer alguna enfermedad o trastornos no listados"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si la ficha médica está o no activa"
    }
  }, {
    sequelize,
    tableName: 'fichas_medicas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ficha_medica_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return fichas_medicas;
  }
}
