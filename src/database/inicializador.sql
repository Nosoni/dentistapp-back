--falta tipo de documento
--falta mas datos de funcionarios
--falta actualizar usuarios

INSERT INTO public.funcionarios (documento,tipo_documento_id,nombres,apellidos,fecha_ingreso,direccion,ciudad,telefono,email,activo) VALUES
	 ('3828622',1,'francisco','recalde',NULL,NULL,NULL,NULL,NULL,true);

INSERT INTO public.usuarios (usuario,"password",funcionario_id,activo) VALUES
	 ('frecalde','$2b$10$1OaTWsMWHnJGasb43cTEku6H72JqJZI9iVZgusuL2i22spD902R5e',NULL,true),
	 ('creacion1','$2b$10$1OaTWsMWHnJGasb43cTEku6H72JqJZI9iVZgusuL2i22spD902R5e',NULL,true),
	 ('creacion2','$2b$10$079M3dTAIEUH16Eb.5MYguGsAhZY8pXtflINjffM6oVIdMTbtX1oi',2,true);
   
INSERT INTO public.roles (nombre,descripcion,activo) VALUES
	 ('administrador','encargado de administrar el sistema',true);

INSERT INTO public.permisos (nombre,descripcion,activo) VALUES
	 ('menu_ver_usuario','permite tener acceso al menú usuario',true);
   
INSERT INTO public.roles_permisos (rol_id,permiso_id,activo) VALUES
	 (1,1,true);

INSERT INTO public.usuarios_roles (usuario_id,rol_id,activo) VALUES
	 (3,1,true);

