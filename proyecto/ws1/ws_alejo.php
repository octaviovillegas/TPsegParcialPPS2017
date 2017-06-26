<?php

 /**
 * @api {get} /usuarios/{id_usuario}/encuestas/  encuestas por  id_usuario.
 * @apiName encuestas de usuarios
 * @apiGroup Usuarios
 * @apiSuccess {array} arrayEncuestas  encuentas del usuario.

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

  * @api {get} /usuarios/{id_usuario}/encuestas/{id_encuestas}  encuestas por id_encuestas del id_usuario
 * @apiName encuesta usuario 2
 * @apiGroup Usuarios
 * @apiSuccess {array} Encuestas   encuentas del usuario especificado.

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
  * @api {get} /encuestas/{id_encuesta}  encuesta por  por parametro id_encuesta
 * @apiName traer encuesta
 * @apiGroup Encuestas
 * @apiSuccess {int} id_encuesta id de la encuesta especifica.
 * @apiSuccess {string} descripcion descripcion de la encuesta especifica.
 * @apiSuccess {int} id_curso id_curso de la  encuesta especifica.
 * @apiSuccess {datetime} fecha_inicio fecha inicio de la encuesta especifica.
 * @apiSuccess {datetime} fecha_fin fecha fin de la encuesta especifica.

 */
$app->get('/encuestas/{id_encuesta}', function($request, $response, $args) {

    $id_encuesta = (int)$request->getAttribute('id_encuesta');

    $encuesta = Encuesta::TraerEncuestaByIdEncuesta($id_encuesta);

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('encuesta' => $encuesta)));

});


 /**
  * @api {get} /encuestas/{id_encuesta}/preguntas preguntas de la encuesta pasada por parametro id_encuesta
 * @apiName traer preguntas de encuestas
 * @apiGroup Encuestas
 * @apiSuccess {array} arrayPreguntas array con las preguntas de las encuestas.

 */

$app->get('/encuestas/{id_encuesta}/preguntas', function($request, $response, $args) {

    $id_encuesta = (int)$request->getAttribute('id_encuesta');

    $preguntas = Pregunta::traerPreguntasByIdEncuesta($id_encuesta);

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('preguntas' => $preguntas)));

});


 
 /**
  * @api {get} /usuarios/{id_usuario}/encuestas/{id_encuesta}/preguntas  preguntas con las respuestas de una encuesta (id_encuesta)
 * @apiName Traer preguntas encuestasID
 * @apiGroup Usuarios
 * @apiSuccess {array} arrayPreguntas array con las preguntas de la una encuesta.

 */

$app->get('/usuarios/{id_usuario}/encuestas/{id_encuesta}/preguntas', function($request, $response, $args) {

    $id_usuario = (int)$request->getAttribute('id_usuario');
    $id_encuesta = (int)$request->getAttribute('id_encuesta');

    $preguntas = Usuario::traerPreguntas($id_usuario, $id_encuesta);

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('preguntas' => $preguntas)));

});

  /**
  * @api {post} /usuarios/{id_usuario}/encuestas/respuestas Insertar una respuesta segun el id_usuario, id_pregunta y opcion.
 * @apiName insertar respuesta
 * @apiGroup Usuarios
 * @apiSuccess {number} id_respuesta ultimo id insertado.

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
  * @api {delete} /pregunta/{id_pregunta} Eliminar una pregunta segun su id_pregunta
 * @apiName eliminar pregunta
 * @apiGroup Preguntas
 *
 *
 * @apiSuccess {boolean} Confirmacion devuelve true o false si funciono o no.

 */
$app->delete('/pregunta/{id_pregunta}', function ($request, $response, $args) {

    $params = $request->getQueryParams();

    $id_pregunta = (int)$request->getAttribute('id_pregunta');

    $ret = Pregunta::eliminarPregunta($id_pregunta);

    return json_encode($ret);

});



   /**
 * @api {get} /encuestas/{id_encuesta}/alumnos alumnos que tienen asignada una encuestas segun el id_encuesta.
 * @apiName alumnos por encuesta
 * @apiGroup Encuestas
 *
 *
 * @apiSuccess {array} arrayAlumnosPorEncuesta devuelve array de alumnos segun encuensta.

 */
 
$app->get('/encuestas/{id_encuesta}/alumnos', function ($request, $response, $args) {

    $params = $request->getQueryParams();

    $id_encuesta = (int)$request->getAttribute('id_encuesta');

    $alumnos = Encuesta::trearAlumnosByIdEncuesta($id_encuesta);

    $response->withHeader('Content-Type', 'application/json');
    $response->write(json_encode(array('alumnos' => $alumnos)));

});
