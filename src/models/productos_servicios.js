const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return productos_servicios.init(sequelize, DataTypes);
}

class productos_servicios extends Sequelize.Model {
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
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "Nombre del producto o servicio"
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Descripción del producto o servicio"
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Precio del producto o servicio"
    },
    cantidad_minima: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "Cantidad mínima del producto en el stock"
    },
    es_servicio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si es o no un servicio"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Indica si el producto o servicio está o no activa"
    }
  }, {
    sequelize,
    tableName: 'productos_servicios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "producto_servicio_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return productos_servicios;
  }
}
