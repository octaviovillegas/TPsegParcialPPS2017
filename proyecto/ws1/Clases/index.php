<?php
require_once('Clases/AccesoDatos.php');
require_once('Clases/personas.php');
require_once('Clases/local.php');
require_once('Clases/pizza.php');
require_once('Clases/promocion.php');
require_once('Clases/pedido.php');
require_once('Clases/encuesta.php');
require_once('Clases/curso.php');


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

    $ret = Usuario::EliminarUsuario($usuario);

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


$app->post('/archivos', function ($request, $response, $args) {

    if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = "fotos" . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );
} else {
    echo 'No files';
}
    return $response;
});


$app->get('/locales', function ($request, $response, $args) {


   $arrAdmin = Local::TraerTodasLosLocales();



   return json_encode($arrAdmin);


});

$app->get('/curso', function ($request, $response, $args) {



  $cursos=Curso::TraerTodosLosCursos();

 return json_encode($cursos);


});

$app->get('/encuestas', function ($request, $response, $args) {



  $encuestas=Encuesta::TraerTodasLasEncuestas();

 return json_encode($encuestas);


});

/* POST: Para crear recursos */
$app->get('/local/alta/{objeto}', function ($request, $response, $args) {

$local=json_decode($args['objeto']);
    $local->foto_local=explode(';',$local->foto_local);
    $arrayFoto = array();
    if(count($local->foto_local) > 0){
        for ($i = 0; $i < count($local->foto_local); $i++ ){
            $rutaVieja="fotos/".$local->foto_local[$i];
            $rutaNueva=$local->nombre_local. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]='http://localhost:8080/pizzeriaTP/ws1/fotos/'.$rutaNueva;
        }

        $local->foto_local=json_encode($arrayFoto);

    }
          return $response->write(Local::InsertarLocal($local));

});

$app->delete('/local/BorrarLocal/{objeto}', function ($request, $response, $args) {

        $local=json_decode($args['objeto']);



          return Local::BorrarLocal($local);

});

$app->post('/local/modificar/{objeto}', function ($request, $response, $args) {

        $local=json_decode($args['objeto']);

          return Local::ModificarLocal($local);

});

$app->post('/usuarios/alta/{objeto}', function ($request, $response, $args) {

          return $response->write(Usuario::Insertar(json_decode($args['objeto'])));

});

$app->get('/producto', function ($request, $response, $args) {


          return json_encode(Pizza::TraerTodasLasPizzas());

});



$app->post('/producto/alta/{objeto}', function ($request, $response, $args) {

$pizza=json_decode($args['objeto']);
    $pizza->foto_pizza=explode(';',$pizza->foto_pizza);
    $arrayFoto = array();
    if(count($pizza->foto_pizza) > 0){
        for ($i = 0; $i < count($pizza->foto_pizza); $i++ ){
            $rutaVieja="fotos/".$pizza->foto_pizza[$i];
            $rutaNueva=$pizza->descripcion_pizza. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]="http://prog4jaguirre.esy.es/".$rutaNueva;
        }

        $pizza->foto_pizza=json_encode($arrayFoto);

    }
          return $response->write(Pizza::InsertarPizza($pizza));

});


$app->post('/promocion/{objeto}', function ($request, $response, $args) {

$promocion=json_decode($args['objeto']);

          return $response->write(Promocion::InsertarPromocion($promocion));

});

$app->get('/promociones', function ($request, $response, $args) {

          return json_encode(Promocion::TraerTodasLasPromociones());

});

$app->get('/clientes', function ($request, $response, $args) {

          return json_encode(Usuario::TraerTodosLosClientes());

});


$app->get('/clientesEmpleados', function ($request, $response, $args) {

          return json_encode(Usuario::TraerClientesEmpleados());

});
$app->get('/pedidos/alta/{objeto}', function ($request, $response, $args) {

$promocion=json_decode($args['objeto']);
var_dump($promocion);

          return $response->write(Pedido::InsertarPedido($promocion));

});

$app->get('/pedidos', function ($request, $response, $args) {

          return json_encode(Pedido::TraerTodosLosPedidos());

});

require_once __DIR__.'/ws_alejo.php';

$app->run();
