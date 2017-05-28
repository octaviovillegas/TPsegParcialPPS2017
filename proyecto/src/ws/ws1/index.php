<?php
require_once('Clases/AccesoDatos.php');
require_once('Clases/personas.php');
require_once('Clases/local.php');
require_once('Clases/pizza.php');
require_once('Clases/promocion.php');
require_once('Clases/pedido.php');
require_once('Clases/encuesta.php');
require_once('Clases/curso.php');
require_once('Clases/preguntas.php');


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



/*
$app->get('/usuarios/validar/{objeto}', function ($request, $response, $args) {

  $usuario=json_decode($args['objeto']);
   $validador = false;
   $arrAdmin = Usuario::TraerTodasLasPersonas();
   foreach ($arrAdmin as $adm) {
        if($adm->nombre_usuario == $usuario->nombre_usuario)
            if($adm->pass_usuario == $usuario->pass_usuario)
                 $validador=true;

   }
   echo  $validador;


});

*/


$app->get('/usuarios', function ($request, $response, $args) {


   $arrAdmin = Usuario::TraerTodasLasPersonas();



   return json_encode($arrAdmin);


});

//--aixa------------------------------------------




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

        $tipo = $usuario->id_tipo;

        $result = Usuario::TraerIdTipo2($tipo);

        $usuario->id_tipo = $result->id_tipo;

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
