<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require 'vendor/autoload.php';
require_once 'tokenManager.php';
require_once 'genericDAO.php';

$app = new \Slim\App;
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

$app->post('/token',function(Request $request, Response $response){

    $params = $request->getParams();
    $userData = GenericDAO::validateUserByEmailAndPassword($params);
    if($userData != null){
        $tm = new TokenManager();
        $rv = $tm->getToken($userData);
        $response->getBody()->write($rv);
    }else{
        $response = $response->withStatus(204);
    }
    return $response;
});

$app->post('/permissions',function(Request $request, Response $response){
    $params = $request->getParams();
    $jwt = $params['headers']['jwt']['0'];
    $tm = new TokenManager();
    //$jwt = $jwt . "321321";
    $rv = $tm->isValidToken($jwt);
    if($rv['isValidToken'] == true){
        $rv = GenericDAO::getPermissionsByUserRol($rv);
    }
    $datos = json_encode($rv);
    $response->getBody()->write($datos);
    return $response;
});

$app->post('/newsurvey',function(Request $request, Response $response){
    $params = $request->getParams();
    $survey = $params["survey"];
    $jwt = $params["jwt"];
    $tm = new TokenManager();
    $tm->isValidToken($jwt);
    $userid = $tm->getIdByJWT($jwt);
    GenericDAO::newSurvey($survey,$userid);
    return $response;
});

$app->post('/getsurveyslist',function(Request $request, Response $response){
    $rv = GenericDAO::getSurveysList();
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/eliminatesurvey',function(Request $request, Response $response){
    $rv = GenericDAO::eliminateSurvey();
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->post('/getsurveybyid',function(Request $request, Response $response){
    $rv = GenericDAO::eliminateSurvey();
    $response->getBody()->write(json_encode($rv));
    return $response;
});

$app->run();
?>