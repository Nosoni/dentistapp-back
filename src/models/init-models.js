import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _citas_medicas from  "./citas_medicas.js";
import _cobranzas from  "./cobranzas.js";
import _cobranzas_detalle from  "./cobranzas_detalle.js";
import _condiciones_pago from  "./condiciones_pago.js";
import _deudas from  "./deudas.js";
import _deudas_detalle from  "./deudas_detalle.js";
import _dientes from  "./dientes.js";
import _doctores from  "./doctores.js";
import _doctores_especialidades from  "./doctores_especialidades.js";
import _especialidades from  "./especialidades.js";
import _estados_movimientos from  "./estados_movimientos.js";
import _facturas from  "./facturas.js";
import _facturas_detalle from  "./facturas_detalle.js";
import _fichas_medicas from  "./fichas_medicas.js";
import _funcionarios from  "./funcionarios.js";
import _impuestos from  "./impuestos.js";
import _insumos from  "./insumos.js";
import _pacientes from  "./pacientes.js";
import _pacientes_dientes from  "./pacientes_dientes.js";
import _pacientes_dientes_detalle from  "./pacientes_dientes_detalle.js";
import _pacientes_dientes_historial from  "./pacientes_dientes_historial.js";
import _permisos from  "./permisos.js";
import _presupuestos from  "./presupuestos.js";
import _presupuestos_detalle from  "./presupuestos_detalle.js";
import _roles from  "./roles.js";
import _roles_permisos from  "./roles_permisos.js";
import _stock_actualizar from  "./stock_actualizar.js";
import _stock_actualizar_detalle from  "./stock_actualizar_detalle.js";
import _stock_insumos_movimientos from  "./stock_insumos_movimientos.js";
import _tipos_documentos from  "./tipos_documentos.js";
import _tipos_movimientos_stock from  "./tipos_movimientos_stock.js";
import _tratamientos_servicios from  "./tratamientos_servicios.js";
import _usuarios from  "./usuarios.js";
import _usuarios_roles from  "./usuarios_roles.js";

export default function initModels(sequelize) {
  var citas_medicas = _citas_medicas.init(sequelize, DataTypes);
  var cobranzas = _cobranzas.init(sequelize, DataTypes);
  var cobranzas_detalle = _cobranzas_detalle.init(sequelize, DataTypes);
  var condiciones_pago = _condiciones_pago.init(sequelize, DataTypes);
  var deudas = _deudas.init(sequelize, DataTypes);
  var deudas_detalle = _deudas_detalle.init(sequelize, DataTypes);
  var dientes = _dientes.init(sequelize, DataTypes);
  var doctores = _doctores.init(sequelize, DataTypes);
  var doctores_especialidades = _doctores_especialidades.init(sequelize, DataTypes);
  var especialidades = _especialidades.init(sequelize, DataTypes);
  var estados_movimientos = _estados_movimientos.init(sequelize, DataTypes);
  var facturas = _facturas.init(sequelize, DataTypes);
  var facturas_detalle = _facturas_detalle.init(sequelize, DataTypes);
  var fichas_medicas = _fichas_medicas.init(sequelize, DataTypes);
  var funcionarios = _funcionarios.init(sequelize, DataTypes);
  var impuestos = _impuestos.init(sequelize, DataTypes);
  var insumos = _insumos.init(sequelize, DataTypes);
  var pacientes = _pacientes.init(sequelize, DataTypes);
  var pacientes_dientes = _pacientes_dientes.init(sequelize, DataTypes);
  var pacientes_dientes_detalle = _pacientes_dientes_detalle.init(sequelize, DataTypes);
  var pacientes_dientes_historial = _pacientes_dientes_historial.init(sequelize, DataTypes);
  var permisos = _permisos.init(sequelize, DataTypes);
  var presupuestos = _presupuestos.init(sequelize, DataTypes);
  var presupuestos_detalle = _presupuestos_detalle.init(sequelize, DataTypes);
  var roles = _roles.init(sequelize, DataTypes);
  var roles_permisos = _roles_permisos.init(sequelize, DataTypes);
  var stock_actualizar = _stock_actualizar.init(sequelize, DataTypes);
  var stock_actualizar_detalle = _stock_actualizar_detalle.init(sequelize, DataTypes);
  var stock_insumos_movimientos = _stock_insumos_movimientos.init(sequelize, DataTypes);
  var tipos_documentos = _tipos_documentos.init(sequelize, DataTypes);
  var tipos_movimientos_stock = _tipos_movimientos_stock.init(sequelize, DataTypes);
  var tratamientos_servicios = _tratamientos_servicios.init(sequelize, DataTypes);
  var usuarios = _usuarios.init(sequelize, DataTypes);
  var usuarios_roles = _usuarios_roles.init(sequelize, DataTypes);

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
