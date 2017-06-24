<?php

/**
 * Devuelve las encuestas del id_usuario.
 * Si se pasa el parametro "?estado=" (pendiente o completada)
 * devuelve las encuestas en esos estados sino trae todas.
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
 * Devuelve la encuesta (id_encuesta) del id_usuario.
 * @var [type]
 */
$app->get('/usuarios/{id_usuario}/encuestas/{id_encuesta}', function ($request, $response, $args) {

    $params = $request->getQueryParams();

    $id_usuario = (int)$request->getAttribute('id_usuario');
    $id_encuesta = (int)$request->getAttribute('id_encuesta');

    $encuesta = (object)Encuesta::trearEncuestaByIdUsuarioAndIdEncuesta($id_usuario, $id_encuesta);

    if (isset($encuesta->id_encuesta) && $encuesta->id_encuesta > 0) {
        $encuesta->estado = Encuesta::estaCompletada($id_usuario, $id_encuesta);
    } else {
        $encuesta = false;
    }

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('encuesta' => $encuesta)));

});

/**
 * Devuelve la encuesta pasada por parametro id_encuesta
 * @var [type]
 */
$app->get('/encuestas/{id_encuesta}', function($request, $response, $args) {

    $id_encuesta = (int)$request->getAttribute('id_encuesta');

    $encuesta = Encuesta::TraerEncuestaByIdEncuesta($id_encuesta);

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('encuesta' => $encuesta)));

});

/**
 * Devuelve las preguntas de la encuesta pasada por parametro id_encuesta
 * @var [type]
 */
$app->get('/encuestas/{id_encuesta}/preguntas', function($request, $response, $args) {

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

    $id_usuario = (int)$request->getAttribute('id_usuario');
    $id_encuesta = (int)$request->getAttribute('id_encuesta');

    $preguntas = Usuario::traerPreguntas($id_usuario, $id_encuesta);

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('preguntas' => $preguntas)));

});

/**
 * Inserta una respuesta segun el id_usuario, id_pregunta y opcion.
 * @var [type]
 */
$app->post('/usuarios/{id_usuario}/encuestas/respuestas', function($request, $response, $args) {

    $id_usuario = (int)$request->getAttribute('id_usuario');
    $data = $request->getParsedBody();
    $respuestas = $data['respuestas'];

    $id_respuestas = [];
    foreach ($respuestas as $respuesta) {
        $o_respuesta = (object)$respuesta;
        $o_respuesta->id_usuario = $id_usuario;
        $id_respuestas[] = UsuarioRespuestas::agregarRespuesta($o_respuesta);
    }

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('id_respuestas' => $id_respuestas)));

});

/**
 * Elimina una pregunta segun su id_pregunta.
 * @var [type]
 */
$app->delete('/pregunta/{id_pregunta}', function ($request, $response, $args) {

    $params = $request->getQueryParams();

    $id_pregunta = (int)$request->getAttribute('id_pregunta');

    $ret = Pregunta::eliminarPregunta($id_pregunta);

    return json_encode($ret);

});

/**
 * Devuelve los alumnos que tienen asignada una encuestas segun el id_encuesta.
 * @var [type]
 */
$app->get('/encuestas/{id_encuesta}/alumnos', function ($request, $response, $args) {

    $params = $request->getQueryParams();

    $id_encuesta = (int)$request->getAttribute('id_encuesta');

    $alumnos = Encuesta::trearAlumnosByIdEncuesta($id_encuesta);

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('alumnos' => $alumnos)));

});
