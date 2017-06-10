# TPsegParcialPPS2017
Segundo parcial de PPS 2017 IONIC 2
========================================


<h4>Documentancion:</h4>

  </h5>Login</h5>:
	Login Con jwt Firebase: El login está diseñado para que un usuario con correo y password puedan loguearse en el sistema.
	previamente con un rol asignado y se rootea a los diferentes roles que puedan llegar a tener, administrador, administrativo, profesor, alumno.
	Le pega a firebaseAuth y además hace una validación en un WS de usuarios online. 
	Cuenta con los botones para ingresar con los usuarios de testing harcodeados.
	Ademas valida que los campos no estén vacios y correspondan a un mail y pw.

	<h4>Tareas</h4>
	-	Generacion de estilos de login
	-	Validación de usuario
	-   Validacion de tipos de datos en campos
	-	Botones de testing
	-	Funcionabilidad firebase jwt
	-	Funcionabilidad WS jwt


	 </h5>Profesor:</h5>:
	El profesor es el encargado de generar las encuestas con las preguntas correspondientes, para si luego asignarlas a un curso.

	<h4>Tareas</h4>
	-	Generacion de estilos de paginas.
	-	Generacion de menus interactivos.
	-	Generacion de toast notification.
	-	Creacion de encuestas con WS.
	-	Asignacion de cursos con WS.
	-	Encuestas dinámicas con los datos que requiera el profesor.
	-	Efectos para agregar preguntas, deslizando el cursor a la izquierda parado sobre la encuesta
	-	Utilizacion de iconos de ionic

	
	 </h5>Administrador</h5>:
	-	ABM de usuarios (alumnos, profesores, administradores y administrativos).
	-	ABM de cursos
	-	ABM de comisiones.

 </h5>Administrador</h5>
	-	Podrá asociar/agregar un alumno a un curso
	-	visualizará los resultados en gráficos hight-charts:
	-	Cantidad de Respuestas por pregunta (pudiendo seleccionar cada pregunta)
	-	Cantidad de encuestas por curso (pudiendo seleccionar 1 o todos los cursos)
	-	Cantidad de alumnos por curso (pudiendo seleccionar 1 o todos los cursos)



