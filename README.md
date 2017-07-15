# TPsegParcialPPS2017
Segundo parcial de PPS 2017 IONIC 2
========================================
ionic id= afaef87a 

<h2>Documentacion:</h2>

 <h3>Login</h3>
Login Con jwt Firebase: El login está diseñado para que un usuario con correo y password puedan loguearse en el sistema.
	previamente con un rol asignado y se rootea a los diferentes roles que puedan llegar a tener, administrador, administrativo, profesor, alumno.
	Le pega a firebaseAuth y además hace una validación en un WS de usuarios online. 
	Cuenta con los botones para ingresar con los usuarios de testing harcodeados.
	Ademas valida que los campos no estén vacios y correspondan a un mail y pw.	

    
<h4>Tareas</h4>
    -	Generacion de estilos de login<br>
    -	Validación de usuario<br>
    -   Validacion de tipos de datos en campos<br>
    -	Botones de testing<br>
    -	Funcionabilidad firebase jwt<br>
	-	Funcionabilidad WS jwt<br>

 <h3>Perfil Profesor</h3>
El profesor es el encargado de generar las encuestas con las preguntas correspondientes, para si luego asignarlas a un curso<br>

 <h4>Tareas</h4><br>
	-	Generacion de estilos de paginas <br>
	-	Generacion de menus interactivos <br>
	-	Generacion de toast notification <br>
	-	Creacion de encuestas con WS <br>
	-	Asignacion de cursos con WS <br>
	-	Encuestas dinámicas con los datos que requiera el profesor <br>
	-	Efectos para agregar preguntas, deslizando el cursor a la izquierda parado sobre la encuesta <br>
	-	Utilizacion de iconos de ionic <br>
    
 <h3>Perfil Administrativo</h3>
 	Visualizara los resultado de los alumnos atravez de graficos realzados con hight-charts y asignara alumnos a cursos.
 <h4>Tareas</h4><br>
	-	Podrá asociar/agregar un alumno a un curso <br>
	-	visualizará los resultados en gráficos hight-charts <br>
	-	Cantidad de Respuestas por pregunta (pudiendo seleccionar cada pregunta) <br>
	-	Cantidad de encuestas por curso (pudiendo seleccionar 1 o todos los cursos)<br>
	-	Cantidad de alumnos por curso (pudiendo seleccionar 1 o todos los cursos)<br>

 <h3>Perfil Administrador</h3>
 	Administrara todo los tipos de usuarios, los cursos y comisiones pudiendo realizar las alta, bajas y modificaciones, y el guardado de los cursos en un archivo txt.

 <h4>Tareas</h4><br>
	-	ABM de usuarios (alumnos, profesores, administradores y administrativos) <br>
	-	ABM de cursos<br>
	-	ABM de comisiones<br>
	-   Guardado de cursos en archivo txt

<h3>Perfil Alumno</h3>

El alumno podrá ver las encuestas completadas y las encuestas pendientes. 
Las encuestas pendientes son aquellas que el usuario todavía no ha realizado. 
Las encuestas Completadas son aquellas que el usuario ya terminó.
Su ubicacion actual y la ubicacion fija de la UTN Fra.

 <h4>Tareas</h4><br>
-Al acceder a encuestas pendientes, se listan las encuestas del curso al que el alumno pertenece. Una vez que se accede a una encuesta se empiezan a mostrar las preguntas, una por una. Una vez finalizada la encuesta se muestra un toast con un mensaje y luego se vuelve a la página de encuestas pendientes.

-Al acceder a encuestas completadas se listan las encuestas que el usuario ya completó. Al acceder a cada encuesta se listan las preguntas y respuestas del alumno.

-Al acceder a Mi ubicacion (geolocalizacion) e podra ubicar en un mapa la ubicacion actual del usuario logueado y si el mismo esta cerca de la UTN FRA visualizara la marca de ubicacion de la facultad.

-----------------------

<h4>Los elementos agregados del “FrameWork Ionic”:</h4>
 -PopUp<br>
 -Action Sheet

 <h4>Plugins utilizados:</h4>
 -$cordovaCamera<br>
 -$cordovaBarcodeScanner<br> 
 -$cordovaVibration <br>
 -$cordovaDevice<br>
 -$cordovaToast<br>
 -$cordovaNativeAudio<br>
 -$cordovaGeolocation <br>
 -$cordovaFile<br>

 <h4>Items generales agregados=</h4>
 -Splashscreen personalizada y un icono personalizado diseñado en https://www.canva.com .<br>
 -Menús y navegación.<br>
 -servidor Slim(PHP) para el ABM de todas las tablas necesarias.<br> 
 -Login con distintos perfiles de usuarios, con distintas vistas y atributos.<br>  
 -Uso de JWT(autentificación).  <br>
 -login con action sheet con opciones para cargar los datos de cada perfil en los cuadros de texto.<br>
 -ABM de las entidades y listado. <br>
 -Distintos permisos por perfiles de usuario.<br> 
 -3 gráficos informativos e interactivos.<br>

<h4>Tablas=</h4>
 <img src="esquema_tablas.jpg">

<br><br>
 <h4>Agregado para el final</h4><br><br>
 -poder setear un estilo por defecto<br>
 -poder generar un estilo propio<br>
 -poder setear un estilo propio generado anteriormente<br>