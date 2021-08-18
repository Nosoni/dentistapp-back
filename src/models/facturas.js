import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class facturas extends Model {
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
      comment: "Fecha de la factura"
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
    estado_factura_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia al estado de la factura",
      references: {
        model: 'estados_movimientos',
        key: 'id'
      }
    },
    comprobante: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "Comprobante de la factura"
    },
    condicion_pago_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "Campo que hace referencia a una condición de pago",
      references: {
        model: 'condiciones_pago',
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si la factura está o no activa"
    }
  }, {
    sequelize,
    tableName: 'facturas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "factura_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return facturas;
  }
}
