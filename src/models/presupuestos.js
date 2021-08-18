const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return presupuestos.init(sequelize, DataTypes);
}

class presupuestos extends Sequelize.Model {
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
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Fecha del proceso de presupuestar"
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
    estado_presupuesto_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al estado del presupuesto",
      references: {
        model: 'estados_movimientos',
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el proceso de presupuestar está o no activo"
    }
  }, {
    sequelize,
    tableName: 'presupuestos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "presupuesto_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return presupuestos;
  }
}
