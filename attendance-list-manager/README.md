# Attendance List Manager


### Configuraciónes básicas:

#### Base de datos

La base de datos es MySQL y el backend usa php5.  
En la carpeta `server` se encuentra el archivo `test.sql`.  
Contiene la estructura para las tablas y algunos registros importantes para la app.  
En algunas versiones de [XAMPP](https://www.apachefriends.org/es/index.html) se incluye una **B**ase de **D**atos por defecto llamada `test`, recomiendo que utilicen esa **BD** en principio . Usuario root sin contraseña.

En resumen, ejecutan el script en esa base de datos y listo.

#### API REST

Dentro del mismo directorio se encuentra la carpeta `jwt`.  
La cortan y la pegan en la raíz de `htdocs`.  

#### Servicio

Las peticiones las realiza el servicio que van a encontrar en `src/providers/app-service.ts`.

**IMPORTANTE:** Si se fijan el código de ésta clase, van a encontrar que las uris apuntan a `http://localhost:80`. Si utilizan otro puerto (como el 8080) pueden cambiar esa línea de código, **pero no suban el cambio** al repositorio remoto, porque vamos a estar modificando esa linea cada vez que alguien realice un cambio.

#### Dependencias

Las que vienen por defecto, ejecuten
```sh
npm install
```