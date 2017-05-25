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
