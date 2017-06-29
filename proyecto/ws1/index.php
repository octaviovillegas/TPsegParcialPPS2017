<?php
require_once('Clases/AccesoDatos.php');
require_once('Clases/personas.php');
require_once('Clases/local.php');
require_once('Clases/pizza.php');
require_once('Clases/promocion.php');
require_once('Clases/pedido.php');
require_once('Clases/encuesta.php');
require_once('Clases/usuariorespuestas.php');
require_once('Clases/curso.php');
require_once('Clases/preguntas.php');
require_once('Clases/comision.php');

require 'vendor/autoload.php';



$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);

$app->add(function($request, $response, $next) {
    $route = $request->getAttribute("route");

    $methods = [];

    if (!empty($route)) {
        $pattern = $route->getPattern();

        foreach ($this->router->getRoutes() as $route) {
            if ($pattern === $route->getPattern()) {
                $methods = array_merge_recursive($methods, $route->getMethods());
            }
        }
        //Methods holds all of the HTTP Verbs that a particular route handles.
    } else {
        $methods[] = $request->getMethod();
    }

    $response = $next($request, $response);

    return $response->withHeader("Access-Control-Allow-Methods", implode(",", $methods));
});

$app->add(function($request, $response, $next) {
    $response = $next($request, $response);
    return $response->withHeader('Access-Control-Allow-Origin', '*');
});


$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});





/**
 * @api {get} /usuarios/ Trae la lista de usuarios
 * @apiName getUsuarios
 * @apiGroup Usuarios
 * @apiSuccess {array} lista de usuarios en el ws.

 */

$app->get('/usuarios', function ($request, $response, $args) {

    $params = $request->getQueryParams();

    $usuario = isset($params['usuario']) ? $params['usuario'] : null;
    $clave= isset($params['clave']) ? $params['clave'] : null;

    if (!is_null($usuario) && !is_null($clave)) {
        $usuarios = Usuario::TraerUnUsuarioPorUsuarioYClave($usuario, $clave);
    } else if (!is_null($usuario)) {
        $usuarios = Usuario::TraerUnUsuarioPorUsuario($usuario, $clave);
    } else {
        $usuarios = Usuario::TraerTodasLasPersonas();
    }


    return json_encode($usuarios);


});



//--aixa------------------------------------------


/**
 * @api {post} /usuarios/modificar Modifica un usuario, segun su ID
 * @apiName  Modificar Usuario
 * @apiGroup Usuarios
 *
 * @apiParam {object} el usuario a modificar.
 *
 * @apiSuccess {boolean} hayError el si hay error en la consulta.
 * @apiSuccess {int} id_usuario el id del usuario modificado.
 * @apiSuccess {int} id_tipo tipo usuario modificado.
 * @apiSuccess {String} nombre nombre del usuario modificado.
 * @apiSuccess {String} clave clave del usuario modificado.
 * @apiSuccess {text} imagen imagen del usuario modificado.

 */

$app->post('/usuarios/modificar', function ($request, $response, $args) {

    // Obtengo la data enviada. Es recibida como un array.
    $usuario = $request->getParsedBody();

    // convierto el array en un objecto
    $usuario = (object)$usuario;

    $ret = Usuario::ModificarUsuario($usuario);

    $hayError = false;

    if ($ret) {
        $hayError = false;
    } else {
        $hayError = true;
    }

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('error' => $hayError, 'usuario' => $usuario)));

    return $response;

});


/**
 * @api {post} /usuarios/eliminar/ Elimina un usuario segun su id
 * @apiName eliminar usuario
 * @apiGroup Usuarios
 * @apiParam {Object} objetoUsuario  objeto del usuario a borrar.
 * @apiSuccess {boolean} hayError el si hay error en la consulta.
 * @apiSuccess {int} id_usuario el id del usuario modificado.
 * @apiSuccess {int} id_tipo tipo usuario modificado.
 * @apiSuccess {String} nombre nombre del usuario modificado.
 * @apiSuccess {String} clave clave del usuario modificado.
 * @apiSuccess {text} imagen imagen del usuario modificado.
 */

$app->post('/usuarios/eliminar', function ($request, $response, $args) {

    // Obtengo la data enviada. Es recibida como un array.
    $usuario = $request->getParsedBody();

    // convierto el array en un objecto
    $usuario = (object)$usuario;

    $ret = Usuario::EliminarUsuario($usuario->id_usuario);

    $hayError = false;

    if ($ret) {
        $hayError = false;
    } else {
        $hayError = true;
    }

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('error' => $hayError, 'usuario' => $usuario)));

    return $response;

});

/**
 * @api {post} /usuarios/alta/{usuario} Da de alta un usuario nuevo
 * @apiName crear usuario
 * @apiGroup Usuarios
 *
 * @apiParam {array} arrayUsuario array del usuario a crear.
 *
 * @apiSuccess {boolean} hayError el si hay error en la consulta.
 * @apiSuccess {int} id_usuario el id del usuario insertado.
 
 */

$app->post('/usuarios/alta', function ($request, $response, $args) {


        $usuario = $request->getParsedBody();

        // convierto el array en un objecto
        $usuario = (object)$usuario;

        /*$tipo = $usuario->id_tipo;

        $result = Usuario::TraerIdTipo2($tipo);

        $usuario->id_tipo = $result->id_tipo;*/

        $ret = Usuario::AltaUsuario($usuario);


        $hayError = false;

        if ($ret) {
            $hayError = false;
        } else {
            $hayError = true;
        }

        $response->withHeader('Content-Type', 'application/json');
        $response->write(json_encode(array('error' => $hayError, 'ok' => $ret)));


        return $response;

});

/**
 * @api {get} /comisiones/ Trae todas las comisiones
 * @apiName traer todas las comisiones
 * @apiGroup Comisiones
 *
 * @apiSuccess {array} array de comisiones.

 */
$app->get('/comisiones', function ($request, $response, $args) {



  $comisiones=comision::TraerTodosLasComisiones();

 return json_encode($comisiones);


});

/**
 * @api {post} /comisiones/modificar/ modifica la comision
 * @apiName modificar comision
 * @apiGroup Comisiones
 *
 * @apiParam {object} objetoComision la Comision a modificar.
 *
 * @apiSuccess {boolean} hayError true o false si se realizo o no.
 * @apiSuccess {int} id_comision id de la comision modificada.
 * @apiSuccess {String} descripcion descripcion de la comision modificada.
 */
$app->post('/comisiones/modificar', function ($request, $response, $args) {


     // Obtengo la data enviada. Es recibida como un array.
    $comision = $request->getParsedBody();

    // convierto el array en un objecto
    $comision = (object)$comision;

    $res = comision::ModificarComision($comision);

    $hayError = false;

    if ($res) {
        $hayError = false;
    } else {
        $hayError = true;
    }

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('error' => $hayError, 'comision' => $comision)));

    return $response;

});

/**
 * @api {post} /comisiones/eliminar/ elimina la comision
 * @apiName eliminar comision
 * @apiGroup Comisiones
 *
 * @apiParam {object} objetoComision la Comision a eliminar.
 *
  * @apiSuccess {boolean} hayError true o false si se realizo o no.
 * @apiSuccess {int} id_comision id de la comision modificada.
 * @apiSuccess {String} descripcion descripcion de la comision modificada.
 */
 
$app->post('/comisiones/eliminar', function ($request, $response, $args) {


     // Obtengo la data enviada. Es recibida como un array.
    $comision = $request->getParsedBody();

    // convierto el array en un objecto
    $comision = (object)$comision;

    $res = comision::EliminarComision($comision);

    $hayError = false;

    if ($res) {
        $hayError = false;
    } else {
        $hayError = true;
    }

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('error' => $hayError, 'comision' => $comision)));

    return $response;

});

/**
 * @api {post} /comisiones/alta/ da de alta una nueva comision
 * @apiName alta comision
 * @apiGroup Comisiones
 *
 * @apiParam {array}  arrayComision la Comision a dar de alta.
 *
  * @apiSuccess {boolean} hayError true o false si se realizo o no.
 * @apiSuccess {int} id_comision ultimo id de la comision insertada.
 */
 */

 */

$app->post('/comisiones/alta', function ($request, $response, $args) {


        $comision = $request->getParsedBody();

        // convierto el array en un objecto
        $comision = (object)$comision;

        $res = comision::AltaComision($comision);


        $hayError = false;

        if ($res) {
            $hayError = false;
        } else {
            $hayError = true;
        }

        $response->withHeader('Content-Type', 'application/json');
        $response->write(json_encode(array('error' => $hayError, 'ok' => $ret)));


        return $response;

});

/**
 * @api {get} /GrafRespuestasDePreguntas trae las respuestas por pregunta de las encuestas
 * @apiName respuestas de preguntas para grafico
 * @apiGroup Graficos
 *
 * @apiSuccess {array} RespuestasDePreguntas array de las respuestas por pregunta.
 */

 
 $app->get('/GrafRespuestasDePreguntas', function ($request, $response, $args) {


  $resp=UsuarioRespuestas::respuestasDePreguntas();

 return json_encode($resp);


});


/**
 * @api {get} /GrafEncuestasPorCurso trae las encuenstas por curso
 * @apiName encuestas por curso
 * @apiGroup Graficos
 *
 * @apiSuccess {array} EncuestasxCurso las encuestas por curso asignado.

 */
  $app->get('/GrafEncuestasPorCurso', function ($request, $response, $args) {


  $resp=UsuarioRespuestas::encuestasPorCurso();

 return json_encode($resp);


});

/**
 * @api {get} /GrafAlumnosPorCurso trae los alumnos por curso
 * @apiName alumnos por curso
 * @apiGroup Graficos
 *
 * @apiSuccess {array} AlumnosXCurso devuelve los alumnos por curso.

 */
   $app->get('/GrafAlumnosPorCurso', function ($request, $response, $args) {


  $resp=UsuarioRespuestas::alumnosPorCurso();

 return json_encode($resp);


});

/**
 * @api {post} /alumnoCurso/alta/ asigna un alumno al curso
 * @apiName alta alumno
 * @apiGroup Cursos
 *
 * @apiParam {object} el alumno a dar de alta.
 *
 * @apiSuccess {boolean} confirmacion devuelve true o false si se realizo.

 */
   $app->post('/alumnoCurso/alta', function ($request, $response, $args) {


        $alcur = $request->getParsedBody();

        // convierto el array en un objecto
        $alcur = (object)$alcur;

        $res = Curso::AltaAlumno($alcur);


        $hayError = false;

        if ($res) {
            $hayError = false;
        } else {
            $hayError = true;
        }

        $response->withHeader('Content-Type', 'application/json');
        $response->write(json_encode(array('error' => $hayError, 'ok' => $ret)));


        return $response;

});


//-------------------------------------------------------
/**
 * @api {get} /usuarios/traer/{objeto} devuelve un usuario por su id
 * @apiName traer usuario especifico
 * @apiGroup Usuarios
 *
 * @apiSuccess {int} id_usuario el id del usuario buscado.
 * @apiSuccess {int} id_tipo tipo usuario buscado.
 * @apiSuccess {String} nombre nombre del usuario buscado.
 * @apiSuccess {String} clave clave del usuario buscado.
 * @apiSuccess {text} imagen imagen del usuario buscado.
 */
$app->get('/usuarios/traer/{objeto}', function ($request, $response, $args) {

  $usuario=json_decode($args['objeto']);


  $usuarioBuscado=Usuario::TraerUnUsuario($usuario->nombre_usuario);

 return json_encode($usuarioBuscado);


});

/**
 * @api {get} /cursos trae todos los cursos
 * @apiName traer cursos
 * @apiGroup Cursos
 * 
 *
 * @apiSuccess {array} ArrayDeCursos devuelve los curso.

 */
$app->get('/cursos', function ($request, $response, $args) {



  $cursos=curso::TraerTodosLosCursos();

 return json_encode($cursos);


});

/**
 * @api {post} /cursos/alta da de alta al curso 
 * @apiName alta De Curso
 * @apiGroup Cursos
 *
 * @apiParam {array} ArrayCurso array con los datos del curso
 *
 * @apiSuccess {boolean} hayError  confirmacion devuelve true o false si se realizo.

 */

$app->post('/cursos/alta', function ($request, $response, $args) {


  $curso = $request->getParsedBody();

        // convierto el array en un objecto
        $curso = (object)$curso;

        $res = curso::AltaCurso($curso);


        $hayError = false;

        if ($res) {
            $hayError = false;
        } else {
            $hayError = true;
        }

        $response->withHeader('Content-Type', 'application/json');
        $response->write(json_encode(array('error' => $hayError, 'ok' => $ret)));


        return $response;



});

/**
 * @api {get} /cursos/modificar modificar un curso especifico
 * @apiName modificacion de curso
 * @apiGroup Cursos
 *
 * @apiParam {objeto} objetoCurso objeto del curso a modificar
 *
 * @apiSuccess {boolean} hayError  confirmacion devuelve true o false si se realizo.

 */
$app->post('/cursos/modificar', function ($request, $response, $args) {


  $curso = $request->getParsedBody();

        // convierto el array en un objecto
        $curso = (object)$curso;

        $res = curso::ModificarCurso($curso);


        $hayError = false;

        if ($res) {
            $hayError = false;
        } else {
            $hayError = true;
        }

        $response->withHeader('Content-Type', 'application/json');
        $response->write(json_encode(array('error' => $hayError, 'ok' => $ret)));


        return $response;



});

/**
 * @api {post} /cursos/eliminar elimina un curso especifico
 * @apiName eliminar curso
 * @apiGroup Cursos
 *
 * @apiParam {objeto} objetoCurso objeto del curso a eliminar
 *
 * @apiSuccess {boolean} hayError  confirmacion devuelve true o false si se realizo.
 * @apiSuccess {int} id_curso id del curso eliminado.
 * @apiSuccess {int} id_comision id comision del curso eiminado.
 * @apiSuccess {int} id_usuario id usuario del curso eliminado.
 * @apiSuccess {string} descripcion descripcion del curso eliminado.
 */

$app->post('/cursos/eliminar', function ($request, $response, $args) {


     // Obtengo la data enviada. Es recibida como un array.
    $curso = $request->getParsedBody();

    // convierto el array en un objecto
    $curso = (object)$curso;

    $res = Curso::EliminarCurso($curso);

    $hayError = false;

    if ($res) {
        $hayError = false;
    } else {
        $hayError = true;
    }

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('error' => $hayError, 'comision' => $comision)));

    return $response;

});

/**
 * @api {delete} /usuarios/borrar/{objeto} elimina un usuario segun id
 * @apiName eliminar usuario
 * @apiGroup Usuarios
 *
 * @apiSuccess {boolean} Confirmacion devuelve true o false segun si se elimino o no.

 */
$app->delete('/usuarios/borrar/{objeto}', function ($request, $response, $args) {

        $usuario=json_decode($args['objeto']);



          return Usuario::BorrarUsuario($usuario);

});




/**
 * @api {get} /cursos traer todos los cursos
 * @apiName traer todos los cursos
 * @apiGroup Cursos
 *
 * @apiSuccess {array} ArrayDeCursos Todos los cursos.

 */

$app->get('/curso', function ($request, $response, $args) {



  $cursos=Curso::TraerTodosLosCursos();

 return json_encode($cursos);


});

/**
 * @api {get} /encuestas traer todas las encuestas
 * @apiName traer todas las encuestas
 * @apiGroup Encuestas
 *
 * @apiSuccess {array} ArrayDeEncuestas Todos las encuestas.

 */
$app->get('/encuestas', function ($request, $response, $args) {



  $encuestas=Encuesta::TraerTodasLasEncuestas();

 return json_encode($encuestas);


});

/**
 * @api {post} /encuestas/alta alta de encuestas
 * @apiName alta encuestas
 * @apiGroup Encuestas
 *
 * @apiParam {array} array con los datos de la encuesta.
 *
 * @apiSuccess {number} id_encuesta devuelve el ultimo id insertado.

 */

$app->post('/encuestas/alta', function ($request, $response, $args) {


        $encuesta = $request->getParsedBody();

        // convierto el array en un objecto
        $encuesta = (object)$encuesta;

  $encuestas=Encuesta::nuevaEncuesta($encuesta);

 return json_encode($encuestas);


});

/**
 * @api {post} /encuestas/borrar elimina la encuesta segun id
 * @apiName eliminar encuesta
 * @apiGroup Encuestas
 *
 * @apiParam {object} objeto de la encuesta a eliminar.
 *
 * @apiSuccess {boolean} Confirmacion devuelve true o false si se elimino o no.

 */

$app->post('/encuestas/borrar', function ($request, $response, $args) {

        $encuesta = $request->getParsedBody();

        // convierto el array en un objecto
        $encuesta = (object)$encuesta;

  $encuestas=Encuesta::BorrarEncuesta($encuesta);
  $encuestas=Encuesta::BorrarPregunta($encuesta);

 return json_encode($encuestas);


});

/**
 * @api {post} /encuestas/enviar asigna una encuesta a un curso
 * @apiName enviar encuesta
 * @apiGroup Encuestas
 *
 * @apiParam {objeto} Encuesta objeto encuesta asignar.
 *
 * @apiSuccess {boolean} devuelve true o false si se realizo o no.

 */
$app->post('/encuestas/enviar', function ($request, $response, $args) {


        $encuesta = $request->getParsedBody();

        // convierto el array en un objecto
        $encuesta = (object)$encuesta;

  $encuestas=Encuesta::enviarEncuesta($encuesta);

 return json_encode($encuestas);


});

/**
 * @api {post} /pregunta/alta alta de preguntas
 * @apiName alta preguntas
 * @apiGroup Preguntas
 *
 * @apiParam {array} Array  datos de la pregunta.
 *
 * @apiSuccess {number} id el ultimo id insertado.

 */

$app->post('/pregunta/alta', function ($request, $response, $args) {

    // Obtengo la data enviada. Es recibida como un array.
    $pregunta = $request->getParsedBody();
    // convierto el array en un objecto
    $pregunta = (object)$pregunta;

    $ret = Pregunta::InsertarPregunta($pregunta);


    return json_encode($ret);

});

require_once __DIR__.'/ws_alejo.php';

$app->run();
