import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class deudas_detalle extends Model {
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
    deuda_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a la deuda",
      references: {
        model: 'deudas',
        key: 'id'
      }
    },
    fecha_insercion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Fecha de inserción del detalle de la deuda"
    },
    cobranza_detalle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Campo que hace referencia al detalle de la cobranza",
      references: {
        model: 'cobranzas_detalle',
        key: 'id'
      }
    },
    debe: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Monto del debe"
    },
    haber: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Monto del haber"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el detalle de la deuda está o no activo"
    }
  }, {
    sequelize,
    tableName: 'deudas_detalle',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "deuda_detalle_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return deudas_detalle;
  }
}
