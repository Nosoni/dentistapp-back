const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return presupuestos_detalle.init(sequelize, DataTypes);
}

class presupuestos_detalle extends Sequelize.Model {
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
    presupuesto_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al presupuesto",
      references: {
        model: 'presupuestos',
        key: 'id'
      }
    },
    paciente_diente_historial_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al historial médico a presupuestar",
      references: {
        model: 'pacientes_dientes_historial',
        key: 'id'
      }
    },
    precio: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Precio del tratamiento"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el detalle del presupuesto está o no activo"
    }
  }, {
    sequelize,
    tableName: 'presupuestos_detalle',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "presupuesto_detalle_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return presupuestos_detalle;
  }
}
