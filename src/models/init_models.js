var DataTypes = require("sequelize").DataTypes;
var _citas_medicas = require("./citas_medicas");
var _citas_medicas_view = require("./citas_medicas_view");
var _cobranzas = require("./cobranzas");
var _cobranzas_detalle = require("./cobranzas_detalle");
var _condiciones_pago = require("./condiciones_pago");
var _deudas = require("./deudas");
var _deudas_detalle = require("./deudas_detalle");
var _dientes = require("./dientes");
var _doctores = require("./doctores");
var _doctores_especialidades = require("./doctores_especialidades");
var _especialidades = require("./especialidades");
var _estados_movimientos = require("./estados_movimientos");
var _facturas = require("./facturas");
var _facturas_detalle = require("./facturas_detalle");
var _fichas_medicas = require("./fichas_medicas");
var _funcionarios = require("./funcionarios");
var _impuestos = require("./impuestos");
var _insumos = require("./insumos");
var _log_cambios = require("./log_cambios");
var _pacientes = require("./pacientes");
var _pacientes_dientes = require("./pacientes_dientes");
var _pacientes_dientes_detalle = require("./pacientes_dientes_detalle");
var _pacientes_dientes_historial = require("./pacientes_dientes_historial");
var _permisos = require("./permisos");
var _presupuestos = require("./presupuestos");
var _presupuestos_detalle = require("./presupuestos_detalle");
var _roles = require("./roles");
var _roles_permisos = require("./roles_permisos");
var _stock_actualizar = require("./stock_actualizar");
var _stock_actualizar_detalle = require("./stock_actualizar_detalle");
var _stock_insumos_movimientos = require("./stock_insumos_movimientos");
var _tipos_documentos = require("./tipos_documentos");
var _tipos_movimientos_stock = require("./tipos_movimientos_stock");
var _tratamientos_servicios = require("./tratamientos_servicios");
var _usuarios = require("./usuarios");
var _usuarios_roles = require("./usuarios_roles");

function initModels(sequelize) {
  var citas_medicas = _citas_medicas(sequelize, DataTypes);
  var citas_medicas_view = _citas_medicas_view(sequelize, DataTypes);
  var cobranzas = _cobranzas(sequelize, DataTypes);
  var cobranzas_detalle = _cobranzas_detalle(sequelize, DataTypes);
  var condiciones_pago = _condiciones_pago(sequelize, DataTypes);
  var deudas = _deudas(sequelize, DataTypes);
  var deudas_detalle = _deudas_detalle(sequelize, DataTypes);
  var dientes = _dientes(sequelize, DataTypes);
  var doctores = _doctores(sequelize, DataTypes);
  var doctores_especialidades = _doctores_especialidades(sequelize, DataTypes);
  var especialidades = _especialidades(sequelize, DataTypes);
  var estados_movimientos = _estados_movimientos(sequelize, DataTypes);
  var facturas = _facturas(sequelize, DataTypes);
  var facturas_detalle = _facturas_detalle(sequelize, DataTypes);
  var fichas_medicas = _fichas_medicas(sequelize, DataTypes);
  var funcionarios = _funcionarios(sequelize, DataTypes);
  var impuestos = _impuestos(sequelize, DataTypes);
  var insumos = _insumos(sequelize, DataTypes);
  var log_cambios = _log_cambios(sequelize, DataTypes);
  var pacientes = _pacientes(sequelize, DataTypes);
  var pacientes_dientes = _pacientes_dientes(sequelize, DataTypes);
  var pacientes_dientes_detalle = _pacientes_dientes_detalle(sequelize, DataTypes);
  var pacientes_dientes_historial = _pacientes_dientes_historial(sequelize, DataTypes);
  var permisos = _permisos(sequelize, DataTypes);
  var presupuestos = _presupuestos(sequelize, DataTypes);
  var presupuestos_detalle = _presupuestos_detalle(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var roles_permisos = _roles_permisos(sequelize, DataTypes);
  var stock_actualizar = _stock_actualizar(sequelize, DataTypes);
  var stock_actualizar_detalle = _stock_actualizar_detalle(sequelize, DataTypes);
  var stock_insumos_movimientos = _stock_insumos_movimientos(sequelize, DataTypes);
  var tipos_documentos = _tipos_documentos(sequelize, DataTypes);
  var tipos_movimientos_stock = _tipos_movimientos_stock(sequelize, DataTypes);
  var tratamientos_servicios = _tratamientos_servicios(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var usuarios_roles = _usuarios_roles(sequelize, DataTypes);

  cobranzas_detalle.belongsTo(cobranzas, { as: "cobranza", foreignKey: "cobranza_id"});
  cobranzas.hasMany(cobranzas_detalle, { as: "cobranzas_detalles", foreignKey: "cobranza_id"});
  deudas_detalle.belongsTo(cobranzas_detalle, { as: "cobranza_detalle", foreignKey: "cobranza_detalle_id"});
  cobranzas_detalle.hasMany(deudas_detalle, { as: "deudas_detalles", foreignKey: "cobranza_detalle_id"});
  facturas.belongsTo(condiciones_pago, { as: "condicion_pago", foreignKey: "condicion_pago_id"});
  condiciones_pago.hasMany(facturas, { as: "facturas", foreignKey: "condicion_pago_id"});
  cobranzas_detalle.belongsTo(deudas, { as: "deuda", foreignKey: "deuda_id"});
  deudas.hasMany(cobranzas_detalle, { as: "cobranzas_detalles", foreignKey: "deuda_id"});
  deudas_detalle.belongsTo(deudas, { as: "deuda", foreignKey: "deuda_id"});
  deudas.hasMany(deudas_detalle, { as: "deudas_detalles", foreignKey: "deuda_id"});
  pacientes_dientes.belongsTo(dientes, { as: "diente", foreignKey: "diente_id"});
  dientes.hasMany(pacientes_dientes, { as: "pacientes_dientes", foreignKey: "diente_id"});
  doctores_especialidades.belongsTo(doctores, { as: "doctor", foreignKey: "doctor_id"});
  doctores.hasMany(doctores_especialidades, { as: "doctores_especialidades", foreignKey: "doctor_id"});
  doctores_especialidades.belongsTo(especialidades, { as: "especialidad", foreignKey: "especialidad_id"});
  especialidades.hasMany(doctores_especialidades, { as: "doctores_especialidades", foreignKey: "especialidad_id"});
  especialidades.belongsTo(especialidades, { as: "especialidad_padre", foreignKey: "especialidad_padre_id"});
  especialidades.hasMany(especialidades, { as: "especialidades", foreignKey: "especialidad_padre_id"});
  citas_medicas.belongsTo(estados_movimientos, { as: "estado_citum", foreignKey: "estado_cita_id"});
  estados_movimientos.hasMany(citas_medicas, { as: "citas_medicas", foreignKey: "estado_cita_id"});
  cobranzas.belongsTo(estados_movimientos, { as: "estado_cobranza", foreignKey: "estado_cobranza_id"});
  estados_movimientos.hasMany(cobranzas, { as: "cobranzas", foreignKey: "estado_cobranza_id"});
  estados_movimientos.belongsTo(estados_movimientos, { as: "estado_anterior", foreignKey: "estado_anterior_id"});
  estados_movimientos.hasMany(estados_movimientos, { as: "estados_movimientos", foreignKey: "estado_anterior_id"});
  facturas.belongsTo(estados_movimientos, { as: "estado_factura", foreignKey: "estado_factura_id"});
  estados_movimientos.hasMany(facturas, { as: "facturas", foreignKey: "estado_factura_id"});
  pacientes_dientes.belongsTo(estados_movimientos, { as: "estado_diente", foreignKey: "estado_diente_id"});
  estados_movimientos.hasMany(pacientes_dientes, { as: "pacientes_dientes", foreignKey: "estado_diente_id"});
  pacientes_dientes_detalle.belongsTo(estados_movimientos, { as: "estado_detalle", foreignKey: "estado_detalle_id"});
  estados_movimientos.hasMany(pacientes_dientes_detalle, { as: "pacientes_dientes_detalles", foreignKey: "estado_detalle_id"});
  pacientes_dientes_historial.belongsTo(estados_movimientos, { as: "estado_historial", foreignKey: "estado_historial_id"});
  estados_movimientos.hasMany(pacientes_dientes_historial, { as: "pacientes_dientes_historials", foreignKey: "estado_historial_id"});
  presupuestos.belongsTo(estados_movimientos, { as: "estado_presupuesto", foreignKey: "estado_presupuesto_id"});
  estados_movimientos.hasMany(presupuestos, { as: "presupuestos", foreignKey: "estado_presupuesto_id"});
  stock_actualizar.belongsTo(estados_movimientos, { as: "estado_movimiento", foreignKey: "estado_movimiento_id"});
  estados_movimientos.hasMany(stock_actualizar, { as: "stock_actualizars", foreignKey: "estado_movimiento_id"});
  deudas.belongsTo(facturas, { as: "factura", foreignKey: "factura_id"});
  facturas.hasMany(deudas, { as: "deudas", foreignKey: "factura_id"});
  facturas_detalle.belongsTo(facturas, { as: "factura", foreignKey: "factura_id"});
  facturas.hasMany(facturas_detalle, { as: "facturas_detalles", foreignKey: "factura_id"});
  doctores.belongsTo(funcionarios, { as: "funcionario", foreignKey: "funcionario_id"});
  funcionarios.hasMany(doctores, { as: "doctores", foreignKey: "funcionario_id"});
  usuarios.belongsTo(funcionarios, { as: "funcionario", foreignKey: "funcionario_id"});
  funcionarios.hasMany(usuarios, { as: "usuarios", foreignKey: "funcionario_id"});
  facturas_detalle.belongsTo(impuestos, { as: "impuesto", foreignKey: "impuesto_id"});
  impuestos.hasMany(facturas_detalle, { as: "facturas_detalles", foreignKey: "impuesto_id"});
  stock_actualizar_detalle.belongsTo(insumos, { as: "insumo", foreignKey: "insumo_id"});
  insumos.hasMany(stock_actualizar_detalle, { as: "stock_actualizar_detalles", foreignKey: "insumo_id"});
  stock_insumos_movimientos.belongsTo(insumos, { as: "insumo", foreignKey: "insumo_id"});
  insumos.hasMany(stock_insumos_movimientos, { as: "stock_insumos_movimientos", foreignKey: "insumo_id"});
  citas_medicas.belongsTo(pacientes, { as: "paciente", foreignKey: "paciente_id"});
  pacientes.hasMany(citas_medicas, { as: "citas_medicas", foreignKey: "paciente_id"});
  cobranzas.belongsTo(pacientes, { as: "paciente", foreignKey: "paciente_id"});
  pacientes.hasMany(cobranzas, { as: "cobranzas", foreignKey: "paciente_id"});
  facturas.belongsTo(pacientes, { as: "paciente", foreignKey: "paciente_id"});
  pacientes.hasMany(facturas, { as: "facturas", foreignKey: "paciente_id"});
  fichas_medicas.belongsTo(pacientes, { as: "paciente", foreignKey: "paciente_id"});
  pacientes.hasMany(fichas_medicas, { as: "fichas_medicas", foreignKey: "paciente_id"});
  pacientes_dientes.belongsTo(pacientes, { as: "paciente", foreignKey: "paciente_id"});
  pacientes.hasMany(pacientes_dientes, { as: "pacientes_dientes", foreignKey: "paciente_id"});
  presupuestos.belongsTo(pacientes, { as: "paciente", foreignKey: "paciente_id"});
  pacientes.hasMany(presupuestos, { as: "presupuestos", foreignKey: "paciente_id"});
  pacientes_dientes_detalle.belongsTo(pacientes_dientes, { as: "paciente_diente", foreignKey: "paciente_diente_id"});
  pacientes_dientes.hasMany(pacientes_dientes_detalle, { as: "pacientes_dientes_detalles", foreignKey: "paciente_diente_id"});
  pacientes_dientes_historial.belongsTo(pacientes_dientes, { as: "paciente_diente", foreignKey: "paciente_diente_id"});
  pacientes_dientes.hasMany(pacientes_dientes_historial, { as: "pacientes_dientes_historials", foreignKey: "paciente_diente_id"});
  facturas_detalle.belongsTo(pacientes_dientes_historial, { as: "paciente_diente_historial", foreignKey: "paciente_diente_historial_id"});
  pacientes_dientes_historial.hasMany(facturas_detalle, { as: "facturas_detalles", foreignKey: "paciente_diente_historial_id"});
  presupuestos_detalle.belongsTo(pacientes_dientes_historial, { as: "paciente_diente_historial", foreignKey: "paciente_diente_historial_id"});
  pacientes_dientes_historial.hasMany(presupuestos_detalle, { as: "presupuestos_detalles", foreignKey: "paciente_diente_historial_id"});
  roles_permisos.belongsTo(permisos, { as: "permiso", foreignKey: "permiso_id"});
  permisos.hasMany(roles_permisos, { as: "roles_permisos", foreignKey: "permiso_id"});
  presupuestos_detalle.belongsTo(presupuestos, { as: "presupuesto", foreignKey: "presupuesto_id"});
  presupuestos.hasMany(presupuestos_detalle, { as: "presupuestos_detalles", foreignKey: "presupuesto_id"});
  roles_permisos.belongsTo(roles, { as: "rol", foreignKey: "rol_id"});
  roles.hasMany(roles_permisos, { as: "roles_permisos", foreignKey: "rol_id"});
  usuarios_roles.belongsTo(roles, { as: "rol", foreignKey: "rol_id"});
  roles.hasMany(usuarios_roles, { as: "usuarios_roles", foreignKey: "rol_id"});
  stock_actualizar_detalle.belongsTo(stock_actualizar, { as: "stock_actualizar", foreignKey: "stock_actualizar_id"});
  stock_actualizar.hasMany(stock_actualizar_detalle, { as: "stock_actualizar_detalles", foreignKey: "stock_actualizar_id"});
  stock_insumos_movimientos.belongsTo(stock_actualizar, { as: "stock_actualizar", foreignKey: "stock_actualizar_id"});
  stock_actualizar.hasMany(stock_insumos_movimientos, { as: "stock_insumos_movimientos", foreignKey: "stock_actualizar_id"});
  stock_insumos_movimientos.belongsTo(stock_actualizar_detalle, { as: "stock_actualizar_detalle", foreignKey: "stock_actualizar_detalle_id"});
  stock_actualizar_detalle.hasMany(stock_insumos_movimientos, { as: "stock_insumos_movimientos", foreignKey: "stock_actualizar_detalle_id"});
  funcionarios.belongsTo(tipos_documentos, { as: "tipo_documento", foreignKey: "tipo_documento_id"});
  tipos_documentos.hasMany(funcionarios, { as: "funcionarios", foreignKey: "tipo_documento_id"});
  pacientes.belongsTo(tipos_documentos, { as: "tipo_documento", foreignKey: "tipo_documento_id"});
  tipos_documentos.hasMany(pacientes, { as: "pacientes", foreignKey: "tipo_documento_id"});
  stock_actualizar.belongsTo(tipos_movimientos_stock, { as: "tipo_movimiento", foreignKey: "tipo_movimiento_id"});
  tipos_movimientos_stock.hasMany(stock_actualizar, { as: "stock_actualizars", foreignKey: "tipo_movimiento_id"});
  pacientes_dientes_historial.belongsTo(tratamientos_servicios, { as: "tratamiento_servicio", foreignKey: "tratamiento_servicio_id"});
  tratamientos_servicios.hasMany(pacientes_dientes_historial, { as: "pacientes_dientes_historials", foreignKey: "tratamiento_servicio_id"});
  citas_medicas.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(citas_medicas, { as: "citas_medicas", foreignKey: "usuario_id"});
  stock_insumos_movimientos.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(stock_insumos_movimientos, { as: "stock_insumos_movimientos", foreignKey: "usuario_id"});
  usuarios_roles.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(usuarios_roles, { as: "usuarios_roles", foreignKey: "usuario_id"});

  return {
    citas_medicas,
    citas_medicas_view,
    cobranzas,
    cobranzas_detalle,
    condiciones_pago,
    deudas,
    deudas_detalle,
    dientes,
    doctores,
    doctores_especialidades,
    especialidades,
    estados_movimientos,
    facturas,
    facturas_detalle,
    fichas_medicas,
    funcionarios,
    impuestos,
    insumos,
    log_cambios,
    pacientes,
    pacientes_dientes,
    pacientes_dientes_detalle,
    pacientes_dientes_historial,
    permisos,
    presupuestos,
    presupuestos_detalle,
    roles,
    roles_permisos,
    stock_actualizar,
    stock_actualizar_detalle,
    stock_insumos_movimientos,
    tipos_documentos,
    tipos_movimientos_stock,
    tratamientos_servicios,
    usuarios,
    usuarios_roles,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
