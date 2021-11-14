const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return estados_movimientos.init(sequelize, DataTypes);
}

class estados_movimientos extends Sequelize.Model {
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
    tabla_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "Nombre de la tabla"
    },
    estado_actual: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "Estado actual del proceso"
    },
    estado_anterior_id: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "Campo que hace referencia al estado anterior",
      references: {
        model: 'estados_movimientos',
        key: 'id'
      }
    },
    puede_avanzar: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Campo que indica si puede avanzar el proceso al siguiente estado"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el estado del movimiento está o no activo"
    }
  }, {
    sequelize,
    tableName: 'estados_movimientos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "estado_movimiento_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return estados_movimientos;
  }
}
