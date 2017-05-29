<?php

/**
 * Devuelve las encuestas del id_usuario.
 * Si se pasa el parametro "?estado=" (pendiente o completada)
 * devuelve las encuetas en esos estados sino trae todas.
 * @var [type]
 */
$app->get('/usuarios/{id_usuario}/encuestas', function ($request, $response, $args) {

    $params = $request->getQueryParams();

    $estado = isset($params['estado']) ? $params['estado'] : null;
    $id_usuario = (int)$request->getAttribute('id_usuario');

    $encuestas = Encuesta::trearEncuestasByIdUsuario($id_usuario, $estado);

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('encuestas' => $encuestas)));

});

/**
 * Devuelve las preguntas de la encuesta pasada por parametro id_encuesta
 * @var [type]
 */
$app->get('/encuestas/{id_encuesta}/preguntas', function($request, $response, $args) {

    $params = $request->getQueryParams();

    $id_encuesta = (int)$request->getAttribute('id_encuesta');

    $preguntas = Pregunta::traerPreguntasByIdEncuesta($id_encuesta);

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('preguntas' => $preguntas)));

});

/**
 * Devuelve las preguntas con las respuestas de una encuesta (id_encuesta)
 * de un usuario (id_usuario) 
 * @var [type]
 */
$app->get('/usuarios/{id_usuario}/encuestas/{id_encuesta}/preguntas', function($request, $response, $args) {

    $params = $request->getQueryParams();

    $id_usuario = (int)$request->getAttribute('id_usuario');
    $id_encuesta = (int)$request->getAttribute('id_encuesta');

    $preguntas = Usuario::traerPreguntas($id_usuario, $id_encuesta);

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('preguntas' => $preguntas)));

});
