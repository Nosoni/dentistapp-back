INSERT INTO public.tipos_documentos (descripcion,abreviacion,activo) VALUES
	 ('Cédula','CI',true),
	 ('RUC','RUC',true);

INSERT INTO public.funcionarios (documento,tipo_documento_id,nombres,apellidos,fecha_ingreso,direccion,ciudad,telefono,email,activo) VALUES
	 ('3828622',1,'francisco','recalde','2021-10-31',NULL,NULL,NULL,NULL,true);

--pro
INSERT INTO public.usuarios (usuario,"password",funcionario_id,activo) VALUES
	 ('frecalde','$2b$10$.wZPRWMkou.691tBrU8dnOPh26ULXo1IvzTTN5tMmT/VObHI.kHza',null,true);

INSERT INTO public.roles (nombre,descripcion,activo) VALUES
	 ('Administrador','Encargado de administrar el sistema',true);

INSERT INTO public.permisos (nombre,descripcion,activo) VALUES
	 ('menu_ver_usuario','Concede acceso al menú usuario',true),
	 ('menu_ver_funcionario','Concede acceso al menú funcionario',true),
	 ('menu_ver_rol','Concede acceso al menú roles',true),
	 ('menu_ver_paciente','Concede acceso al menú paciente',true),
	 ('menu_ver_doctor','Concede acceso al menú doctor',true),
	 ('menu_ver_especialidad','Concede acceso al menú especialidad',true),
	 ('menu_ver_producto_servicio','Concede acceso al menú producto y servicio',true),
	 ('menu_ver_insumo','Concede acceso al menú insumo',true),
	 ('menu_ver_cita_medica','Concede acceso al menú cita médica',true),
	 ('menu_ver_facturacion','Concede acceso al menú facturación',true),
	 ('menu_ver_presupuesto','Concede acceso al menú presupuesto',true),
	 ('menu_ver_actualizar_stock','Concede acceso al menú actualizar stock',true),
	 ('menu_ver_cobranza','Concede acceso al menú cobranza',true),
	 ('menu_ver_cliente','Concede acceso al menú cliente',true),
	 ('menu_ver_reporte_inventario','Concede acceso al menú reporte inventario',true),
	 ('menu_ver_reporte_facturacion','Concede acceso al menú reporte facturacion',true);
   
INSERT INTO public.roles_permisos (rol_id,permiso_id,activo) VALUES
	 (1,1,true),
	 (1,2,true),
	 (1,3,true),
	 (1,4,true),
	 (1,5,true),
	 (1,6,true),
	 (1,7,true),
	 (1,8,true),
	 (1,9,true),
	 (1,10,true),
	 (1,11,true),
	 (1,12,true),
	 (1,13,true),
	 (1,14,true),
	 (1,15,true);

INSERT INTO public.usuarios_roles (usuario_id,rol_id,activo) VALUES
	 (1,1,true);

INSERT INTO public.condiciones_pago (id,codigo,descripcion,cuotas,activo) VALUES
	 (1,'Contado','Condición de pago contado',1,true);

INSERT INTO public.dientes (codigo,temporal,cantidad_caras,activo) VALUES
	 (11,false,4,true),
	 (12,false,4,true),
	 (13,false,4,true),
	 (14,false,5,true),
	 (15,false,5,true),
	 (16,false,5,true),
	 (17,false,5,true),
	 (18,false,5,true),
	 (21,false,4,true),
	 (22,false,4,true),
	 (23,false,4,true),
	 (24,false,5,true),
	 (25,false,5,true),
	 (26,false,5,true),
	 (27,false,5,true),
	 (28,false,5,true),
	 (31,false,4,true),
	 (32,false,4,true),
	 (33,false,4,true),
	 (34,false,5,true),
	 (35,false,5,true),
	 (36,false,5,true),
	 (37,false,5,true),
	 (38,false,5,true),
	 (41,false,4,true),
	 (42,false,4,true),
	 (43,false,4,true),
	 (44,false,5,true),
	 (45,false,5,true),
	 (46,false,5,true),
	 (47,false,5,true),
	 (48,false,5,true),
	 (51,true,4,true),
	 (52,true,4,true),
	 (53,true,4,true),
	 (54,true,5,true),
	 (55,true,5,true),
	 (61,true,4,true),
	 (62,true,4,true),
	 (63,true,4,true),
	 (64,true,5,true),
	 (65,true,5,true),
	 (71,true,4,true),
	 (72,true,4,true),
	 (73,true,4,true),
	 (74,true,5,true),
	 (75,true,5,true),
	 (81,true,4,true),
	 (82,true,4,true),
	 (83,true,4,true),
	 (84,true,5,true),
	 (85,true,5,true);

	INSERT INTO public.estados_movimientos (tabla_id,estado_actual,estado_anterior_id,puede_avanzar,activo) VALUES
	 ('citas_medicas','Pendiente',NULL,true,true),--1
	 ('citas_medicas','Confirmado',1,true,true),--2
	 ('citas_medicas','Cancelado',2,false,true),--3
	 ('citas_medicas','Cancelado',1,false,true),--4
	 ('facturas','Pendiente',NULL,true,true),--5
	 ('facturas','Facturado',5,false,true),--6
	 ('pacientes_dientes_detalle','Caries',NULL,false,true),--7
	 ('pacientes_dientes_detalle','Fracturas',NULL,false,true),--8
	 ('pacientes_dientes_detalle','Normal',NULL,false,true),--9
	 ('pacientes_dientes_historial','Pendiente',NULL,true,true),--10
	 ('pacientes_dientes_historial','Facturado',10,false,true),--11
	 ('pacientes_dientes_historial','Presupuestado',10,true,true),--12
	 ('pacientes_dientes_historial','Facturado',12,false,true),--13
	 ('presupuestos','Pendiente',NULL,true,true),--14
	 ('presupuestos','Presupuestado',14,true,true),--15
	 ('actualizar_stock','Pendiente',NULL,true,true),--16
	 ('actualizar_stock','Actualizado',16,true,true),--17
	 ('cobranzas','Pendiente',NULL,true,true),--18
	 ('cobranzas','Cobrado',18,true,true);--19

INSERT INTO public.impuestos (codigo,descripcion,porcentaje,activo) VALUES
	 ('IVA 10','IVA del 10%',10,true),
	 ('IVA 5','IVA del 5%',5,true),
	 ('Excenta','IVA del 0%, excenta',0,true);

INSERT INTO public.tipos_movimientos_stock (nombre,descripcion,signo,activo) VALUES
	 ('ingreso','suma stock',1,true),
	 ('egreso','resta stock',-1,true);