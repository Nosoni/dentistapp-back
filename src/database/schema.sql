--TABLES
CREATE TABLE public.condiciones_pago (
	id int2 NOT NULL, -- Código identificador autogenerado
	codigo varchar(15) NOT NULL,
	descripcion varchar(30) NOT NULL, -- Descripción de la condición de pago
	cuotas int2 NOT NULL, -- Cantidad de cuotas de la condición de pago
	activo bool NOT NULL DEFAULT true, -- Indica si la condición de pago está o no activa
	CONSTRAINT condicion_pago_chk CHECK ((cuotas > 0)),
	CONSTRAINT condicion_pago_pk PRIMARY KEY (id)
);
COMMENT ON TABLE public.condiciones_pago IS 'Representa';
COMMENT ON COLUMN public.condiciones_pago.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.condiciones_pago.descripcion IS 'Descripción de la condición de pago';
COMMENT ON COLUMN public.condiciones_pago.cuotas IS 'Cantidad de cuotas de la condición de pago';
COMMENT ON COLUMN public.condiciones_pago.activo IS 'Indica si la condición de pago está o no activa';

CREATE TABLE public.dientes (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	codigo int2 NOT NULL, -- Código del diente
	temporal bool NOT NULL DEFAULT false, -- Determina si el diente es uno temporal
	cantidad_caras int2 NOT NULL, -- Determina la cantidad de caras del diente
	activo bool NOT NULL DEFAULT true, -- Indica si el diente está o no activo
	CONSTRAINT diente_chk CHECK (((cantidad_caras >= 4) AND (cantidad_caras <= 5))),
	CONSTRAINT diente_pk PRIMARY KEY (id)
);
COMMENT ON TABLE public.dientes IS 'Representa a las características de los dientes';
COMMENT ON COLUMN public.dientes.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.dientes.codigo IS 'Código del diente';
COMMENT ON COLUMN public.dientes.temporal IS 'Determina si el diente es uno temporal';
COMMENT ON COLUMN public.dientes.cantidad_caras IS 'Determina la cantidad de caras del diente';
COMMENT ON COLUMN public.dientes.activo IS 'Indica si el diente está o no activo';

CREATE TABLE public.impuestos (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	codigo varchar(10) NOT NULL, -- Código del impuesto
	descripcion varchar(50) NOT NULL, -- Descripción del impuesto
	porcentaje numeric NOT NULL, -- Porcentaje del impuesto
	activo bool NOT NULL DEFAULT true, -- Indica si el impuesto está o no activo
	CONSTRAINT impuesto_pk PRIMARY KEY (id)
);
COMMENT ON TABLE public.impuestos IS 'Representa a los impuestos del país';
COMMENT ON COLUMN public.impuestos.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.impuestos.codigo IS 'Código del impuesto';
COMMENT ON COLUMN public.impuestos.descripcion IS 'Descripción del impuesto';
COMMENT ON COLUMN public.impuestos.porcentaje IS 'Porcentaje del impuesto';
COMMENT ON COLUMN public.impuestos.activo IS 'Indica si el impuesto está o no activo';

CREATE TABLE public.insumos (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY,
	nombre varchar(30) NOT NULL, -- Nombre del insumo
	descripcion varchar(100) NULL, -- Descripción del insumo
	codigo varchar(10) NOT NULL, -- Código del insumo
	cantidad_minima int2 NULL, -- Cantidad mínima del insumo en el stock
	activo bool NOT NULL DEFAULT true, -- Indica si el insumo está o no activo
	CONSTRAINT insumo_pk PRIMARY KEY (id)
);
COMMENT ON TABLE public.insumos IS 'Representa los insumos del  consultorio';
COMMENT ON COLUMN public.insumos.nombre IS 'Nombre del insumo';
COMMENT ON COLUMN public.insumos.descripcion IS 'Descripción del insumo';
COMMENT ON COLUMN public.insumos.codigo IS 'Código del insumo';
COMMENT ON COLUMN public.insumos.cantidad_minima IS 'Cantidad mínima del insumo en el stock';
COMMENT ON COLUMN public.insumos.activo IS 'Indica si el insumo está o no activo';

CREATE TABLE public.permisos (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	nombre varchar(50) NOT NULL, -- Nombre del permiso
	descripcion varchar(100) NULL, -- Descripción del permiso
	activo bool NOT NULL DEFAULT true, -- Indica si el permiso está o no activo
	CONSTRAINT permiso_pk PRIMARY KEY (id)
);
COMMENT ON TABLE public.permisos IS 'Representa a los permisos del sistema';
COMMENT ON COLUMN public.permisos.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.permisos.nombre IS 'Nombre del permiso';
COMMENT ON COLUMN public.permisos.descripcion IS 'Descripción del permiso';
COMMENT ON COLUMN public.permisos.activo IS 'Indica si el permiso está o no activo';

CREATE TABLE public.roles (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	nombre varchar(50) NOT NULL, -- Nombre del rol
	descripcion varchar(100) NULL, -- Descripción del rol
	activo bool NOT NULL DEFAULT true, -- Indica si el rol está o no activo
	CONSTRAINT rol_pk PRIMARY KEY (id)
);
COMMENT ON TABLE public.roles IS 'Representa a los roles del sistema';
COMMENT ON COLUMN public.roles.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.roles.nombre IS 'Nombre del rol';
COMMENT ON COLUMN public.roles.descripcion IS 'Descripción del rol';
COMMENT ON COLUMN public.roles.activo IS 'Indica si el rol está o no activo';

CREATE TABLE public.tipos_documentos (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	descripcion varchar(15) NOT NULL, -- Campo que representa la descripción del tipo de documento
	abreviacion varchar(5) NOT NULL, -- Campo que representa el tipo de documento abreviado
	activo bool NOT NULL DEFAULT true, -- Indica si el tipo de documento está o no activo
	CONSTRAINT tipo_documento_pk PRIMARY KEY (id)
);
COMMENT ON TABLE public.tipos_documentos IS 'Representa a los tipos de documentos del sistema';
COMMENT ON COLUMN public.tipos_documentos.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.tipos_documentos.descripcion IS 'Campo que representa la descripción del tipo de documento';
COMMENT ON COLUMN public.tipos_documentos.abreviacion IS 'Campo que representa el tipo de documento abreviado';
COMMENT ON COLUMN public.tipos_documentos.activo IS 'Indica si el tipo de documento está o no activo';

CREATE TABLE public.tipos_movimientos_stock (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	nombre varchar(15) NOT NULL, -- Nombre del tipo de movimiento de stock
	descripcion varchar(50) NULL, -- Descripción del tipo de movimiento de stock
	signo int2 NOT NULL DEFAULT 1, -- Valor numérico. Indica cómo se comportará el movimiento.
	activo bool NOT NULL DEFAULT true, -- Indica si el tipo de movimiento está o no activo
	CONSTRAINT tipo_movimiento_stock_pk PRIMARY KEY (id)
);
COMMENT ON TABLE public.tipos_movimientos_stock IS 'Representa al tipo de movimientos para la actualización del stock';
COMMENT ON COLUMN public.tipos_movimientos_stock.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.tipos_movimientos_stock.nombre IS 'Nombre del tipo de movimiento de stock';
COMMENT ON COLUMN public.tipos_movimientos_stock.descripcion IS 'Descripción del tipo de movimiento de stock';
COMMENT ON COLUMN public.tipos_movimientos_stock.signo IS 'Valor numérico. Indica cómo se comportará el movimiento.';
COMMENT ON COLUMN public.tipos_movimientos_stock.activo IS 'Indica si el tipo de movimiento está o no activo';

CREATE TABLE public.tratamientos_servicios (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	nombre varchar(30) NOT NULL, -- Nombre del tratamiento o servicio
	descripcion varchar(100) NULL, -- Descripción del tratamiento o servicio
	precio int4 NOT NULL, -- Precio del tratamiento o servicio
	tiempo time(0) NULL, -- Tiempo que conlleva la atención del tratamiento o servicio
	activo bool NOT NULL DEFAULT true, -- Indica si el tratamiento o servicio está o no activa
	CONSTRAINT tratamiento_servicio_chk CHECK ((precio > 0)),
	CONSTRAINT tratamiento_servicio_pk PRIMARY KEY (id)
);
COMMENT ON TABLE public.tratamientos_servicios IS 'Representa a los tratamientos o servicios ofrecidos por el consultorio';
COMMENT ON COLUMN public.tratamientos_servicios.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.tratamientos_servicios.nombre IS 'Nombre del tratamiento o servicio';
COMMENT ON COLUMN public.tratamientos_servicios.descripcion IS 'Descripción del tratamiento o servicio';
COMMENT ON COLUMN public.tratamientos_servicios.precio IS 'Precio del tratamiento o servicio';
COMMENT ON COLUMN public.tratamientos_servicios.tiempo IS 'Tiempo que conlleva la atención del tratamiento o servicio';
COMMENT ON COLUMN public.tratamientos_servicios.activo IS 'Indica si el tratamiento o servicio está o no activa';

CREATE TABLE public.especialidades (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	nombre varchar(30) NOT NULL, -- Nombre de la especialidad
	descripcion varchar(50) NULL, -- Descripción de la especialidad
	especialidad_padre_id int2 NULL, -- Campo que hace referencia a una especialidad de mayor jerarquía
	activo bool NOT NULL DEFAULT true, -- Indica si la especialidad está o no activa
	CONSTRAINT especialidad_pk PRIMARY KEY (id),
	CONSTRAINT especialidades_fk_especialidad FOREIGN KEY (especialidad_padre_id) REFERENCES especialidades(id)
);
COMMENT ON TABLE public.especialidades IS 'Representa a las especialidades médicas del consultorio';
COMMENT ON COLUMN public.especialidades.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.especialidades.nombre IS 'Nombre de la especialidad';
COMMENT ON COLUMN public.especialidades.descripcion IS 'Descripción de la especialidad';
COMMENT ON COLUMN public.especialidades.especialidad_padre_id IS 'Campo que hace referencia a una especialidad de mayor jerarquía';
COMMENT ON COLUMN public.especialidades.activo IS 'Indica si la especialidad está o no activa';

CREATE TABLE public.estados_movimientos (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	tabla_id varchar(50) NOT NULL, -- Nombre de la tabla
	estado_actual varchar(20) NOT NULL, -- Estado actual del proceso
	estado_anterior_id int2 NULL, -- Campo que hace referencia al estado anterior
	puede_avanzar bool NOT NULL DEFAULT true, -- Campo que indica si puede avanzar el proceso al siguiente estado
	activo bool NOT NULL DEFAULT true, -- Indica si el estado del movimiento está o no activo
	CONSTRAINT estado_movimiento_pk PRIMARY KEY (id),
	CONSTRAINT estados_movimientos_fk_estado FOREIGN KEY (estado_anterior_id) REFERENCES estados_movimientos(id)
);
COMMENT ON TABLE public.estados_movimientos IS 'Representa a los estados de los diferentes procesos dentro del sistema';
COMMENT ON COLUMN public.estados_movimientos.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.estados_movimientos.tabla_id IS 'Nombre de la tabla';
COMMENT ON COLUMN public.estados_movimientos.estado_actual IS 'Estado actual del proceso';
COMMENT ON COLUMN public.estados_movimientos.estado_anterior_id IS 'Campo que hace referencia al estado anterior';
COMMENT ON COLUMN public.estados_movimientos.puede_avanzar IS 'Campo que indica si puede avanzar el proceso al siguiente estado';
COMMENT ON COLUMN public.estados_movimientos.activo IS 'Indica si el estado del movimiento está o no activo';

CREATE TABLE public.funcionarios (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	documento varchar(10) NOT NULL, -- Campo que representa al número de documento
	tipo_documento_id int2 NOT NULL, -- Campo que hace referencia al tipo de documento
	nombres varchar(50) NOT NULL, -- Nombre o nombres del funcionario
	apellidos varchar(50) NOT NULL, -- Apellidos o apellido del funcionario
	fecha_ingreso date NULL, -- Fecha de ingreso del funcionario
	direccion varchar(100) NULL, -- Dirección de domicilio del funcionario
	ciudad varchar(20) NULL, -- Ciudad de domicilio del funcionario
	telefono varchar(10) NULL, -- Número de telefono del funcionario
	email varchar(50) NULL, -- Correo electrónico del funcionario
	activo bool NOT NULL DEFAULT true, -- Indica si el funcionario está o no activo
	CONSTRAINT funcionario_pk PRIMARY KEY (id),
	CONSTRAINT funcionarios_fk_tipo_documento FOREIGN KEY (tipo_documento_id) REFERENCES tipos_documentos(id)
);
COMMENT ON TABLE public.funcionarios IS 'Representa a los funcionarios del consultorio';
COMMENT ON COLUMN public.funcionarios.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.funcionarios.documento IS 'Campo que representa al número de documento';
COMMENT ON COLUMN public.funcionarios.tipo_documento_id IS 'Campo que hace referencia al tipo de documento';
COMMENT ON COLUMN public.funcionarios.nombres IS 'Nombre o nombres del funcionario';
COMMENT ON COLUMN public.funcionarios.apellidos IS 'Apellidos o apellido del funcionario';
COMMENT ON COLUMN public.funcionarios.fecha_ingreso IS 'Fecha de ingreso del funcionario';
COMMENT ON COLUMN public.funcionarios.direccion IS 'Dirección de domicilio del funcionario';
COMMENT ON COLUMN public.funcionarios.ciudad IS 'Ciudad de domicilio del funcionario';
COMMENT ON COLUMN public.funcionarios.telefono IS 'Número de telefono del funcionario';
COMMENT ON COLUMN public.funcionarios.email IS 'Correo electrónico del funcionario';
COMMENT ON COLUMN public.funcionarios.activo IS 'Indica si el funcionario está o no activo';

CREATE TABLE public.pacientes (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	documento varchar(10) NOT NULL, -- Campo que representa al número de documento
	tipo_documento_id int2 NOT NULL, -- Campo que hace referencia al tipo de documento
	nombres varchar(50) NOT NULL, -- Nombre o nombres del paciente
	apellidos varchar(50) NOT NULL, -- Apellidos o apellido del paciente
	fecha_nacimiento date NULL, -- Fecha de nacimiento  del paciente
	direccion varchar(100) NULL, -- Dirección de domicilio del paciente
	ciudad varchar(20) NULL, -- Ciudad de domicilio del paciente
	telefono varchar(10) NULL, -- Número de telefono del paciente
	email varchar(50) NULL, -- Correo electrónico del paciente
	activo bool NOT NULL DEFAULT true, -- Indica si el paciente está o no activo
	CONSTRAINT paciente_pk PRIMARY KEY (id),
	CONSTRAINT pacientes_fk_tipo_docuemto FOREIGN KEY (tipo_documento_id) REFERENCES tipos_documentos(id)
);
COMMENT ON TABLE public.pacientes IS 'Representa a los pacientes del  consultorio';
COMMENT ON COLUMN public.pacientes.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.pacientes.documento IS 'Campo que representa al número de documento';
COMMENT ON COLUMN public.pacientes.tipo_documento_id IS 'Campo que hace referencia al tipo de documento';
COMMENT ON COLUMN public.pacientes.nombres IS 'Nombre o nombres del paciente';
COMMENT ON COLUMN public.pacientes.apellidos IS 'Apellidos o apellido del paciente';
COMMENT ON COLUMN public.pacientes.fecha_nacimiento IS 'Fecha de nacimiento  del paciente';
COMMENT ON COLUMN public.pacientes.direccion IS 'Dirección de domicilio del paciente';
COMMENT ON COLUMN public.pacientes.ciudad IS 'Ciudad de domicilio del paciente';
COMMENT ON COLUMN public.pacientes.telefono IS 'Número de telefono del paciente';
COMMENT ON COLUMN public.pacientes.email IS 'Correo electrónico del paciente';
COMMENT ON COLUMN public.pacientes.activo IS 'Indica si el paciente está o no activo';

CREATE TABLE public.pacientes_dientes (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	paciente_id int2 NOT NULL, -- Campo que hace referencia a un paciente
	diente_id int2 NOT NULL, -- Campo que hace referencia a un diente
	estado_diente_id int2 NULL, -- Campo que hace referencia al estado del diente
	activo bool NOT NULL DEFAULT true, -- Indica si el diente del paciente está o no activo
	CONSTRAINT paciente_diente_pk PRIMARY KEY (id),
	CONSTRAINT pacientes_dientes_fk_diente FOREIGN KEY (diente_id) REFERENCES dientes(id),
	CONSTRAINT pacientes_dientes_fk_estado FOREIGN KEY (estado_diente_id) REFERENCES estados_movimientos(id),
	CONSTRAINT pacientes_dientes_fk_paciente FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);
COMMENT ON TABLE public.pacientes_dientes IS 'Representa a los dientes del paciente';
COMMENT ON COLUMN public.pacientes_dientes.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.pacientes_dientes.paciente_id IS 'Campo que hace referencia a un paciente';
COMMENT ON COLUMN public.pacientes_dientes.diente_id IS 'Campo que hace referencia a un diente';
COMMENT ON COLUMN public.pacientes_dientes.estado_diente_id IS 'Campo que hace referencia al estado del diente';
COMMENT ON COLUMN public.pacientes_dientes.activo IS 'Indica si el diente del paciente está o no activo';

CREATE TABLE public.pacientes_dientes_detalle (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	paciente_id int4 NOT NULL, -- Campo que hace referencia al paciente
	paciente_diente_id int4 NULL, -- Campo que hace referencia al diente del paciente
	estado_detalle_id int2 NOT NULL, -- Campo que hace referencia al estado del detalle del diente
	cara int2 NOT NULL, -- Indica el número de cara que corresponde el detalle
	activo bool NOT NULL DEFAULT true, -- Indica si el detalle del diente está o no activo
	CONSTRAINT paciente_diente_detalle_pk PRIMARY KEY (id),
	CONSTRAINT pacientes_dientes_detalles_fk_estado FOREIGN KEY (estado_detalle_id) REFERENCES estados_movimientos(id),
	CONSTRAINT pacientes_dientes_detalles_fk_paciente_diente FOREIGN KEY (paciente_diente_id) REFERENCES pacientes_dientes(id)
);
COMMENT ON TABLE public.pacientes_dientes_detalle IS 'Representa el detalle del diente del paciente';
COMMENT ON COLUMN public.pacientes_dientes_detalle.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.pacientes_dientes_detalle.paciente_id IS 'Campo que hace referencia al paciente';
COMMENT ON COLUMN public.pacientes_dientes_detalle.paciente_diente_id IS 'Campo que hace referencia al diente del paciente';
COMMENT ON COLUMN public.pacientes_dientes_detalle.estado_detalle_id IS 'Campo que hace referencia al estado del detalle del diente';
COMMENT ON COLUMN public.pacientes_dientes_detalle.cara IS 'Indica el número de cara que corresponde el detalle';
COMMENT ON COLUMN public.pacientes_dientes_detalle.activo IS 'Indica si el detalle del diente está o no activo';

CREATE TABLE public.pacientes_dientes_historial (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	paciente_diente_id int4 NOT NULL, -- Campo que hace referencia al diente del paciente
	tratamiento_servicio_id int2 NOT NULL, -- Campo que hace referencia al tratamiento o servicio hecho o pendiente de realizar
	estado_historial_id int2 NOT NULL, -- Campo que hace referencia al estado del historial del diente
	activo bool NOT NULL DEFAULT true, -- Indica si el historia del diente está o no activo
	CONSTRAINT paciente_diente_historial_pk PRIMARY KEY (id),
	CONSTRAINT pacientes_dientes_historial_fk_estado FOREIGN KEY (estado_historial_id) REFERENCES estados_movimientos(id),
	CONSTRAINT pacientes_dientes_historial_fk_paciente_diente FOREIGN KEY (paciente_diente_id) REFERENCES pacientes_dientes(id),
	CONSTRAINT pacientes_dientes_historial_fk_tratamiento_servicio FOREIGN KEY (tratamiento_servicio_id) REFERENCES tratamientos_servicios(id)
);
COMMENT ON TABLE public.pacientes_dientes_historial IS 'Representa al historial de tratamientos que ha recibido el diente del paciente';
COMMENT ON COLUMN public.pacientes_dientes_historial.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.pacientes_dientes_historial.paciente_diente_id IS 'Campo que hace referencia al diente del paciente';
COMMENT ON COLUMN public.pacientes_dientes_historial.tratamiento_servicio_id IS 'Campo que hace referencia al tratamiento o servicio hecho o pendiente de realizar';
COMMENT ON COLUMN public.pacientes_dientes_historial.estado_historial_id IS 'Campo que hace referencia al estado del historial del diente';
COMMENT ON COLUMN public.pacientes_dientes_historial.activo IS 'Indica si el historia del diente está o no activo';

CREATE TABLE public.presupuestos (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	fecha date NOT NULL, -- Fecha del proceso de presupuestar
	paciente_id int2 NOT NULL, -- Campo que hace referencia a un paciente
	estado_presupuesto_id int2 NOT NULL, -- Campo que hace referencia al estado del presupuesto
	activo bool NOT NULL DEFAULT true, -- Indica si el proceso de presupuestar está o no activo
	CONSTRAINT presupuesto_pk PRIMARY KEY (id),
	CONSTRAINT presupuestos_fk_estado FOREIGN KEY (estado_presupuesto_id) REFERENCES estados_movimientos(id),
	CONSTRAINT presupuestos_fk_paciente FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);
COMMENT ON TABLE public.presupuestos IS 'Representa al proceso de presupuestar los tratamientos a los pacientes';
COMMENT ON COLUMN public.presupuestos.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.presupuestos.fecha IS 'Fecha del proceso de presupuestar';
COMMENT ON COLUMN public.presupuestos.paciente_id IS 'Campo que hace referencia a un paciente';
COMMENT ON COLUMN public.presupuestos.estado_presupuesto_id IS 'Campo que hace referencia al estado del presupuesto';
COMMENT ON COLUMN public.presupuestos.activo IS 'Indica si el proceso de presupuestar está o no activo';

CREATE TABLE public.presupuestos_detalle (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	presupuesto_id int2 NOT NULL, -- Campo que hace referencia al presupuesto
	paciente_diente_historial_id int2 NOT NULL, -- Campo que hace referencia al historial médico a presupuestar
	precio int2 NOT NULL, -- Precio del tratamiento
	activo bool NOT NULL DEFAULT true, -- Indica si el detalle del presupuesto está o no activo
	CONSTRAINT presupuesto_detalle_chk CHECK ((precio > 0)),
	CONSTRAINT presupuesto_detalle_pk PRIMARY KEY (id),
	CONSTRAINT presupuestos_detalle_fk_paciente_diente_historial FOREIGN KEY (paciente_diente_historial_id) REFERENCES pacientes_dientes_historial(id),
	CONSTRAINT presupuestos_detalle_fk_presupuesto FOREIGN KEY (presupuesto_id) REFERENCES presupuestos(id)
);
COMMENT ON TABLE public.presupuestos_detalle IS 'Representa al detalle del proceso de presupuestar';
COMMENT ON COLUMN public.presupuestos_detalle.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.presupuestos_detalle.presupuesto_id IS 'Campo que hace referencia al presupuesto';
COMMENT ON COLUMN public.presupuestos_detalle.paciente_diente_historial_id IS 'Campo que hace referencia al historial médico a presupuestar';
COMMENT ON COLUMN public.presupuestos_detalle.precio IS 'Precio del tratamiento';
COMMENT ON COLUMN public.presupuestos_detalle.activo IS 'Indica si el detalle del presupuesto está o no activo';

CREATE TABLE public.roles_permisos (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	rol_id int2 NOT NULL, -- Campo que hace referencia a un rol
	permiso_id int2 NOT NULL, -- Campo que hace referencia a un permiso
	activo bool NOT NULL DEFAULT true, -- Indica si el permiso está o no activo para el rol
	CONSTRAINT rol_permiso_pk PRIMARY KEY (id),
	CONSTRAINT roles_permisos_fk_permiso FOREIGN KEY (permiso_id) REFERENCES permisos(id),
	CONSTRAINT roles_permisos_fk_rol FOREIGN KEY (rol_id) REFERENCES roles(id)
);
COMMENT ON TABLE public.roles_permisos IS 'Representa al conjunto de permisos que pertenecen a un rol';
COMMENT ON COLUMN public.roles_permisos.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.roles_permisos.rol_id IS 'Campo que hace referencia a un rol';
COMMENT ON COLUMN public.roles_permisos.permiso_id IS 'Campo que hace referencia a un permiso';
COMMENT ON COLUMN public.roles_permisos.activo IS 'Indica si el permiso está o no activo para el rol';

CREATE TABLE public.stock_actualizar (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	fecha date NOT NULL, -- Fecha y hora del proceso de actualizacíon
	tipo_movimiento_id int2 NOT NULL, -- Campo que hace referencia al tipo de movimiento
	comprobante varchar(15) NULL, -- Comprobante del movimiento
	estado_movimiento_id int2 NOT NULL, -- Campo que hace referencia al estado de movimiento
	activo bool NOT NULL DEFAULT true, -- Indica si el movimiento está o no activo
	CONSTRAINT stock_actualizar_pk PRIMARY KEY (id),
	CONSTRAINT stock_actualizar_fk_estado FOREIGN KEY (estado_movimiento_id) REFERENCES estados_movimientos(id),
	CONSTRAINT stock_actualizar_fk_tipo_movimiento FOREIGN KEY (tipo_movimiento_id) REFERENCES tipos_movimientos_stock(id)
);
COMMENT ON TABLE public.stock_actualizar IS 'Representa al proceso de actualización del stock de insumos del consultorio';
COMMENT ON COLUMN public.stock_actualizar.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.stock_actualizar.fecha IS 'Fecha y hora del proceso de actualizacíon';
COMMENT ON COLUMN public.stock_actualizar.tipo_movimiento_id IS 'Campo que hace referencia al tipo de movimiento';
COMMENT ON COLUMN public.stock_actualizar.comprobante IS 'Comprobante del movimiento';
COMMENT ON COLUMN public.stock_actualizar.estado_movimiento_id IS 'Campo que hace referencia al estado de movimiento';
COMMENT ON COLUMN public.stock_actualizar.activo IS 'Indica si el movimiento está o no activo';

CREATE TABLE public.stock_actualizar_detalle (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	stock_actualizar_id int2 NOT NULL, -- Campo que hace referencia al stock de actualización
	insumo_id int2 NOT NULL, -- Campo que hace referencia a un insumo
	cantidad int2 NOT NULL, -- Cantidad para actualizar el stock
	activo bool NOT NULL DEFAULT true, -- Indica si el detalle del proceso de actualización está o no activo
	CONSTRAINT stock_actualizar_detalle_chk CHECK ((cantidad > 0)),
	CONSTRAINT stock_actualizar_detalle_pk PRIMARY KEY (id),
	CONSTRAINT stock_actualizar_detalle_fk_insumo FOREIGN KEY (insumo_id) REFERENCES insumos(id),
	CONSTRAINT stock_actualizar_detalle_fk_stock_actualizar FOREIGN KEY (stock_actualizar_id) REFERENCES stock_actualizar(id)
);
COMMENT ON TABLE public.stock_actualizar_detalle IS 'Representa al detalle de actualización del stock de insumos del consultorio';
COMMENT ON COLUMN public.stock_actualizar_detalle.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.stock_actualizar_detalle.stock_actualizar_id IS 'Campo que hace referencia al stock de actualización';
COMMENT ON COLUMN public.stock_actualizar_detalle.insumo_id IS 'Campo que hace referencia a un insumo';
COMMENT ON COLUMN public.stock_actualizar_detalle.cantidad IS 'Cantidad para actualizar el stock';
COMMENT ON COLUMN public.stock_actualizar_detalle.activo IS 'Indica si el detalle del proceso de actualización está o no activo';

CREATE TABLE public.usuarios (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	usuario varchar NOT NULL, -- Alias del usuario
	"password" varchar NOT NULL, -- Texto secreto que valida al usuario
	funcionario_id int2 NULL, -- Campo que hace referencia a un funcionario
	activo bool NOT NULL DEFAULT true, -- Indica si el usuario está o no activo
	CONSTRAINT usuario_pk PRIMARY KEY (id),
	CONSTRAINT usuarios_fk_funcionario FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id)
);
COMMENT ON TABLE public.usuarios IS 'Representa a los usuarios del sistema';
COMMENT ON COLUMN public.usuarios.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.usuarios.usuario IS 'Alias del usuario';
COMMENT ON COLUMN public.usuarios."password" IS 'Texto secreto que valida al usuario';
COMMENT ON COLUMN public.usuarios.funcionario_id IS 'Campo que hace referencia a un funcionario';
COMMENT ON COLUMN public.usuarios.activo IS 'Indica si el usuario está o no activo';

CREATE TABLE public.usuarios_roles (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	usuario_id int2 NOT NULL, -- Campo que hace referencia a un usuario
	rol_id int2 NOT NULL, -- Campo que hace referencia a un rol
	activo bool NOT NULL DEFAULT true, -- Indica si el rol del usuario está o no activo
	CONSTRAINT usuario_rol_pk PRIMARY KEY (id),
	CONSTRAINT usuarios_roles_fk_rol FOREIGN KEY (rol_id) REFERENCES roles(id),
	CONSTRAINT usuarios_roles_fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
COMMENT ON TABLE public.usuarios_roles IS 'Representa al registro del rol  que pertenecen al usuario';
COMMENT ON COLUMN public.usuarios_roles.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.usuarios_roles.usuario_id IS 'Campo que hace referencia a un usuario';
COMMENT ON COLUMN public.usuarios_roles.rol_id IS 'Campo que hace referencia a un rol';
COMMENT ON COLUMN public.usuarios_roles.activo IS 'Indica si el rol del usuario está o no activo';

CREATE TABLE public.citas_medicas (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	paciente_id int2 NOT NULL, -- Campo que hace referencia a un paciente
	fecha_inicio timestamp(0) NOT NULL, -- Fecha de inicio de la cita médica
	fecha_fin timestamp(0) NOT NULL, -- Fecha fin de la cita médica
	estado_cita_id int2 NOT NULL, -- Campo que hace referencia al estado de la cita médica
	observacion varchar(50) NULL, -- Campo de observación de la reserva
	activo bool NOT NULL DEFAULT true, -- Indica si la cita médica está o no activa
	CONSTRAINT cita_medica_pk PRIMARY KEY (id),
	CONSTRAINT citas_medicas_fk_estado FOREIGN KEY (estado_cita_id) REFERENCES estados_movimientos(id),
	CONSTRAINT citas_medicas_fk_paciente FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);
COMMENT ON TABLE public.citas_medicas IS 'Representa a las citas médicas del consultorio';
COMMENT ON COLUMN public.citas_medicas.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.citas_medicas.paciente_id IS 'Campo que hace referencia a un paciente';
COMMENT ON COLUMN public.citas_medicas.fecha_inicio IS 'Fecha de inicio de la cita médica';
COMMENT ON COLUMN public.citas_medicas.fecha_fin IS 'Fecha fin de la cita médica';
COMMENT ON COLUMN public.citas_medicas.estado_cita_id IS 'Campo que hace referencia al estado de la cita médica';
COMMENT ON COLUMN public.citas_medicas.observacion IS 'Campo de observación de la reserva';
COMMENT ON COLUMN public.citas_medicas.activo IS 'Indica si la cita médica está o no activa';

CREATE TABLE public.cobranzas (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	fecha date NOT NULL, -- Fecha de la cobranza
	paciente_id int2 NOT NULL, -- Campo que hace referencia a un paciente
	estado_cobranza_id int2 NOT NULL, -- Campo que hace referencia al estado de la cobranza
	comprobante varchar(15) NOT NULL, -- Comprobante de la cobranza
	activo bool NOT NULL DEFAULT true, -- Indica si la cobranza está o no activa
	CONSTRAINT cobranza_pk PRIMARY KEY (id),
	CONSTRAINT cobranzas_fk_estado FOREIGN KEY (estado_cobranza_id) REFERENCES estados_movimientos(id),
	CONSTRAINT cobranzas_fk_paciente FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);
COMMENT ON TABLE public.cobranzas IS 'Representa a las cobranzas del consultorio';
COMMENT ON COLUMN public.cobranzas.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.cobranzas.fecha IS 'Fecha de la cobranza';
COMMENT ON COLUMN public.cobranzas.paciente_id IS 'Campo que hace referencia a un paciente';
COMMENT ON COLUMN public.cobranzas.estado_cobranza_id IS 'Campo que hace referencia al estado de la cobranza';
COMMENT ON COLUMN public.cobranzas.comprobante IS 'Comprobante de la cobranza';
COMMENT ON COLUMN public.cobranzas.activo IS 'Indica si la cobranza está o no activa';

CREATE TABLE public.doctores (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	funcionario_id int2 NOT NULL, -- Campo que hace referencia a un funcionario
	registro_profesional varchar(10) NULL, -- Registro del profecional
	activo bool NOT NULL DEFAULT true, -- Indica si el doctor está o no activo
	CONSTRAINT doctor_pk PRIMARY KEY (id),
	CONSTRAINT doctores_fk_funcionario FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id)
);
COMMENT ON TABLE public.doctores IS 'Representa a los doctores del consultorio';
COMMENT ON COLUMN public.doctores.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.doctores.funcionario_id IS 'Campo que hace referencia a un funcionario';
COMMENT ON COLUMN public.doctores.registro_profesional IS 'Registro del profecional';
COMMENT ON COLUMN public.doctores.activo IS 'Indica si el doctor está o no activo';

CREATE TABLE public.doctores_especialidades (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	doctor_id int2 NOT NULL, -- Campo que hace referencia a un doctor
	especialidad_id int2 NOT NULL, -- Campo que hace referencia a una especialidad
	activo bool NOT NULL DEFAULT true, -- Indica si la especialidad del doctor está o no activo
	CONSTRAINT doctor_especialidad_pk PRIMARY KEY (id),
	CONSTRAINT doctores_especialidades_fk_doctor FOREIGN KEY (doctor_id) REFERENCES doctores(id),
	CONSTRAINT doctores_especialidades_fk_especialidad FOREIGN KEY (especialidad_id) REFERENCES especialidades(id)
);
COMMENT ON TABLE public.doctores_especialidades IS 'Representa a las especialidades con la que cuenta el doctor';
COMMENT ON COLUMN public.doctores_especialidades.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.doctores_especialidades.doctor_id IS 'Campo que hace referencia a un doctor';
COMMENT ON COLUMN public.doctores_especialidades.especialidad_id IS 'Campo que hace referencia a una especialidad';
COMMENT ON COLUMN public.doctores_especialidades.activo IS 'Indica si la especialidad del doctor está o no activo';

CREATE TABLE public.facturas (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	fecha date NOT NULL, -- Fecha de la factura
	paciente_id int2 NOT NULL, -- Campo que hace referencia a un paciente
	estado_factura_id int2 NOT NULL, -- Campo que hace referencia al estado de la factura
	comprobante varchar(15) NOT NULL, -- Comprobante de la factura
	condicion_pago_id int2 NOT NULL, -- Campo que hace referencia a una condición de pago
	activo bool NOT NULL DEFAULT true, -- Indica si la factura está o no activa
	CONSTRAINT factura_pk PRIMARY KEY (id),
	CONSTRAINT facturas_fk_condicion FOREIGN KEY (condicion_pago_id) REFERENCES condiciones_pago(id),
	CONSTRAINT facturas_fk_estado FOREIGN KEY (estado_factura_id) REFERENCES estados_movimientos(id),
	CONSTRAINT facturas_fk_paciente FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);
COMMENT ON TABLE public.facturas IS 'Representa a las facturas emitidas a los pacientes por los tratamientos realizados';
COMMENT ON COLUMN public.facturas.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.facturas.fecha IS 'Fecha de la factura';
COMMENT ON COLUMN public.facturas.paciente_id IS 'Campo que hace referencia a un paciente';
COMMENT ON COLUMN public.facturas.estado_factura_id IS 'Campo que hace referencia al estado de la factura';
COMMENT ON COLUMN public.facturas.comprobante IS 'Comprobante de la factura';
COMMENT ON COLUMN public.facturas.condicion_pago_id IS 'Campo que hace referencia a una condición de pago';
COMMENT ON COLUMN public.facturas.activo IS 'Indica si la factura está o no activa';

CREATE TABLE public.facturas_detalle (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	factura_id int2 NOT NULL, -- Campo que hace referencia a la factura
	paciente_diente_historial_id int2 NOT NULL, -- Campo que hace referencia al historial médico a facturar
	precio int2 NOT NULL, -- Precio del tratamiento
	impuesto_id int2 NOT NULL, -- Campo que hace referencia al impuesto
	activo bool NOT NULL DEFAULT true, -- Indica si el detalle está o no activo
	CONSTRAINT factura_detalle_chk CHECK ((precio > 0)),
	CONSTRAINT factura_detalle_pk PRIMARY KEY (id),
	CONSTRAINT facturas_detalle_fk_factura FOREIGN KEY (factura_id) REFERENCES facturas(id),
	CONSTRAINT facturas_detalle_fk_impuesto FOREIGN KEY (impuesto_id) REFERENCES impuestos(id),
	CONSTRAINT facturas_detalle_fk_paciente_diente_historial FOREIGN KEY (paciente_diente_historial_id) REFERENCES pacientes_dientes_historial(id)
);
COMMENT ON TABLE public.facturas_detalle IS 'Representa a los detalles de las facturas';
COMMENT ON COLUMN public.facturas_detalle.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.facturas_detalle.factura_id IS 'Campo que hace referencia a la factura';
COMMENT ON COLUMN public.facturas_detalle.paciente_diente_historial_id IS 'Campo que hace referencia al historial médico a facturar';
COMMENT ON COLUMN public.facturas_detalle.precio IS 'Precio del tratamiento';
COMMENT ON COLUMN public.facturas_detalle.impuesto_id IS 'Campo que hace referencia al impuesto';
COMMENT ON COLUMN public.facturas_detalle.activo IS 'Indica si el detalle está o no activo';

CREATE TABLE public.fichas_medicas (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	paciente_id int2 NOT NULL, -- Campo que hace referencia a un paciente
	otro_medico bool NOT NULL DEFAULT false, -- Indica si está siendo atendido por otro médico
	otro_medico_observacion varchar(150) NULL, -- Observación en caso de ser atendido por otro médico
	psiquiatra bool NOT NULL DEFAULT false, -- Indica si es atendido por un psiquiatra
	medicamento bool NOT NULL DEFAULT false, -- Indica si está consumiendo algún medicamento
	medicamento_json json NULL, -- Listado de medicamentos
	alergia bool NOT NULL DEFAULT false, -- Indica si es alérgico a algún medicamento o antibiótico
	reaccion_anestesia bool NOT NULL DEFAULT false, -- Indica si ha tendido reacción con anestesia local
	diabetico bool NOT NULL DEFAULT false, -- Indica si es diabético
	trastornos_convulsivo bool NOT NULL DEFAULT false, -- Indica si tiene trastornos convulsivos
	hepatitis bool NOT NULL DEFAULT false, -- Indica si padece o padeció hepatitis
	enfermedad_renal bool NOT NULL DEFAULT false, -- Padece o padeció alguna enfermedad renal
	problema_cardiaco bool NOT NULL DEFAULT false, -- Indica si padece o padeció algún problema cardiaco
	cancer bool NOT NULL DEFAULT false, -- Indica si padece o padeció cáncer
	intervencion_quirurgica bool NOT NULL DEFAULT false, -- Indica si ha sido intervenido quirúrgicamente
	hospitalizado bool NOT NULL DEFAULT false, -- Indica si ha sido hospitalizado
	sangrado_excesivo bool NOT NULL DEFAULT false, -- Indica si ha tenido algún sangrado excesivo
	hipertension bool NOT NULL DEFAULT false, -- Indica si sufre de hipertensión
	transfusion_sangre bool NOT NULL DEFAULT false, -- Indica si le han transfundido sangre
	problema_digestivo bool NOT NULL DEFAULT false, -- Indica si tiene algún problema digestivo
	embarazada bool NOT NULL DEFAULT false, -- Indica si está embarazada, en caso de ser mujer
	anticonceptivos_orales bool NOT NULL DEFAULT false, -- Indica si toma algún anticonceptivo de forma oral, en caso de ser mujer
	trastornos_periodo bool NOT NULL DEFAULT false, -- Indica si tiene trastornos con el periodo menstrual, en caso de ser mujer
	otra_enfermedad_trastorno bool NOT NULL DEFAULT false, -- Indica si padece alguna otra enfermedad o trastornos no mencionados
	otra_enfermedad_trastornos_observacion varchar(150) NULL, -- Observación en caso de padecer alguna enfermedad o trastornos no listados
	activo bool NOT NULL DEFAULT true, -- Indica si la ficha médica está o no activa
	CONSTRAINT ficha_medica_pk PRIMARY KEY (id),
	CONSTRAINT fichas_medicas_fk_paciente FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);
COMMENT ON TABLE public.fichas_medicas IS 'Representa la ficha médica del paciente';
COMMENT ON COLUMN public.fichas_medicas.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.fichas_medicas.paciente_id IS 'Campo que hace referencia a un paciente';
COMMENT ON COLUMN public.fichas_medicas.otro_medico IS 'Indica si está siendo atendido por otro médico';
COMMENT ON COLUMN public.fichas_medicas.otro_medico_observacion IS 'Observación en caso de ser atendido por otro médico';
COMMENT ON COLUMN public.fichas_medicas.psiquiatra IS 'Indica si es atendido por un psiquiatra';
COMMENT ON COLUMN public.fichas_medicas.medicamento IS 'Indica si está consumiendo algún medicamento';
COMMENT ON COLUMN public.fichas_medicas.medicamento_json IS 'Listado de medicamentos';
COMMENT ON COLUMN public.fichas_medicas.alergia IS 'Indica si es alérgico a algún medicamento o antibiótico';
COMMENT ON COLUMN public.fichas_medicas.reaccion_anestesia IS 'Indica si ha tendido reacción con anestesia local';
COMMENT ON COLUMN public.fichas_medicas.diabetico IS 'Indica si es diabético';
COMMENT ON COLUMN public.fichas_medicas.trastornos_convulsivo IS 'Indica si tiene trastornos convulsivos';
COMMENT ON COLUMN public.fichas_medicas.hepatitis IS 'Indica si padece o padeció hepatitis';
COMMENT ON COLUMN public.fichas_medicas.enfermedad_renal IS 'Padece o padeció alguna enfermedad renal';
COMMENT ON COLUMN public.fichas_medicas.problema_cardiaco IS 'Indica si padece o padeció algún problema cardiaco';
COMMENT ON COLUMN public.fichas_medicas.cancer IS 'Indica si padece o padeció cáncer';
COMMENT ON COLUMN public.fichas_medicas.intervencion_quirurgica IS 'Indica si ha sido intervenido quirúrgicamente';
COMMENT ON COLUMN public.fichas_medicas.hospitalizado IS 'Indica si ha sido hospitalizado';
COMMENT ON COLUMN public.fichas_medicas.sangrado_excesivo IS 'Indica si ha tenido algún sangrado excesivo';
COMMENT ON COLUMN public.fichas_medicas.hipertension IS 'Indica si sufre de hipertensión';
COMMENT ON COLUMN public.fichas_medicas.transfusion_sangre IS 'Indica si le han transfundido sangre';
COMMENT ON COLUMN public.fichas_medicas.problema_digestivo IS 'Indica si tiene algún problema digestivo';
COMMENT ON COLUMN public.fichas_medicas.embarazada IS 'Indica si está embarazada, en caso de ser mujer';
COMMENT ON COLUMN public.fichas_medicas.anticonceptivos_orales IS 'Indica si toma algún anticonceptivo de forma oral, en caso de ser mujer';
COMMENT ON COLUMN public.fichas_medicas.trastornos_periodo IS 'Indica si tiene trastornos con el periodo menstrual, en caso de ser mujer';
COMMENT ON COLUMN public.fichas_medicas.otra_enfermedad_trastorno IS 'Indica si padece alguna otra enfermedad o trastornos no mencionados';
COMMENT ON COLUMN public.fichas_medicas.otra_enfermedad_trastornos_observacion IS 'Observación en caso de padecer alguna enfermedad o trastornos no listados';
COMMENT ON COLUMN public.fichas_medicas.activo IS 'Indica si la ficha médica está o no activa';

CREATE TABLE public.log_cambios (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	anterior json NOT NULL, -- Valor anterior al cambio
	posterior json NOT NULL,
	tabla_id varchar NOT NULL, -- Nombre de la tabla que realiza el cambio
	registro_id int2 NOT NULL, -- Id del registro que realiza el cambio
	usuario_id int2 NOT NULL, -- Campo que representa al usuario que realizó el cambio
	fecha timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora del cambio
	CONSTRAINT log_cambios_pk PRIMARY KEY (id),
	CONSTRAINT log_cambios_fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
COMMENT ON COLUMN public.log_cambios.anterior IS 'Valor anterior al cambio';
COMMENT ON COLUMN public.log_cambios.tabla_id IS 'Nombre de la tabla que realiza el cambio';
COMMENT ON COLUMN public.log_cambios.registro_id IS 'Id del registro que realiza el cambio';
COMMENT ON COLUMN public.log_cambios.usuario_id IS 'Campo que representa al usuario que realizó el cambio';
COMMENT ON COLUMN public.log_cambios.fecha IS 'Fecha y hora del cambio';

CREATE TABLE public.stock_insumos_movimientos (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	insumo_id int2 NOT NULL, -- Campo que hace referencia a un insumo
	stock_actualizar_id int4 NOT NULL, -- Campo que hace referencia al registro desde donde se realizó la actualización
	stock_actualizar_detalle_id int4 NOT NULL, -- Campo que hace referencia al registro del detalle desde donde se realizó la actualización
	cantidad int2 NOT NULL, -- Cantidad del movimiento
	fecha_insercion timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha en la que se realizó la inserción del movimiento
	fecha_movimiento date NOT NULL, -- Fecha del movimiento
	usuario_id int2 NOT NULL, -- Campo que hace referencia al usuario que realizó la actualización
	activo bool NOT NULL DEFAULT true, -- Indica si el movimiento está o no activo
	CONSTRAINT stock_insumo_movimiento_pk PRIMARY KEY (id),
	CONSTRAINT stock_insumos_movimientos_fk_insumo FOREIGN KEY (insumo_id) REFERENCES insumos(id),
	CONSTRAINT stock_insumos_movimientos_fk_stock_actualizar FOREIGN KEY (stock_actualizar_id) REFERENCES stock_actualizar(id),
	CONSTRAINT stock_insumos_movimientos_fk_stock_actualizar_detalle FOREIGN KEY (stock_actualizar_detalle_id) REFERENCES stock_actualizar_detalle(id),
	CONSTRAINT stock_insumos_movimientos_fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
COMMENT ON TABLE public.stock_insumos_movimientos IS 'Representa el movimiento del stock de los insumos del consultorio';
COMMENT ON COLUMN public.stock_insumos_movimientos.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.stock_insumos_movimientos.insumo_id IS 'Campo que hace referencia a un insumo';
COMMENT ON COLUMN public.stock_insumos_movimientos.stock_actualizar_id IS 'Campo que hace referencia al registro desde donde se realizó la actualización';
COMMENT ON COLUMN public.stock_insumos_movimientos.stock_actualizar_detalle_id IS 'Campo que hace referencia al registro del detalle desde donde se realizó la actualización';
COMMENT ON COLUMN public.stock_insumos_movimientos.cantidad IS 'Cantidad del movimiento';
COMMENT ON COLUMN public.stock_insumos_movimientos.fecha_insercion IS 'Fecha en la que se realizó la inserción del movimiento';
COMMENT ON COLUMN public.stock_insumos_movimientos.fecha_movimiento IS 'Fecha del movimiento';
COMMENT ON COLUMN public.stock_insumos_movimientos.usuario_id IS 'Campo que hace referencia al usuario que realizó la actualización';
COMMENT ON COLUMN public.stock_insumos_movimientos.activo IS 'Indica si el movimiento está o no activo';

CREATE TABLE public.deudas (
	id int2 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	factura_id int2 NOT NULL, -- Campo que hace referencia a la factura que genera la deuda
	fecha_insercion timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha en la que se realizó la inserción de la deuda
	fecha_vencimiento date NOT NULL, -- Fecha de vencimiento de la deuda
	cuota_numero int2 NOT NULL, -- Cuota número de la deuda
	debe int2 NOT NULL, -- Monto del debe
	haber int2 NOT NULL, -- Monto del haber
	activo bool NOT NULL DEFAULT true, -- Indica si la cita médica está o no activa
	CONSTRAINT deuda_pk PRIMARY KEY (id),
	CONSTRAINT deudas_fk_factura FOREIGN KEY (factura_id) REFERENCES facturas(id)
);
COMMENT ON TABLE public.deudas IS 'Representa las deudas de los clientes';
COMMENT ON COLUMN public.deudas.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.deudas.factura_id IS 'Campo que hace referencia a la factura que genera la deuda';
COMMENT ON COLUMN public.deudas.fecha_insercion IS 'Fecha en la que se realizó la inserción de la deuda';
COMMENT ON COLUMN public.deudas.fecha_vencimiento IS 'Fecha de vencimiento de la deuda';
COMMENT ON COLUMN public.deudas.cuota_numero IS 'Cuota número de la deuda';
COMMENT ON COLUMN public.deudas.debe IS 'Monto del debe';
COMMENT ON COLUMN public.deudas.haber IS 'Monto del haber';
COMMENT ON COLUMN public.deudas.activo IS 'Indica si la cita médica está o no activa';

CREATE TABLE public.cobranzas_detalle (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	cobranza_id int2 NOT NULL, -- Campo que hace referencia a la cobranza
	deuda_id int2 NOT NULL, -- Campo que hace referencia a una deuda
	monto int2 NOT NULL, -- Monto de pago
	activo bool NOT NULL DEFAULT true, -- Indica si el detalle de la cobranza está o no activo
	CONSTRAINT cobranza_detalle_chk CHECK ((monto > 0)),
	CONSTRAINT cobranza_detalle_pk PRIMARY KEY (id),
	CONSTRAINT cobranzas_detalle_fk FOREIGN KEY (deuda_id) REFERENCES deudas(id),
	CONSTRAINT cobranzas_detalle_fk_cobranza FOREIGN KEY (cobranza_id) REFERENCES cobranzas(id)
);
COMMENT ON TABLE public.cobranzas_detalle IS 'Representa al detalle de la cobranza';
COMMENT ON COLUMN public.cobranzas_detalle.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.cobranzas_detalle.cobranza_id IS 'Campo que hace referencia a la cobranza';
COMMENT ON COLUMN public.cobranzas_detalle.deuda_id IS 'Campo que hace referencia a una deuda';
COMMENT ON COLUMN public.cobranzas_detalle.monto IS 'Monto de pago';
COMMENT ON COLUMN public.cobranzas_detalle.activo IS 'Indica si el detalle de la cobranza está o no activo';

CREATE TABLE public.deudas_detalle (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY, -- Código identificador autogenerado
	deuda_id int2 NOT NULL, -- Campo que hace referencia a la deuda
	fecha_insercion timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha de inserción del detalle de la deuda
	cobranza_detalle_id int4 NOT NULL, -- Campo que hace referencia al detalle de la cobranza
	debe int2 NOT NULL, -- Monto del debe
	haber int2 NOT NULL, -- Monto del haber
	activo bool NOT NULL DEFAULT true, -- Indica si el detalle de la deuda está o no activo
	CONSTRAINT deuda_detalle_pk PRIMARY KEY (id),
	CONSTRAINT deudas_detalle_fk_cobranza FOREIGN KEY (cobranza_detalle_id) REFERENCES cobranzas_detalle(id),
	CONSTRAINT deudas_detalle_fk_deuda FOREIGN KEY (deuda_id) REFERENCES deudas(id)
);
COMMENT ON TABLE public.deudas_detalle IS 'Representa al detalle de la deuda';
COMMENT ON COLUMN public.deudas_detalle.id IS 'Código identificador autogenerado';
COMMENT ON COLUMN public.deudas_detalle.deuda_id IS 'Campo que hace referencia a la deuda';
COMMENT ON COLUMN public.deudas_detalle.fecha_insercion IS 'Fecha de inserción del detalle de la deuda';
COMMENT ON COLUMN public.deudas_detalle.cobranza_detalle_id IS 'Campo que hace referencia al detalle de la cobranza';
COMMENT ON COLUMN public.deudas_detalle.debe IS 'Monto del debe';
COMMENT ON COLUMN public.deudas_detalle.haber IS 'Monto del haber';
COMMENT ON COLUMN public.deudas_detalle.activo IS 'Indica si el detalle de la deuda está o no activo';

--VIEWS
CREATE OR REPLACE VIEW public.citas_medicas_view
AS SELECT cm.id AS cita_medica_id,
    cm.paciente_id,
    (p.nombres::text || ' '::text) || p.apellidos::text AS paciente,
    cm.fecha_inicio,
    cm.fecha_fin,
    cm.estado_cita_id,
    em.estado_actual,
    em.puede_avanzar,
    cm.observacion,
    cm.activo
   FROM citas_medicas cm
     JOIN pacientes p ON cm.paciente_id = p.id
     JOIN estados_movimientos em ON cm.estado_cita_id = em.id
  WHERE cm.activo = true AND p.activo = true AND em.activo = true;