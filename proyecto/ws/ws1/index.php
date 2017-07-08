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



$app->get('/algo', function ($request, $response, $args) {

   $var = Usuario::traeralgo();
   echo $var;

});






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

$app->post('/traerEstilos', function ($request, $response, $args) {

   $usuario = $request->getParsedBody();

    // convierto el array en un objecto
    $usuario = (object)$usuario;

  $estilo=Usuario::TraerElEstilo($usuario);

 return json_encode($estilo);

});


$app->post('/traerConfMiEstilo', function ($request, $response, $args) {

   $usuario = $request->getParsedBody();

    // convierto el array en un objecto
    $usuario = (object)$usuario;

  $estilo=Usuario::traerConfMiEstilo($usuario);

 return json_encode($estilo);

});



$app->post('/modificarestilo', function ($request, $response, $args) {

    // Obtengo la data enviada. Es recibida como un array.
    $usuario = $request->getParsedBody();

    // convierto el array en un objecto
    $usuario = (object)$usuario;

    $ret = Usuario::ModificarEstilo($usuario);

    $hayError = false;

    if ($ret) {
        $hayError = false;
    } else {
        $hayError = true;
    }

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('error' => $hayError, 'usuario' => $usuario)));

   return $response;
    // return json_encode($usuario);

});


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



$app->post('/usuarios/guardarmiestilo', function ($request, $response, $args) {


        $usuario = $request->getParsedBody();

        
        $usuario = (object)$usuario;
 

        $ret = Usuario::GuardarMiEstilo($usuario);

        $ret2 = Usuario::TraerUltimoID();
        $hayError = false;

        

        return  json_encode($ret2);

});



$app->post('/TodosMisEstilos', function ($request, $response, $args) {


        $usuario = $request->getParsedBody();

        
        $usuario = (object)$usuario;
 

        $ret = Usuario::TodosMisEstilos($usuario);
         

        return  json_encode($ret);
});




$app->get('/comisiones', function ($request, $response, $args) {



  $comisiones=comision::TraerTodosLasComisiones();

 return json_encode($comisiones);


});
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


 $app->get('/GrafRespuestasDePreguntas', function ($request, $response, $args) {


  $resp=UsuarioRespuestas::respuestasDePreguntas();

 return json_encode($resp);


});

  $app->get('/GrafEncuestasPorCurso', function ($request, $response, $args) {


  $resp=UsuarioRespuestas::encuestasPorCurso();

 return json_encode($resp);


});

   $app->get('/GrafAlumnosPorCurso', function ($request, $response, $args) {


  $resp=UsuarioRespuestas::alumnosPorCurso();

 return json_encode($resp);


});

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

$app->get('/usuarios/traer/{objeto}', function ($request, $response, $args) {

  $usuario=json_decode($args['objeto']);


  $usuarioBuscado=Usuario::TraerUnUsuario($usuario->nombre_usuario);

 return json_encode($usuarioBuscado);


});

$app->get('/cursos', function ($request, $response, $args) {



  $cursos=curso::TraerTodosLosCursos();

 return json_encode($cursos);


});

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


$app->delete('/usuarios/borrar/{objeto}', function ($request, $response, $args) {

        $usuario=json_decode($args['objeto']);



          return Usuario::BorrarUsuario($usuario);

});






$app->get('/curso', function ($request, $response, $args) {



  $cursos=Curso::TraerTodosLosCursos();

 return json_encode($cursos);


});

$app->get('/encuestas', function ($request, $response, $args) {



  $encuestas=Encuesta::TraerTodasLasEncuestas();

 return json_encode($encuestas);


});

$app->post('/encuestas/alta', function ($request, $response, $args) {


        $encuesta = $request->getParsedBody();

        // convierto el array en un objecto
        $encuesta = (object)$encuesta;

  $encuestas=Encuesta::nuevaEncuesta($encuesta);

 return json_encode($encuestas);


});

$app->post('/encuestas/borrar', function ($request, $response, $args) {

        $encuesta = $request->getParsedBody();

        // convierto el array en un objecto
        $encuesta = (object)$encuesta;

  $encuestas=Encuesta::BorrarEncuesta($encuesta);
  $encuestas=Encuesta::BorrarPregunta($encuesta);

 return json_encode($encuestas);


});

$app->post('/encuestas/enviar', function ($request, $response, $args) {


        $encuesta = $request->getParsedBody();

        // convierto el array en un objecto
        $encuesta = (object)$encuesta;

  $encuestas=Encuesta::enviarEncuesta($encuesta);

 return json_encode($encuestas);


});

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
